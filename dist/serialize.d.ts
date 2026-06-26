import type { TableData } from './types.js';
/**
 * Validate + coerce an unknown value (e.g. a parsed draft from storage) into a
 * well-formed TableData, or null if it can't be salvaged. Keeps a flaky cache /
 * an old schema from crashing a consumer. Storage itself (localStorage,
 * AsyncStorage, …) is the platform's job — the core stays I/O-free.
 */
export declare function validateTableData(x: unknown): TableData | null;
/** Stable JSON serialization of a table (for drafts / API payloads). */
export declare function serializeTable(d: TableData): string;
//# sourceMappingURL=serialize.d.ts.map