import { describe, it, expect } from 'vitest';
import { applyUnicodeFont } from '../src/lib/generator/unicode';
import { validateGameRules, getUnicodeLength } from '../src/lib/generator/rules';
import { generateGamingNames } from '../src/lib/generator/engine';

describe('Unicode Typography Transformations', () => {
  it('correctly transforms Latin letters into Small Caps', () => {
    const result = applyUnicodeFont('kadir', 'small_caps');
    expect(result).toBe('ᴋᴀᴅɪʀ');
  });

  it('correctly transforms Latin letters into Bold Gothic', () => {
    const result = applyUnicodeFont('kadir', 'bold_gothic');
    expect(result).toBe('𝖐𝖆𝖉𝖎𝖗');
  });

  it('correctly transforms Latin letters into Double Struck', () => {
    const result = applyUnicodeFont('kadir', 'double_struck');
    expect(result).toBe('𝕜𝕒𝕕𝕚𝕣');
  });

  it('correctly transforms Latin letters into Monospace', () => {
    const result = applyUnicodeFont('kadir', 'monospace');
    expect(result).toBe('𝚔𝚊𝚍𝚒𝚛');
  });

  it('correctly reverses and flips text for Inverted style', () => {
    const result = applyUnicodeFont('kadir', 'inverted');
    expect(result).toContain('ɹ');
  });
});

describe('Game Rules & Constraints Validation', () => {
  it('correctly measures multi-byte Unicode string length by codepoints', () => {
    expect(getUnicodeLength('亗Kᴀᴅɪʀ亗')).toBe(7);
    expect(getUnicodeLength('『Kadir』メ')).toBe(8);
  });

  it('validates Free Fire character limit (max 12 characters)', () => {
    const rules = { maxLength: 12, minLength: 3 };
    const valid = validateGameRules('亗Kᴀᴅɪʀ亗', rules);
    expect(valid.isValid).toBe(true);
    expect(valid.length).toBe(7);

    const tooLong = validateGameRules('亗SUPER_LONG_NAME_HERE亗', rules);
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.issues[0]).toContain('Too long');
  });

  it('flags forbidden characters configured for games', () => {
    const rules = { maxLength: 14, minLength: 3, forbiddenChars: ['<', '>'] };
    const res = validateGameRules('<Kadir>', rules);
    expect(res.isValid).toBe(false);
    expect(res.issues[0]).toContain('Forbidden character');
  });
});

describe('Gaming Name Generator Engine', () => {
  it('generates the requested number of unique names without duplicates', async () => {
    const output = await generateGamingNames({
      name: 'Kadir',
      count: 20,
      includeSymbols: true,
    });

    expect(output.results.length).toBe(20);
    const unique = new Set(output.results.map((r) => r.name));
    expect(unique.size).toBe(20);
  });

  it('generates names with deterministic seed', async () => {
    const run1 = await generateGamingNames({ name: 'Shadow', seed: 42, count: 5 });
    const run2 = await generateGamingNames({ name: 'Shadow', seed: 42, count: 5 });

    expect(run1.results.map((r) => r.name)).toEqual(run2.results.map((r) => r.name));
  });

  it('handles empty input gracefully by providing curated gamer defaults', async () => {
    const output = await generateGamingNames({ name: '', count: 10 });
    expect(output.results.length).toBe(10);
    expect(output.inputName.length).toBeGreaterThan(0);
  });
});
