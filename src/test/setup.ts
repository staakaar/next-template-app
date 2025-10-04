// jsdomにはFetch APIが用意されていないためテスト失敗するのでpolyfillであるwhatwg-fetchをインストール
import "whatwg-fetch";
import "@testing-library/jest-dom";
import React from "react";

global.React = React;
