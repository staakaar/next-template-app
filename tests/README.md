# E2E Testing with Playwright

このディレクトリには、Playwrightを使用したE2Eテストが含まれています。

## セットアップ

1. 依存関係をインストール:
```bash
bun install
```

2. ブラウザをインストール:
```bash
bun run test:e2e:install
```

## テストの実行

### 基本的なテスト実行
```bash
# すべてのテストを実行
bun run test:e2e

# ヘッドレスモードでテストを実行（ブラウザを表示）
bun run test:e2e:headed

# UIモードでテストを実行（インタラクティブ）
bun run test:e2e:ui

# デバッグモードでテストを実行
bun run test:e2e:debug
```

### 特定のテストファイルを実行
```bash
# 特定のテストファイルを実行
bun run test:e2e tests/e2e/homepage.spec.ts

# 特定のテストを実行
bun run test:e2e --grep "should load the homepage"
```

## テストファイルの構造

- `tests/e2e/` - E2Eテストファイル
- `tests/e2e/example.spec.ts` - サンプルテスト
- `tests/e2e/homepage.spec.ts` - ホームページのテスト

## 設定

Playwrightの設定は `playwright.config.ts` で管理されています。

### 主な設定項目:
- **testDir**: テストファイルの場所 (`./tests/e2e`)
- **baseURL**: テスト対象のベースURL (`http://localhost:3000`)
- **projects**: テストを実行するブラウザ（Chrome、Firefox、Safari、モバイル）
- **webServer**: テスト実行前にローカルサーバーを起動

## テストの書き方

```typescript
import { test, expect } from '@playwright/test';

test('テストの説明', async ({ page }) => {
    // ページに移動
    await page.goto('/');
    
    // 要素の存在確認
    await expect(page.locator('h1')).toBeVisible();
    
    // クリック操作
    await page.click('button');
    
    // テキストの確認
    await expect(page.locator('.message')).toHaveText('成功しました');
});
```

## デバッグ

テストが失敗した場合、以下の方法でデバッグできます：

1. **デバッグモード**: `bun run test:e2e:debug`
2. **UIモード**: `bun run test:e2e:ui`
3. **ヘッドレスモード**: `bun run test:e2e:headed`
4. **トレース**: 失敗時に自動的にトレースが生成されます

## レポート

テスト実行後、以下のレポートが生成されます：
- HTMLレポート: `playwright-report/index.html`
- テスト結果: `test-results/`
