import { Card } from "@/components/ui/card";
import { useFetchTradePartner } from "@/lib/tradePartner/api";
import { useState } from "react";
import { columns } from "./TradePartnerTableColumn";
import TradePartnerCompanyTablePresentation from "../../presentational/tradePartner/TradePartnerCompanyTablePresentation";

const TradePartnerCompanyTableContainer = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const data = useFetchTradePartner(page, pageSize, searchKeyword);

    return (
        <>
            <Card className="flex w-full flex-col bg-muted/40 h-[800px]">
                <TradePartnerCompanyTablePresentation
                    data={data.tradePartner}
                    columns={columns}
                    totalCount={data.totalCount}
                />
            </Card>
        </>
    );
};

export default TradePartnerCompanyTableContainer;

// TradePartnerTableContainerコンポーネントの内容を表示
// 行クリックで担当者ドロワーを表示
// 選択後に保存する 保存前に戻るや他のセクションクリックした場合は警告モーダルを表示する
