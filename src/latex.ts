import type { TableData } from './types.js';

/**
 * Generate the LaTeX source for a table. The exact, canonical generator —
 * shared by every Lilia surface so "table → LaTeX" never diverges.
 *
 * - `booktabs` → `\toprule / \midrule / \bottomrule`, no vertical rules.
 * - `grid`     → `|l|c|r|` column spec + `\hline` around every row.
 * - `none`     → bare rows.
 */
export function tableToLatex(t: TableData): string {
  const spec = t.borders === 'grid' ? '|' + t.align.join('|') + '|' : t.align.join('');
  const headLine = t.header.join(' & ') + ' \\\\';
  const bodyLines = t.rows.map((r) => r.join(' & ') + ' \\\\');
  const I = '    ';
  const L: string[] = ['\\begin{table}[t]', '  \\centering'];
  if (t.caption) L.push('  \\caption{' + t.caption + '}');
  if (t.label) L.push('  \\label{' + t.label + '}');
  L.push('  \\begin{tabular}{' + spec + '}');
  if (t.borders === 'booktabs') {
    L.push(I + '\\toprule');
    if (t.hasHeader) { L.push(I + headLine); L.push(I + '\\midrule'); }
    bodyLines.forEach((b) => L.push(I + b));
    L.push(I + '\\bottomrule');
  } else if (t.borders === 'grid') {
    L.push(I + '\\hline');
    if (t.hasHeader) { L.push(I + headLine); L.push(I + '\\hline'); }
    bodyLines.forEach((b) => { L.push(I + b); L.push(I + '\\hline'); });
  } else {
    if (t.hasHeader) L.push(I + headLine);
    bodyLines.forEach((b) => L.push(I + b));
  }
  L.push('  \\end{tabular}', '\\end{table}');
  return L.join('\n');
}
