import type { TableData } from './types.js';
/**
 * Generate the LaTeX source for a table. The exact, canonical generator —
 * shared by every Lilia surface so "table → LaTeX" never diverges.
 *
 * - `booktabs` → `\toprule / \midrule / \bottomrule`, no vertical rules.
 * - `grid`     → `|l|c|r|` column spec + `\hline` around every row.
 * - `none`     → bare rows.
 */
export declare function tableToLatex(t: TableData): string;
//# sourceMappingURL=latex.d.ts.map