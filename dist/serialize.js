const ALIGNS = ['l', 'c', 'r'];
const BORDER_VALUES = ['booktabs', 'grid', 'none'];
/**
 * Validate + coerce an unknown value (e.g. a parsed draft from storage) into a
 * well-formed TableData, or null if it can't be salvaged. Keeps a flaky cache /
 * an old schema from crashing a consumer. Storage itself (localStorage,
 * AsyncStorage, …) is the platform's job — the core stays I/O-free.
 */
export function validateTableData(x) {
    if (!x || typeof x !== 'object')
        return null;
    const d = x;
    if (!Array.isArray(d.header) || !Array.isArray(d.rows) || !Array.isArray(d.align))
        return null;
    const header = d.header.map((h) => String(h ?? ''));
    const cols = header.length;
    if (cols === 0)
        return null;
    const align = Array.from({ length: cols }, (_, i) => {
        const a = d.align[i];
        return ALIGNS.includes(a) ? a : 'l';
    });
    const rows = d.rows.map((r) => {
        const arr = Array.isArray(r) ? r : [];
        const cells = arr.map((c) => String(c ?? ''));
        while (cells.length < cols)
            cells.push('');
        return cells.slice(0, cols);
    });
    return {
        caption: typeof d.caption === 'string' ? d.caption : '',
        label: typeof d.label === 'string' ? d.label : 'tab:results',
        hasHeader: typeof d.hasHeader === 'boolean' ? d.hasHeader : true,
        borders: BORDER_VALUES.includes(d.borders) ? d.borders : 'booktabs',
        align,
        header,
        rows: rows.length ? rows : [header.map(() => '')],
    };
}
/** Stable JSON serialization of a table (for drafts / API payloads). */
export function serializeTable(d) {
    return JSON.stringify(d);
}
//# sourceMappingURL=serialize.js.map