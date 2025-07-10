# movie-search-app

[TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)から映画のデータを取得して、映画の検索機能を提するアプリケーション

## Get Started

1. TMDB APIのアクセストークンを発行する
2. リポジトリをクリーンする
3. `.env.local` にアクセストークンを設定する
4. 依存ライブラリをインストールする
5. ローカルサーバーを起動する

```sh
# 2. リポジトリをクリーンする
git clone https://github.com/yuki-yamamura/movie-search-app.git

# 3. `.env.local` にアクセストークンを設定する
cp .env.local.template .env.local
vim .env.local

# 4. 依存ライブラリをインストールする
npm install

# 5. ローカルサーバーを起動する
npm run dev
```
