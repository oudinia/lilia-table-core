import type { Align, TableData } from './types.js';

/**
 * Parse a pasted Excel / Google Sheets / CSV block into a rectangular grid.
 * Tab-separated wins over comma; ragged rows are padded to the widest. Returns
 * null when the text isn't tabular (so callers fall back to a normal paste).
 */
export function parsePaste(text: string): string[][] | null {
  if (!text || !(text.includes('\t') || text.includes('\n'))) return null;
  const lines = text.replace(/\r/g, '').split('\n').filter((l) => l.length > 0);
  if (!lines.length) return null;
  const delim = lines[0].includes('\t') ? '\t' : ',';
  const grid = lines.map((l) => l.split(delim).map((c) => c.trim()));
  const cols = Math.max(...grid.map((r) => r.length));
  return grid.map((r) => { const x = r.slice(); while (x.length < cols) x.push(''); return x; });
}

/**
 * Replace a table's header + rows from a pasted grid (first row → headers).
 * Existing per-column alignment is preserved by index; new columns default to
 * right-aligned (the numeric-data default).
 */
export function applyPaste(d: TableData, grid: string[][]): TableData {
  if (!grid.length) return d;
  const header = grid[0];
  const body = grid.slice(1);
  const align: Align[] = header.map((_, i) => d.align[i] ?? 'r');
  return {
    ...d,
    header,
    align,
    rows: body.length ? body : [header.map(() => '')],
  };
}

/** Parse a paste and apply it in one step; no-op when the text isn't tabular. */
export function pasteIntoTable(d: TableData, text: string): TableData {
  const grid = parsePaste(text);
  return grid ? applyPaste(d, grid) : d;
}
