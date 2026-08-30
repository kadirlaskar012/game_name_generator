import type { APIRoute } from 'astro';
import { checkRateLimit, getClientIp } from '@/lib/security/ratelimit';
import { trackNameUsage } from '@/lib/database/repository';

// In-memory battle score cache for real-time aggregation
const BATTLE_VOTES = new Map<string, { [candidateId: string]: number }>();

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`battle_${ip}`, 60);

  if (!rateCheck.isAllowed) {
    return new Response(
      JSON.stringify({ success: false, error: 'Voting too fast. Please wait a moment.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { matchupId = 'daily-1', choiceId, choiceName } = body;

    if (!choiceId || !choiceName) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing choice parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update in-memory tally
    const currentTally = BATTLE_VOTES.get(matchupId) || { [choiceId]: 0 };
    currentTally[choiceId] = (currentTally[choiceId] || 0) + 1;
    BATTLE_VOTES.set(matchupId, currentTally);

    // Track usage in repository
    trackNameUsage(choiceName, undefined, undefined, 'generate').catch(() => {});

    return new Response(
      JSON.stringify({
        success: true,
        matchupId,
        votes: currentTally,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Vote failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
