# フロントエンドテスト

## APIテスト

```typescript
test("テスト内容を記載", () => {
    const mockFn = jest.fn();
    // モック関数呼び出し
    mockFn();

    // 呼び出されているか
    expect(mockFn).toBeCalled();
    // 呼び出されていないか
    expect(mockFn).not.toBeCalled();
    // 呼び出し回数テスト
    expect(mockFn).toHaveBeenCalledTimes();
    // 呼び出し回数
    expect(mockFn).toHaveBeenCalledWith();
    // オブジェクトの引数を検証
    expect(mockFn).toHaveBeenCalledWith({
        //オブジェクト記載
    });
    // オブジェクトの引数を検証
    expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({
            //オブジェクト記載
        })
    );
});

```

### APIモックの作成

1. fetcher or API定義のファイルをインポート
2. APIのモックを作成

```typescript
function mockAPI(input: TestInput, status = 200) {
    if (status > 299) {
        return jest.spyOn(APIファイル名を指定, "APIファイルの中のAPI関数を指定する")
    }
    try {
        return jest.spyOn(APIファイル名を指定, "APIファイルの中のAPI関数を指定する").mockResolvedValue();
    }
    catch(err) {
        return jest.spyOn(APIファイル名を指定, "APIファイルの中のAPI関数を指定する").mockRejectedValueOnce(httpError);
    }
}

```

### APIテストデータ
#### APIファクトリー関数

```typescript
function testFactory(input?: Partial<Test>): TestInput {
    return {
        name: 'test',
        age: 23,
        ...input,
    };
}
```
#### セットアップ関数

```typescript
describe("テストの結果", () => {
    beforeAll(() => {
        // テスト実行前に実行したい内容を記載
    });
    beforeEach(() => {
        // テスト実行前に実行したい内容を記載
    });
    afterAll(() => {
        // テスト実行後に実行したい内容を記載
    });
    afterEach(() => {
        // テスト実行後に実行したい内容を記載
    });
})
```
#### テスト環境の切り替え

- 以下の記述をテストファイルごとに設定する

```typescript
/** 
    @jest-environment jest-environment-jsdom
 */
```

## UIコンポーネントテスト

### 要素テスト

```typescript
import { render } from "@testing-library/react";

test("テスト名の記載", () => {
    // コンポーネントの読み込み
    render(<Form />);
    // 特定のDOM要素の取得
    console.log(screen.getByText("要素を指定"))
    // アサーション
    expect(screen.getByText("要素を指定")).toBeInTheDocument();

    // 見出し要素を取得 期待しているテキストが存在するかチェック
    expect(scrren.getByText("要素を指定")).toHaveTextContent("アカウント情報");
});
```

### イベントテスト

```typescript
import { fireEvent, render, screen } from "@testing-library/react";

test("テストを記載", () => {
    const mockFn = jest.fn();
    render(<Form onSubmit={mockFn} />);
    fireEvent.click(screen.getByRole());
    expect(mockFn).toHaveBeenCalled();
});
```
### 配列の要素数を検証

- 一覧取得などでmapなどを使用しているケースに利用

```typescript
test("テスト名記載", () => {
    render(<TestItem />);
    expect(screen.getAllByTest()).toHaveLength(3);
    expect().toBeInTheDocument();
});

// コンポーネントが大きく同じ要素がコンポーネント内に複数存在する場合、テスト対象の要素を特定するために設定
import { render, screen, within } from "@testing-library/react";

test("テスト名を記載", () => {
    render(<TestList items={items} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(within(list).getAllByTest("テスト対象の要素を取得")).toHaveLength(4);
});

// 一覧取得に失敗したパターン
test("一覧取得失敗パターン", () => {
    render(<TestItem />);
    const list = screen.queryByTest("list");
    expect(list).not.toBeInTheDocument();
    expect(list).toBeNul();
    expect(screen.getByText()).toBeInTheDocument();
})

// 属性を取得したいパターン
test("属性のテスト", () => {
    render(<TestItem />);
    expect(screen.getByRole("link", {})).toHaveAttribute("href", "test/:id");
});
```

