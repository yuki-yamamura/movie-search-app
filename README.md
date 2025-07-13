# movie-search-app

[TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)から映画のデータを取得して、映画の検索機能を提供するアプリケーション

## Get Started

1. TMDB APIのアクセストークンを発行する
2. リポジトリをクローンする
3. `.env.local` にアクセストークンを設定する
4. 依存ライブラリをインストールする
5. ローカルサーバーを起動する

```sh
# 2. リポジトリをクローンする
git clone https://github.com/yuki-yamamura/movie-search-app.git
cd movie-search-app

# 3. `.env.local` にアクセストークンを設定する
cp .env.template .env.local
vim .env.local

# 4. 依存ライブラリをインストールする
npm install

# 5. ローカルサーバーを起動する
npm run dev
```

## 機能

- 映画を人気順に表示
- タイトルで検索
- リリース年で絞り込み
- 追加読み込み

## 技術スタック

- **プログラミング言語**: TypeScript
- **フレームワーク**: Next.js 15 (App Router)
- **スタイリング**: CSS Modules
- **データフェッチング**: SWR
- **テスト**: Vitest, React Testing Library
- **リンター**: ESLint, Stylelint
- **フォーマッター**: Prettier
