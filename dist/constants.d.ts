import type { Align, Borders, TableData } from './types.js';
/** Free-tier soft cap (everyday tables). Beyond this, consumers show the upsell. */
export declare const FREE_ROWS = 20;
export declare const FREE_COLS = 10;
export declare const ALIGN_NEXT: Record<Align, Align>;
export declare const ALIGN_LABEL: Record<Align, string>;
export declare const BORDERS: readonly {
    v: Borders;
    label: string;
}[];
/** Map an alignment to a CSS / RN `textAlign` value. */
export declare const alignToTextAlign: (a: Align) => "left" | "center" | "right";
/** A worked example table (used as the editor's starting state). */
export declare const TABLE_SAMPLE: TableData;
//# sourceMappingURL=constants.d.ts.map