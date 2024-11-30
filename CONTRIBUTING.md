# プロジェクトに初めて参画される方へ

## 目次

---

-   [概要](#概要)
-   [初めての方](#初めての方)
    -   [各種設定](#各種設定)
        -   [セットアップ](#セットアップ)
        -   [.envファイル設定](#.envファイル設定)
        -   [VSCode拡張機能](#VSCode拡張機能)
        -   [Chrome拡張機能](#Chrome拡張機能)
-   [参考](#参考)
-   [その他](#その他)

## 概要

---

-   このプロジェクトのコントリビューターがはじめに実施すべきことを記載しているドキュメントとなります。

## 🔰初めての方

---

### 各種設定

#### セットアップ

```shell
sh ./scripts/setup.sh
```

#### .envファイル設定

ファイルを作成してください。

```shell
touch .env

echo "RUN_PORT = 3000" >> .env
```

```env
RUN_PORT = 3000
```

#### サーバー起動

```shell
# ローカル
bun run local

# 開発
bun run dev
```

**[こちらへアクセス](http://localhost:3000)**

#### Storybook起動

```shell
bun run storybook
```

**[こちらへアクセス](http://localhost:6006)**

#### VSCode拡張機能

[こちら](.vscode/settings.json)に記載されている拡張機能をすべてインストールしてください。

拡張機能の検索窓で`@recommended`と検索、全てインストール

#### Chrome拡張機能

以下、インストールしてください。

### 開発周り

[React Developer Tools](chrome://extensions/?id=fmkadmapgofadopljbjfkapdkoienihi)

[Lighthouse](chrome://extensions/?id=blipmdconlkpinefehnmjammfjpmpbjk)

### その他

[GoFullPage](https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl?hl=ja)

[]()

## 📚参考

以下、ドキュメント群も併せて目を通してください。

[アーキテクチャについて](./docs/architecture/アーキテクチャ.md)

[ディレクトリ構成](./docs/architecture/ディレクトリ構成.md)

[デザインについて](./docs/design/)

[テストについて](./docs/test/)

[コーディング規約](./docs/コーディング規約.md)

---
