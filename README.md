# 双葉 オーダーシステム

鉄板居酒屋 双葉 周年イベント当日用のオーダー管理システムです。

---

## 必要なファイル構成

```
order/
├── index.html       ← スタッフ用（注文入力・卓管理・会計）
├── kitchen.html     ← キッチン用（注文確認・ステータス管理）
├── style.css        ← スタイルシート
├── firebase.js      ← Firebase設定と共通関数
├── app.js           ← スタッフ画面のロジック
├── kitchen.js       ← キッチン画面のロジック
├── firestore.rules  ← Firestoreセキュリティルール
└── README.md        ← このファイル
```

---

## セットアップ手順

### Step 1: Firebase プロジェクトを作成する

1. [Firebase Console](https://console.firebase.google.com/) を開く
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `futaba-order`）
4. Google アナリティクスは「今は必要ない」でOK
5. 「プロジェクトを作成」をクリック

---

### Step 2: Firestoreデータベースを作成する

1. Firebase Console の左メニューから **「Firestore Database」** を選択
2. 「データベースを作成」をクリック
3. **「テストモードで開始」** を選択（あとでルールを設定します）
4. ロケーションは **「asia-northeast1（東京）」** を選択
5. 「完了」をクリック

---

### Step 3: Firebase設定をコピーする

1. Firebase Console の左上の歯車アイコン → **「プロジェクトの設定」**
2. 「マイアプリ」セクションの **「</>（Web）」** アイコンをクリック
3. アプリ名を入力（例: `order-app`）して「アプリを登録」
4. 表示される `firebaseConfig` をコピー

---

### Step 4: firebase.js に設定を貼り付ける

`firebase.js` を開いて、以下の部分を書き換えます：

```javascript
const firebaseConfig = {
  // ここにFirebase設定を入れる  ← この行の下に貼り付け
  apiKey: "AIzaSy...",           // コピーした値に置き換える
  authDomain: "futaba-order.firebaseapp.com",
  projectId: "futaba-order",
  storageBucket: "futaba-order.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

### Step 5: Firestoreセキュリティルールを設定する

1. Firebase Console の **「Firestore Database」** → **「ルール」** タブ
2. `firestore.rules` の内容をすべてコピー
3. ルールエディタに貼り付けて「公開」をクリック

---

### Step 6: GitHub Pages で公開する

1. [GitHub](https://github.com) でリポジトリを作成（例: `futaba-order`）
2. `order/` フォルダの中身をすべてアップロード
3. リポジトリの **Settings → Pages** を開く
4. Source を **「Deploy from a branch」** に設定
5. Branch を **「main」**、フォルダを **「/ (root)」** に設定
6. 「Save」をクリック
7. 数分後に `https://[ユーザー名].github.io/futaba-order/` で公開される

> **ヒント**: `index.html` が GitHub Pages のルートになります。
> キッチン画面は `https://[ユーザー名].github.io/futaba-order/kitchen.html` です。

---

## 初回セットアップ（当日前に実施）

1. スマホで `index.html` を開く
2. **「卓一覧」** タブを開く
3. **「初期データ生成」** ボタンをタップ
4. 「OK」を押すと卓1〜20とサンプルメニューが自動で作成される

> **注意**: このボタンは一度だけ押してください。  
> 繰り返し押すと卓・メニューが重複して登録されます。

---

## 当日の運用方法

### スタッフ（ホール側）

1. スマホで `index.html` を開く（ブックマーク推奨）
2. 「卓一覧」タブで卓カードをタップ → 人数・使用状態を設定
3. 「注文入力」タブで卓を選択 → 商品を選んで「注文を送信する」
4. 「会計確認」タブで会計時に「会計済みにする」をタップ

### キッチン（調理側）

1. タブレットやPCで `kitchen.html` を開く（ブックマーク推奨）
2. 注文が入ると自動で画面に表示される
3. 「未対応」→「調理中」→「提供済み」の順にボタンをタップ
4. ブラウザのタブが点滅して新着注文を知らせる

---

## 画面説明

### スタッフ画面（index.html）

| タブ | 内容 |
|------|------|
| 卓一覧 | 全卓の状態を一覧表示。タップで卓設定を編集 |
| 注文入力 | 卓を選んでメニューを選択、注文を送信 |
| 会計確認 | 未会計の卓一覧と合計金額、会計済み処理 |
| メニュー編集 | メニューの追加・価格変更・売り切れ設定 |

### キッチン画面（kitchen.html）

- 新しい注文が上に表示される
- 未対応（ゴールド枠）・調理中（オレンジ枠）・提供済み（非表示に近い）で色分け
- アレルギー関連メモは赤で強調表示
- フィルタータブでステータス別に絞り込み可能

---

## メニューのカスタマイズ

1. スタッフ画面の「メニュー編集」タブを開く
2. 右上の「+ 追加」ボタンから新規追加
3. 既存メニューの名前・価格はその場で編集可能
4. 「非表示にする」でメニューから外せる（物理削除はしない）
5. 「売り切れ」にすると注文入力画面で選べなくなる

---

## 卓のカスタマイズ

1. 「卓一覧」タブの卓カードをタップ
2. 卓番号・表示名・人数・使用中/未使用を編集
3. 「保存する」でFirestoreに即時反映

---

## トラブルシューティング

### データが表示されない

- `firebase.js` の `firebaseConfig` が正しく設定されているか確認
- Firestoreのセキュリティルールが「テストモード」または正しく設定されているか確認
- ブラウザの開発者ツール（F12）のコンソールでエラーを確認

### 「初期データ生成」が失敗する

- Firebase設定（`firebaseConfig`）の `projectId` が正しいか確認
- Firestoreが「テストモード」で開始されているか確認
- セキュリティルールで書き込みが許可されているか確認

### キッチン画面が更新されない

- ブラウザを更新（Ctrl+Shift+R）してみる
- Firestoreのリアルタイムリスナーが正常に動作しているかコンソールで確認

---

## データ構造（Firestore）

### tables コレクション

| フィールド | 型 | 説明 |
|-----------|-----|------|
| tableNumber | string | 卓番号（例: "3"） |
| displayName | string | 表示名（例: "VIP席"） |
| guestCount | number | 滞在人数 |
| isActive | boolean | 使用中かどうか |
| isPaid | boolean | 会計済みかどうか |
| currentTotal | number | 未会計合計額（参考値） |
| updatedAt | timestamp | 最終更新日時 |

### menus コレクション

| フィールド | 型 | 説明 |
|-----------|-----|------|
| name | string | メニュー名 |
| price | number | 価格（税込） |
| category | string | カテゴリ（ドリンク/フード等） |
| isVisible | boolean | 注文入力画面に表示するか |
| isSoldOut | boolean | 売り切れかどうか |
| order | number | 表示順序（小さいほど上） |
| updatedAt | timestamp | 最終更新日時 |

### orders コレクション

| フィールド | 型 | 説明 |
|-----------|-----|------|
| tableNumber | string | 卓番号 |
| displayName | string | 卓表示名 |
| guestCount | number | 注文時の人数 |
| items | array | 注文商品リスト |
| items[].menuId | string | メニューID |
| items[].name | string | 商品名 |
| items[].price | number | 単価 |
| items[].quantity | number | 個数 |
| items[].note | string | 商品ごとのメモ |
| orderNote | string | 注文全体のメモ |
| totalPrice | number | 合計金額 |
| status | string | 未対応 / 調理中 / 提供済み |
| isPaid | boolean | 会計済みかどうか |
| createdAt | timestamp | 注文日時 |
| updatedAt | timestamp | 最終更新日時 |

---

## セキュリティについて

このシステムはイベント当日の内部運用を想定しています。  
セキュリティをより強化したい場合は：

1. Firebase Authentication を導入する
2. `firestore.rules` の本番推奨ルールに切り替える
3. 店舗のWi-Fiのみからアクセスするよう案内する

---

*双葉 3周年おめでとうございます！*
