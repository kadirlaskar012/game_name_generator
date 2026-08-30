import { getBlockedWords } from '../database/repository';
import { SEED_BLOCKED_WORDS } from '../database/seedData';

// Map of common bypass substitutions
const LEET_MAP: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '8': 'b',
  '@': 'a',
  '$': 's',
  '!': 'i',
  '+': 't',
  '|': 'l',
};

/**
 * Decomposes Unicode, removes symbols, zero-width chars, and standardizes leetspeak.
 */
export function normalizeForSafety(text: string): string {
  if (!text) return '';

  // 1. Decompose unicode (NFKD) and strip combining diacritical marks
  let normalized = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');

  // 2. Strip zero-width, invisible, and format control characters
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF\u00AD\u200E\u200F\u2028\u2029]/g, '');

  // 3. Lowercase
  normalized = normalized.toLowerCase();

  // 4. Map leetspeak characters
  normalized = normalized
    .split('')
    .map((c) => LEET_MAP[c] || c)
    .join('');

  // 5. Remove all non-alphanumeric characters (spaces, brackets, symbols)
  normalized = normalized.replace(/[^a-z0-9]/g, '');

  return normalized;
}

/**
 * Validates text against blocked words.
 */
export async function validateContentSafety(text: string): Promise<{
  isSafe: boolean;
  cleanText: string;
  flaggedWord?: string;
}> {
  if (!text || text.trim() === '') {
    return { isSafe: true, cleanText: '' };
  }

  const normalized = normalizeForSafety(text);
  let blockedList: string[] = [];

  try {
    blockedList = await getBlockedWords();
  } catch (err) {
    blockedList = SEED_BLOCKED_WORDS;
  }

  for (const word of blockedList) {
    const normWord = normalizeForSafety(word);
    if (normWord && normalized.includes(normWord)) {
      return {
        isSafe: false,
        cleanText: text,
        flaggedWord: word,
      };
    }
  }

  return {
    isSafe: true,
    cleanText: text,
  };
}
