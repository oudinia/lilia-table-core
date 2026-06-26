/** Free-tier soft cap (everyday tables). Beyond this, consumers show the upsell. */
export const FREE_ROWS = 20;
export const FREE_COLS = 10;
export const ALIGN_NEXT = { l: 'c', c: 'r', r: 'l' };
export const ALIGN_LABEL = { l: 'Left', c: 'Center', r: 'Right' };
export const BORDERS = [
    { v: 'booktabs', label: 'booktabs' },
    { v: 'grid', label: 'Full grid' },
    { v: 'none', label: 'No rules' },
];
/** Map an alignment to a CSS / RN `textAlign` value. */
export const alignToTextAlign = (a) => a === 'l' ? 'left' : a === 'c' ? 'center' : 'right';
/** A worked example table (used as the editor's starting state). */
export const TABLE_SAMPLE = {
    caption: 'Top-1 accuracy by dataset and method (%).',
    label: 'tab:results',
    hasHeader: true,
    borders: 'booktabs',
    align: ['l', 'r', 'r', 'r'],
    header: ['Dataset', 'Baseline', '\\textbf{Ours}', '$\\Delta$'],
    rows: [
        ['CIFAR-10', '92.1', '94.8', '$+2.7$'],
        ['ImageNet', '76.3', '79.0', '$+2.7$'],
        ['SST-2', '88.5', '91.2', '$+2.7$'],
        ['SQuAD', '81.0', '84.4', '$+3.4$'],
    ],
};
//# sourceMappingURL=constants.js.map