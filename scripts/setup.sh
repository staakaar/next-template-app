#!/bin/bash

# 引数一覧

# 出力カラーの設定
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Bunインストール
install_bun() {
    echo -e "${BLUE}Installing Bun...${NC}"
    if ! command -v bun &> /dev/null; then
        echo -e "${GREEN}Bun is installed."
    else
        curl -fsSL https://bun.sh/install | bash
    fi
    
}


# 依存関係のインストール
install_dependencies() {
    echo -e "${BLUE}Installing dependencies...${NC}"
    bun install
}

# サーバー起動
start_server() {
    echo -e "${BLUE}Starting server...${NC}"
    bun run dev
}

# クリーンアップ

# メイン処理

main() {
    install_bun
    install_dependencies
    start_server
}