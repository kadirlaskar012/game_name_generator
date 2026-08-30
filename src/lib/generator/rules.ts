export interface GameRules {
  maxLength: number;
  minLength: number;
  allowedRegex?: string;
  forbiddenChars?: string[];
  preferredSymbols?: string[];
  nameFormat?: string;
  customPrefixes?: string[];
  customSuffixes?: string[];
}

export interface RuleValidationResult {
  isValid: boolean;
  length: number;
  maxLength: number;
  minLength: number;
  issues: string[];
  score: number; // 0 to 100 quality score
}

/**
 * Calculates character length by code points (handles Unicode glyphs accurately).
 */
export function getUnicodeLength(str: string): number {
  return Array.from(str).length;
}

/**
 * Validates a name string against specific game rules.
 */
export function validateGameRules(name: string, rules?: GameRules): RuleValidationResult {
  const maxLength = rules?.maxLength || 16;
  const minLength = rules?.minLength || 2;
  const length = getUnicodeLength(name);
  const issues: string[] = [];

  // Length checks
  if (length < minLength) {
    issues.push(`Too short: Name has ${length} chars (minimum is ${minLength})`);
  }
  if (length > maxLength) {
    issues.push(`Too long: Name has ${length} chars (maximum is ${maxLength})`);
  }

  // Forbidden characters check
  if (rules?.forbiddenChars && rules.forbiddenChars.length > 0) {
    for (const char of rules.forbiddenChars) {
      if (name.includes(char)) {
        issues.push(`Forbidden character detected: "${char}"`);
      }
    }
  }

  // Regex pattern check
  if (rules?.allowedRegex && rules.allowedRegex !== '.*') {
    try {
      const reg = new RegExp(rules.allowedRegex, 'u');
      if (!reg.test(name)) {
        issues.push(`Contains characters not supported by this game`);
      }
    } catch {
      // Ignore invalid regex
    }
  }

  const isValid = issues.length === 0;

  // Calculate aesthetic quality score
  let score = 70;
  if (isValid) score += 20;
  if (rules?.preferredSymbols?.some((s) => name.includes(s))) score += 10;
  if (length >= 4 && length <= maxLength - 2) score += 5;

  return {
    isValid,
    length,
    maxLength,
    minLength,
    issues,
    score: Math.min(100, Math.max(0, score)),
  };
}
