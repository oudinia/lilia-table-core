/**
 * @lilia/table-core — framework-agnostic core for the Lilia LaTeX table editor.
 *
 * Pure TypeScript: no React, no DOM, no React Native, no storage/IO. One source
 * of truth for the table data model, the booktabs LaTeX generator, cell
 * tokenizing for previews, and immutable structural transforms. Consumed by the
 * web editor (lilia-cloud) and the React Native app (lilia-mobile); each layer
 * supplies its own UI, storage, and API wiring.
 */
export type { Align, Borders, TableData, CellRef, CellToken } from './types.js';
export { FREE_ROWS, FREE_COLS, ALIGN_NEXT, ALIGN_LABEL, BORDERS, alignToTextAlign, TABLE_SAMPLE, } from './constants.js';
export { tableToLatex } from './latex.js';
export { MATH_MAP, mathPretty, parseCellTokens, cellToPlainText } from './cells.js';
export { setCell, setAlign, cycleAlign, addColumn, deleteColumn, moveColumn, addRow, deleteRow, moveRow, toggleHeader, setBorders, setCaption, setLabel, wrapCell, clearGrid, } from './transforms.js';
export { parsePaste, applyPaste, pasteIntoTable } from './paste.js';
export { validateTableData, serializeTable } from './serialize.js';
//# sourceMappingURL=index.d.ts.map