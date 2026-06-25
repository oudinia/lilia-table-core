// Core data model for the Lilia LaTeX table editor. Framework-agnostic.

export type Align = 'l' | 'c' | 'r';
export type Borders = 'booktabs' | 'grid' | 'none';

/**
 * The single source of truth for a table. A cell's STRING IS its LaTeX —
 * `\textbf{…}` and `$…$` flow through to the generated source verbatim and are
 * interpreted by the renderers for preview.
 */
export interface TableData {
  /** `\caption{…}` — empty string omits the line. */
  caption: string;
  /** `\label{tab:…}` — stored with the `tab:` prefix. */
  label: string;
  /** Header row → `\toprule … \midrule` vs body-only. */
  hasHeader: boolean;
  borders: Borders;
  /** One per column → the `{lcr}` tabular column spec. */
  align: Align[];
  /** One per column. */
  header: string[];
  /** rows × columns. */
  rows: string[][];
}

/** A cell address. `r === -1` is the header row. */
export interface CellRef { r: number; c: number }

/**
 * A parsed cell, ready for a platform renderer to walk (React DOM, React
 * Native, etc.). The core never returns framework nodes — only this token tree.
 */
export type CellToken =
  | { kind: 'text'; value: string }
  | { kind: 'math'; value: string }            // raw inner of `$…$`; pass through `mathPretty` for display
  | { kind: 'bold'; children: CellToken[] };   // inner of `\textbf{…}`, recursively parsed
