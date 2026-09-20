> ## ⚠️ Dormant — Parked
>
> Never published to npm and never consumed by either web app; `TableData.rows` here is still `string[][]`, while the editor's model has moved to `Cell[][]` with spans. Parked deliberately — see the 19 September scope decision in `lilia-docs`.
>
> *Marked 20 September 2026. The active Lilia stack is `lilia-editor-api`, `lilia-web-editor`, `lilia-docs`, `lilia-cloud` and `lilia-latex-service`.*

---

# @lilia/table-core

Framework-agnostic core for the Lilia **LaTeX table editor**. Pure TypeScript —
**no React, no DOM, no React Native, no storage/IO**. One source of truth for the
table data model, the `booktabs` LaTeX generator, cell tokenizing for previews,
and immutable structural transforms.

Consumed by:
- **lilia-cloud** (web editor / PWA) — supplies the DOM UI + localStorage.
- **lilia-mobile** (React Native, iOS-first) — supplies the RN UI + AsyncStorage.

Each layer brings its own **UI, storage, and API wiring**; the model + LaTeX +
edit logic live here so "table → LaTeX" can never diverge between surfaces.

## Install / consume

It's a plain TS package that builds to ESM + `.d.ts` (NodeNext, so it works in
Node, Next/Turbopack, and Metro). Until it's published, depend on it locally:

```jsonc
// consumer package.json
"dependencies": { "@lilia/table-core": "file:../lilia-table-core" }
```

- **React Native (Metro):** add `@lilia/table-core` to the RN app and (if needed)
  list it under Metro's `watchFolders` / `extraNodeModules`, or drop it in the
  lilia-mobile monorepo as a workspace package. Metro resolves the ESM directly.
- **Next.js / PWA (Vercel):** a `file:` dep to a sibling repo won't resolve in
  CI. For production either **publish** (npm / GitHub Packages) or **vendor**
  (git submodule / `git subtree`) so the package ships inside the deployable repo.

```bash
npm run build      # tsc → dist/ (ESM + .d.ts + sourcemaps)
npm run typecheck  # tsc --noEmit
```

## API

```ts
import {
  // model
  type TableData, type Align, type Borders, type CellRef, type CellToken,
  TABLE_SAMPLE, FREE_ROWS, FREE_COLS, ALIGN_NEXT, ALIGN_LABEL, BORDERS, alignToTextAlign,
  // latex
  tableToLatex,
  // preview tokenizing (render the tokens yourself per platform)
  parseCellTokens, mathPretty, cellToPlainText, MATH_MAP,
  // immutable transforms (each returns a NEW TableData; no-op ops return the same ref)
  setCell, setAlign, cycleAlign,
  addColumn, deleteColumn, moveColumn,
  addRow, deleteRow, moveRow,
  toggleHeader, setBorders, setCaption, setLabel, wrapCell, clearGrid,
  // paste (Excel / Sheets / CSV)
  parsePaste, applyPaste, pasteIntoTable,
  // safe (de)serialization for drafts / payloads
  validateTableData, serializeTable,
} from '@lilia/table-core';
```

### The cell-rendering contract

A cell's **string is its LaTeX** (`\textbf{…}`, `$…$`). The core never returns
framework nodes — it returns a `CellToken[]` you render per platform:

```tsx
// Web (React DOM)
function Cell({ raw }: { raw: string }) {
  return <>{parseCellTokens(raw).map((t, i) =>
    t.kind === 'text' ? <span key={i}>{t.value}</span> :
    t.kind === 'math' ? <i key={i}>{mathPretty(t.value)}</i> :
    <b key={i}><Cell raw={/* bold children */ ''} /></b>)}</>;
}
```

```tsx
// React Native
import { Text } from 'react-native';
function Cell({ raw }: { raw: string }) {
  return <Text>{parseCellTokens(raw).map((t, i) =>
    t.kind === 'text' ? t.value :
    t.kind === 'math' ? <Text key={i} style={{ fontStyle: 'italic' }}>{mathPretty(t.value)}</Text> :
    <Text key={i} style={{ fontWeight: 'bold' }}>{/* render t.children */}</Text>)}</Text>;
}
```

### Editing — wire the transforms into your state

```ts
// immutable — drop straight into React setState
setData(d => deleteColumn(d, c));
setData(d => addRow(d, d.rows.length));
setData(d => cycleAlign(d, c));
setData(d => pasteIntoTable(d, clipboardText));
```

The "Open in Lilia" handoff, the free/Pro gating (compare against `FREE_ROWS` /
`FREE_COLS`), and storage are **the consumer's** job — the core just computes.

## Status

`v0.1.0` — extracted 2026-06-25 from `lilia-cloud/components/tools/table/shared.tsx`.
Next: have lilia-cloud and lilia-mobile both import from here (publish or vendor)
so the duplicated logic in `shared.tsx` collapses onto this package.
