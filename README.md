# Blog site with Next.js app directory

## git clone の後

`frontend`, `backend` ディレクトリそれぞれで

```
npm install
```

## データベース起動

Docker Compose で postgreSQL を起動します。dev も prod も同じ DB を向いています。

```sh
docker compose up -d
```

## アプリ起動

### backend

```sh
cd backend

# 環境変数ファイル作成
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/blogdb?schema=public"' > .env

# データベース作成
npx prisma migrate dev

# サーバー起動
npm run dev
```

### frontend

```sh
cd frontend

# 環境変数ファイル作成
echo 'API_SERVER_ORIGIN=http://127.0.0.1:4000' > .env.local

# サーバー起動
npm run dev
```

http://localhost:3000 にアクセス
