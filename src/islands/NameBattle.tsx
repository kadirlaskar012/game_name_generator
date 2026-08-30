import React, { useState, useEffect } from 'react';
import { Swords, Trophy, Flame, Check, RefreshCw, Copy, ThumbsUp } from 'lucide-react';

interface Matchup {
  id: string;
  nameA: string;
  styleA: string;
  votesA: number;
  nameB: string;
  styleB: string;
  votesB: number;
}

const SAMPLE_MATCHUPS: Matchup[] = [
  {
    id: 'battle-1',
    nameA: '亗 BGMI GOD 亗',
    styleA: 'Boss Crown',
    votesA: 342,
    nameB: '『SOUL』VIPER メ',
    styleB: 'Katakana Clan',
    votesB: 289,
  },
  {
    id: 'battle-2',
    nameA: '꧁༺ SHADOW ༻꧂',
    styleA: 'Angel Wings',
    votesA: 412,
    nameB: '𝕭𝕲𝕸𝕴 𝕶𝕴𝕹𝕲',
    styleB: 'Gothic Fraktur',
    votesB: 395,
  },
  {
    id: 'battle-3',
    nameA: '• ɢᴏᴅʟ ᴊᴏɴᴀᴛʜᴀɴ •',
    styleA: 'Small Caps Pro',
    votesA: 520,
    nameB: '么 ʀᴀɪꜱᴛᴀʀ 々',
    styleB: 'Japanese Glyphs',
    votesB: 488,
  },
  {
    id: 'battle-4',
    nameA: '𓊈SOUL𓊉 TITAN 亗',
    styleA: 'Lenticular Bracket',
    votesA: 275,
    nameB: '☠ VILLAIN • OP ☠',
    styleB: 'Demon Attitude',
    votesB: 310,
  },
];

export const NameBattle: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchups, setMatchups] = useState<Matchup[]>(SAMPLE_MATCHUPS);
  const [votedChoices, setVotedChoices] = useState<{ [matchupId: string]: 'A' | 'B' }>({});
  const [streak, setStreak] = useState(0);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedVotes = JSON.parse(localStorage.getItem('gtp_battle_votes') || '{}');
      const savedStreak = Number(localStorage.getItem('gtp_battle_streak') || '0');
      setVotedChoices(savedVotes);
      setStreak(savedStreak);
    } catch {}
  }, []);

  const currentMatchup = matchups[currentIndex % matchups.length];
  const userVote = votedChoices[currentMatchup.id];

  const totalVotes = currentMatchup.votesA + currentMatchup.votesB;
  const percentA = totalVotes > 0 ? Math.round((currentMatchup.votesA / totalVotes) * 100) : 50;
  const percentB = 100 - percentA;

  const handleVote = async (choice: 'A' | 'B') => {
    if (userVote) return;

    const choiceName = choice === 'A' ? currentMatchup.nameA : currentMatchup.nameB;
    const choiceId = choice === 'A' ? 'choice-A' : 'choice-B';

    // Optimistic UI update
    const updated = matchups.map((m, idx) => {
      if (idx === currentIndex) {
        return {
          ...m,
          votesA: choice === 'A' ? m.votesA + 1 : m.votesA,
          votesB: choice === 'B' ? m.votesB + 1 : m.votesB,
        };
      }
      return m;
    });
    setMatchups(updated);

    const nextVotes = { ...votedChoices, [currentMatchup.id]: choice };
    setVotedChoices(nextVotes);
    const nextStreak = streak + 1;
    setStreak(nextStreak);

    try {
      localStorage.setItem('gtp_battle_votes', JSON.stringify(nextVotes));
      localStorage.setItem('gtp_battle_streak', String(nextStreak));
    } catch {}

    fetch('/api/battle/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        matchupId: currentMatchup.id,
        choiceId,
        choiceName,
      }),
    }).catch(() => {});
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % matchups.length);
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1500);
    } catch {}
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner with Streak */}
      <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-[#111622] rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs">
        <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
          <Swords className="w-4 h-4 text-rose-500" />
          <span>Daily 1v1 Arena</span>
          <span className="text-neutral-400 font-normal">Match {currentIndex + 1} of {matchups.length}</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-500 font-bold">
          <Flame className="w-4 h-4 fill-amber-500" />
          <span>{streak} Votes Cast</span>
        </div>
      </div>

      {/* 1v1 Battle Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* VS Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 rounded-full bg-rose-600 text-white font-black items-center justify-center text-xs shadow-lg border-2 border-white dark:border-[#0b0f19]">
          VS
        </div>

        {/* Option A */}
        <div
          onClick={() => handleVote('A')}
          className={`p-5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
            userVote === 'A'
              ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
              : userVote
              ? 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111622]'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-sky-500 bg-white dark:bg-[#111622] hover:shadow-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-semibold text-sky-500">{currentMatchup.styleA}</span>
              <span className="text-[11px]">{currentMatchup.votesA} Votes</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-gaming mb-4">
              {currentMatchup.nameA}
            </div>
          </div>

          <div className="space-y-3">
            {userVote ? (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  <span>{percentA}%</span>
                  {userVote === 'A' && <span className="text-emerald-500">Your Pick ✓</span>}
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${percentA}%` }} />
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Vote for Option A
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(currentMatchup.nameA);
              }}
              className="w-full py-1.5 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center justify-center gap-1 font-medium cursor-pointer"
            >
              {copiedName === currentMatchup.nameA ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedName === currentMatchup.nameA ? 'Copied' : 'Copy This Tag'}</span>
            </button>
          </div>
        </div>

        {/* Option B */}
        <div
          onClick={() => handleVote('B')}
          className={`p-5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
            userVote === 'B'
              ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
              : userVote
              ? 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111622]'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-sky-500 bg-white dark:bg-[#111622] hover:shadow-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-semibold text-indigo-500">{currentMatchup.styleB}</span>
              <span className="text-[11px]">{currentMatchup.votesB} Votes</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-gaming mb-4">
              {currentMatchup.nameB}
            </div>
          </div>

          <div className="space-y-3">
            {userVote ? (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  <span>{percentB}%</span>
                  {userVote === 'B' && <span className="text-emerald-500">Your Pick ✓</span>}
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${percentB}%` }} />
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Vote for Option B
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(currentMatchup.nameB);
              }}
              className="w-full py-1.5 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center justify-center gap-1 font-medium cursor-pointer"
            >
              {copiedName === currentMatchup.nameB ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedName === currentMatchup.nameB ? 'Copied' : 'Copy This Tag'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Next Battle Action */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-xs font-bold rounded-lg transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Next 1v1 Battle →</span>
        </button>
      </div>

      {/* Daily Battle Hall of Fame */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
            Daily Arena Leaderboard
          </h3>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-xs">
          {SAMPLE_MATCHUPS.map((m, idx) => {
            const winner = m.votesA >= m.votesB ? m.nameA : m.nameB;
            const winnerStyle = m.votesA >= m.votesB ? m.styleA : m.styleB;
            const winVotes = Math.max(m.votesA, m.votesB);
            return (
              <div key={m.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-neutral-400">#{idx + 1}</span>
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white font-gaming">{winner}</span>
                    <span className="text-neutral-400 ml-2">({winnerStyle})</span>
                  </div>
                </div>
                <span className="font-semibold text-sky-600 dark:text-sky-400">{winVotes} Upvotes</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
