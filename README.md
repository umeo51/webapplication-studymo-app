# Studymo - 15分で身につく学習習慣

![Studymo Logo](https://via.placeholder.com/400x100/4F46E5/FFFFFF?text=Studymo)

**Studymo**は、15分という短時間の学習を習慣化することで、効率的にスキルアップを図ることができる学習管理Webアプリケーションです。

## 🎯 プロジェクト概要

忙しい現代人でも続けられる学習習慣を身につけることを目的とし、フリーミアムモデルとGoogle AdSenseによる収益化を実現しています。

### ✨ 主な機能

- **15分学習タイマー**: 集中力を最大化する最適な学習時間
- **学習カテゴリー**: プログラミング、英語、ビジネスなど多様な分野
- **進捗管理**: 日次・週次の学習統計とスキルレベル表示
- **フリーミアムモデル**: 基本機能無料、プレミアム機能有料
- **レスポンシブデザイン**: PC・タブレット・スマートフォン対応

### 💰 収益化モデル

#### フリーミアムプラン
- **無料プラン**: 基本機能、1日5セッションまで、広告表示あり
- **プレミアムプラン**: 月額¥980、無制限セッション、全カテゴリー、広告なし

#### Google AdSense統合
- バナー広告、サイドバー広告、レクタングル広告、インタースティシャル広告

## 技術スタック

- **フロントエンド**: React 18, Vite 4, Tailwind CSS
- **アニメーション**: Framer Motion
- **状態管理**: React Context API
- **認証**: Firebase Authentication
- **データベース**: Firebase Firestore
- **広告**: Google AdSense
- **決済**: Stripe（実装予定）
- **デプロイ**: Vercel

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成し、必要な値を設定してください。

```bash
cp .env.example .env
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

### 4. ビルド

```bash
npm run build
```

## 環境変数

### Firebase設定
- `VITE_FIREBASE_API_KEY`: Firebase APIキー
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase認証ドメイン
- `VITE_FIREBASE_PROJECT_ID`: FirebaseプロジェクトID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebaseストレージバケット
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase Messaging送信者ID
- `VITE_FIREBASE_APP_ID`: Firebase アプリID
- `VITE_FIREBASE_MEASUREMENT_ID`: Firebase Analytics測定ID

### Google AdSense設定
- `VITE_ADSENSE_PUBLISHER_ID`: AdSenseパブリッシャーID
- `VITE_ADSENSE_BANNER_SLOT`: バナー広告スロットID
- `VITE_ADSENSE_SIDEBAR_SLOT`: サイドバー広告スロットID
- `VITE_ADSENSE_RECTANGLE_SLOT`: レクタングル広告スロットID
- `VITE_ADSENSE_INTERSTITIAL_SLOT`: インタースティシャル広告スロットID

## デプロイ

### Vercelでのデプロイ

1. GitHubリポジトリを作成してコードをプッシュ
2. Vercelアカウントでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ完了

### 環境変数の設定（Vercel）

Vercel管理画面の「Settings」→「Environment Variables」で以下を設定：

- すべての`VITE_`で始まる環境変数
- 本番環境用のFirebase設定
- AdSenseの実際のID

## 広告設定

### Google AdSenseの設定

1. [Google AdSense](https://www.google.com/adsense/)でアカウント作成
2. サイトを追加して審査申請
3. 審査通過後、広告ユニットを作成
4. 各広告ユニットのIDを環境変数に設定

### 広告の種類

- **バナー広告**: ページ上部に表示（728x90）
- **サイドバー広告**: サイドバーに表示（300x250）
- **レクタングル広告**: コンテンツ内に表示（300x250）
- **インタースティシャル広告**: セッション完了時に表示

## 課金機能（実装予定）

### Stripe統合

1. Stripeアカウントの作成
2. 商品とプライスの設定
3. Webhookエンドポイントの設定
4. 決済フローの実装

### プラン

- **無料プラン**: ¥0/月
- **プレミアム月額**: ¥680/月
- **プレミアム年額**: ¥6,800/年（17%オフ）

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## サポート

問題や質問がある場合は、GitHubのIssuesでお知らせください。
