import type { CellToken } from './types.js';
/** A small glyph map so previews can show common math without a LaTeX engine. */
export declare const MATH_MAP: Record<string, string>;
/**
 * Prettify the inner of a `$…$` token for display (preview only — not a LaTeX
 * engine). Strips braces and substitutes the glyph map.
 */
export declare function mathPretty(s: string): string;
/**
 * Parse a raw cell string into a token tree a platform renderer can walk.
 * Recognises `\textbf{…}` (bold, recursively parsed) and `$…$` (math). Returns
 * framework-agnostic tokens — never React/RN nodes.
 */
export declare function parseCellTokens(raw: string): CellToken[];
/** Plain-text projection of a cell (math glyph-substituted) — for search, ARIA, etc. */
export declare function cellToPlainText(raw: string): string;
//# sourceMappingURL=cells.d.ts.map