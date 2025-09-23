# Studymo - 15分で身につく学習習慣

Studymoは、15分の短時間学習を習慣化し、スキルアップを支援するWebアプリケーションです。

## 特徴

### 🎯 主要機能
- **15分タイマー学習**: 集中力を最大化する短時間学習セッション
- **学習カテゴリー**: プログラミング、英語、ビジネス、デザイン、マーケティング、ファイナンス
- **進捗追跡**: 日次・週次の学習進捗とスキルレベル管理
- **習慣化サポート**: 連続学習日数の記録と目標設定

### 💰 収益化モデル
- **フリーミアム**: 基本機能は無料、プレミアム機能は有料
- **サブスクリプション**: 月額680円、年額6,800円（17%オフ）
- **広告収入**: Google AdSense統合による広告表示

### 🔒 プレミアム機能
- 無制限学習セッション（無料版は1日1回制限）
- 全学習カテゴリーへのアクセス
- 詳細分析レポート
- AI学習アドバイザー
- 広告非表示

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
