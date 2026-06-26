import type { TableData } from './types.js';
/**
 * Parse a pasted Excel / Google Sheets / CSV block into a rectangular grid.
 * Tab-separated wins over comma; ragged rows are padded to the widest. Returns
 * null when the text isn't tabular (so callers fall back to a normal paste).
 */
export declare function parsePaste(text: string): string[][] | null;
/**
 * Replace a table's header + rows from a pasted grid (first row → headers).
 * Existing per-column alignment is preserved by index; new columns default to
 * right-aligned (the numeric-data default).
 */
export declare function applyPaste(d: TableData, grid: string[][]): TableData;
/** Parse a paste and apply it in one step; no-op when the text isn't tabular. */
export declare function pasteIntoTable(d: TableData, text: string): TableData;
//# sourceMappingURL=paste.d.ts.map