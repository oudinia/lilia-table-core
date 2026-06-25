import type { CellToken } from './types.js';

/** A small glyph map so previews can show common math without a LaTeX engine. */
export const MATH_MAP: Record<string, string> = {
  '\\Delta': 'Δ', '\\delta': 'δ', '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ',
  '\\mu': 'µ', '\\sigma': 'σ', '\\lambda': 'λ', '\\theta': 'θ', '\\pi': 'π',
  '\\times': '×', '\\pm': '±', '\\leq': '≤', '\\geq': '≥', '\\approx': '≈',
  '\\rightarrow': '→', '\\cdot': '·', '\\infty': '∞', '\\circ': '°',
};

/**
 * Prettify the inner of a `$…$` token for display (preview only — not a LaTeX
 * engine). Strips braces and substitutes the glyph map.
 */
export function mathPretty(s: string): string {
  let out = s;
  for (const k in MATH_MAP) out = out.split(k).join(MATH_MAP[k]);
  return out.replace(/[{}]/g, '');
}

/**
 * Parse a raw cell string into a token tree a platform renderer can walk.
 * Recognises `\textbf{…}` (bold, recursively parsed) and `$…$` (math). Returns
 * framework-agnostic tokens — never React/RN nodes.
 */
export function parseCellTokens(raw: string): CellToken[] {
  if (raw == null) return [{ kind: 'text', value: '' }];
  const re = /\\textbf\{([^}]*)\}|\$([^$]*)\$/g;
  const out: CellToken[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    if (m.index > last) out.push({ kind: 'text', value: raw.slice(last, m.index) });
    if (m[1] != null) out.push({ kind: 'bold', children: parseCellTokens(m[1]) });
    else out.push({ kind: 'math', value: m[2] });
    last = re.lastIndex;
  }
  if (last < raw.length) out.push({ kind: 'text', value: raw.slice(last) });
  return out.length ? out : [{ kind: 'text', value: '' }];
}

/** Plain-text projection of a cell (math glyph-substituted) — for search, ARIA, etc. */
export function cellToPlainText(raw: string): string {
  return parseCellTokens(raw)
    .map((t) => (t.kind === 'text' ? t.value : t.kind === 'math' ? mathPretty(t.value) : t.children.map((c) => (c.kind === 'text' ? c.value : c.kind === 'math' ? mathPretty(c.value) : '')).join('')))
    .join('');
}
