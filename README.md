# AI適職診断 (TEKISHOKU) - Mobile-First Career Aptitude Assessment

モバイル最適化されたAI適職診断アプリケーションです。MBTIタイプに基づいた詳細なキャリア分析とAIによるアドバイスを提供します。

## 🚀 特徴

- **モバイルファースト設計**: 375px-414px のスマートフォン画面に最適化
- **40問のMBTI診断**: 包括的な性格タイプ分析
- **AI搭載キャリア相談**: Gemini APIを活用したパーソナライズされたアドバイス
- **タッチ最適化UI**: 44px以上のタッチターゲットサイズ
- **セーフエリア対応**: ノッチ付きデバイスでの適切な表示
- **高速ビルド**: Vite + TypeScript + React 18

## 📱 モバイル最適化

- レスポンシブデザイン（モバイル専用）
- タッチジェスチャー対応
- iOS/Androidでの最適な表示
- プルツーリフレッシュ無効化
- カスタムスクロールバー

## 🛠 技術スタック

- **フロントエンド**: React 18, TypeScript, Vite
- **スタイリング**: Tailwind CSS, カスタムCSS
- **ルーティング**: React Router DOM
- **アニメーション**: Framer Motion
- **AI**: Google Gemini API
- **デプロイ**: Vercel

## 🏃‍♂️ ローカル実行

**前提条件**: Node.js 18以上

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. 環境変数を設定:
   `.env.local` ファイルを作成し、Gemini API キーを設定
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

4. ブラウザで http://localhost:3000 を開く

## 🚀 Vercelデプロイ

### 方法1: Vercel CLI

1. Vercel CLIをインストール:
   ```bash
   npm i -g vercel
   ```

2. プロジェクトをデプロイ:
   ```bash
   vercel
   ```

3. 環境変数を設定:
   ```bash
   vercel env add GEMINI_API_KEY
   ```

### 方法2: GitHub連携

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. "New Project" をクリック
3. GitHubリポジトリ `045fortyfive/tekishoku` を選択
4. 環境変数 `GEMINI_API_KEY` を設定
5. デプロイを実行

## 📦 ビルド

```bash
npm run build
```

ビルド成果物は `dist/` フォルダに生成されます。

## 🧪 プレビュー

```bash
npm run preview
```

## 📁 プロジェクト構造

```
├── components/          # Reactコンポーネント
│   ├── ai/             # AI関連コンポーネント
│   ├── career/         # キャリア関連コンポーネント
│   └── layout/         # レイアウトコンポーネント
├── lib/                # ユーティリティとロジック
├── pages/              # ページコンポーネント
├── types.ts            # TypeScript型定義
├── constants.tsx       # 定数
├── vercel.json         # Vercel設定
└── vite.config.ts      # Vite設定
```

## 🔧 設定ファイル

- `vercel.json`: Vercelデプロイ設定
- `vite.config.ts`: ビルド最適化設定
- `tsconfig.json`: TypeScript設定
- `index.css`: モバイル最適化CSS

## 📱 モバイルテスト

開発者ツールでモバイルビューを確認:
- iPhone SE (375x667)
- iPhone 12 Pro (390x844)
- Samsung Galaxy S20 (360x800)

## 🤝 コントリビューション

1. フォークしてブランチを作成
2. 変更を実装
3. テストを実行
4. プルリクエストを作成

## 📄 ライセンス

© 2025 HUGAN AI Career Diagnosis. All rights reserved.
