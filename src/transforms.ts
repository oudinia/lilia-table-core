import type { Align, Borders, TableData } from './types.js';
import { ALIGN_NEXT } from './constants.js';

/**
 * Pure, immutable structural transforms. Every function returns a NEW TableData
 * (or the same reference when the op is a no-op, e.g. deleting the last column).
 * Consumers wire these into whatever state model they use — React `setState`,
 * a draft mutator, a store — without the core knowing or caring.
 */
const clone = (d: TableData): TableData => ({
  ...d,
  align: d.align.slice(),
  header: d.header.slice(),
  rows: d.rows.map((r) => r.slice()),
});

/** Set a cell. `r === -1` targets the header row. */
export function setCell(d: TableData, r: number, c: number, value: string): TableData {
  const n = clone(d);
  if (r === -1) n.header[c] = value; else n.rows[r][c] = value;
  return n;
}

export function setAlign(d: TableData, c: number, a: Align): TableData {
  const n = clone(d); n.align[c] = a; return n;
}
export function cycleAlign(d: TableData, c: number): TableData {
  const n = clone(d); n.align[c] = ALIGN_NEXT[n.align[c]]; return n;
}

export function addColumn(d: TableData, at: number, header = 'Column', align: Align = 'r'): TableData {
  const n = clone(d);
  n.header.splice(at, 0, header);
  n.align.splice(at, 0, align);
  n.rows = n.rows.map((r) => { const x = r.slice(); x.splice(at, 0, ''); return x; });
  return n;
}
/** Delete a column. No-op (returns the same reference) when only one remains. */
export function deleteColumn(d: TableData, c: number): TableData {
  if (d.header.length <= 1) return d;
  const n = clone(d);
  n.header.splice(c, 1);
  n.align.splice(c, 1);
  n.rows = n.rows.map((r) => { const x = r.slice(); x.splice(c, 1); return x; });
  return n;
}
export function moveColumn(d: TableData, from: number, to: number): TableData {
  if (to < 0 || to >= d.header.length || from === to) return d;
  const n = clone(d);
  const mv = <T,>(a: T[]) => { const [x] = a.splice(from, 1); a.splice(to, 0, x); };
  mv(n.header); mv(n.align); n.rows.forEach((r) => mv(r));
  return n;
}

export function addRow(d: TableData, at: number): TableData {
  const n = clone(d);
  n.rows.splice(at, 0, n.header.map(() => ''));
  return n;
}
/** Delete a row. No-op when only one remains. */
export function deleteRow(d: TableData, r: number): TableData {
  if (d.rows.length <= 1) return d;
  const n = clone(d); n.rows.splice(r, 1); return n;
}
export function moveRow(d: TableData, from: number, to: number): TableData {
  if (to < 0 || to >= d.rows.length || from === to) return d;
  const n = clone(d);
  const [x] = n.rows.splice(from, 1); n.rows.splice(to, 0, x);
  return n;
}

export function toggleHeader(d: TableData): TableData { return { ...d, hasHeader: !d.hasHeader }; }
export function setBorders(d: TableData, borders: Borders): TableData { return { ...d, borders }; }
export function setCaption(d: TableData, caption: string): TableData { return { ...d, caption }; }
/** Set the label; always stored with a single `tab:` prefix. */
export function setLabel(d: TableData, label: string): TableData {
  return { ...d, label: 'tab:' + label.replace(/^tab:/, '') };
}

/** Wrap (or unwrap) the focused cell in `\textbf{…}` or `$…$`. */
export function wrapCell(d: TableData, r: number, c: number, kind: 'bold' | 'math'): TableData {
  const cur = r === -1 ? d.header[c] : d.rows[r][c];
  let next: string;
  if (kind === 'bold') next = /^\\textbf\{[\s\S]*\}$/.test(cur) ? cur.replace(/^\\textbf\{([\s\S]*)\}$/, '$1') : `\\textbf{${cur}}`;
  else next = /^\$[\s\S]*\$$/.test(cur) ? cur.replace(/^\$([\s\S]*)\$$/, '$1') : `$${cur}$`;
  return setCell(d, r, c, next);
}

/** Reset to a blank single-row grid, keeping the column count. */
export function clearGrid(d: TableData): TableData {
  const n = clone(d);
  n.header = n.header.map((_, i) => 'Column ' + (i + 1));
  n.rows = [n.header.map(() => '')];
  return n;
}
