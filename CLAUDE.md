# meeting-timer — 会議タイマーツール

チーム会議の時間管理用ブラウザツール。発表者ごとの持ち時間をセットし、超過をアラートする。

## 背景
- チーム会議で発表が長引きがち
- 「あと1分」の合図を自動化したい
- 同僚にも配布したい → GitHub で共有予定

## 技術
- HTML + JavaScript（サーバー不要、ブラウザで開くだけ）
- 外部ライブラリなし

## ファイル構成
```
meeting-timer/
├── CLAUDE.md
├── .gitignore
├── index.html      # メイン画面
├── style.css       # スタイル
└── timer.js        # タイマーロジック
```

## GitHub 判断
→ **GitHub 管理（public）**: 同僚に共有するため。個人情報なし。
