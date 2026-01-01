# VecBooru

ベクトル検索でタグを検索するためのWebアプリケーションです。

## 機能

- 自然言語でタグを検索
- タグ名・エイリアスの表示
- ジャンル（general, artist, copyright, character, meta）の色分け表示
- クリップボードへのコピー
- URL検索パラメータ対応（`?q=xxx`）

## 技術スタック

- React + TypeScript
- Vite
- Radix UI Themes
- TanStack Query / Router
- @huggingface/transformers（テキスト埋め込み）
- @hdae/hnsw（ベクトル検索）

## 開発

```bash
pnpm install
pnpm dev
```

## ビルド

```bash
pnpm build
```
