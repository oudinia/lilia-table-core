import type { Align, Borders, TableData } from './types.js';
/** Set a cell. `r === -1` targets the header row. */
export declare function setCell(d: TableData, r: number, c: number, value: string): TableData;
export declare function setAlign(d: TableData, c: number, a: Align): TableData;
export declare function cycleAlign(d: TableData, c: number): TableData;
export declare function addColumn(d: TableData, at: number, header?: string, align?: Align): TableData;
/** Delete a column. No-op (returns the same reference) when only one remains. */
export declare function deleteColumn(d: TableData, c: number): TableData;
export declare function moveColumn(d: TableData, from: number, to: number): TableData;
export declare function addRow(d: TableData, at: number): TableData;
/** Delete a row. No-op when only one remains. */
export declare function deleteRow(d: TableData, r: number): TableData;
export declare function moveRow(d: TableData, from: number, to: number): TableData;
export declare function toggleHeader(d: TableData): TableData;
export declare function setBorders(d: TableData, borders: Borders): TableData;
export declare function setCaption(d: TableData, caption: string): TableData;
/** Set the label; always stored with a single `tab:` prefix. */
export declare function setLabel(d: TableData, label: string): TableData;
/** Wrap (or unwrap) the focused cell in `\textbf{…}` or `$…$`. */
export declare function wrapCell(d: TableData, r: number, c: number, kind: 'bold' | 'math'): TableData;
/** Reset to a blank single-row grid, keeping the column count. */
export declare function clearGrid(d: TableData): TableData;
//# sourceMappingURL=transforms.d.ts.map