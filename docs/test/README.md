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
