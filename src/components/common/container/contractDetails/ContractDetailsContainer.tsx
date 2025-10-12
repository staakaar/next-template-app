import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ContractDetailsPresentational from "../../presentational/contractDetails/ContractDetailsPresentational";
import { useFetchContractDetails } from "@/lib/contractDetails/api";

const ContractDetailsContainer = () => {
    /** 明細情報の取得 */
    const details = useFetchContractDetails();
    return (
        <>
            <Tabs
                className="mt-6"
                defaultValue="list"
            >
                <TabsList>
                    <TabsTrigger value="list">一覧</TabsTrigger>
                    <TabsTrigger value="add">編集</TabsTrigger>
                    <TabsTrigger value="new">担当者追加</TabsTrigger>
                </TabsList>
                {/* 詳細時は更新ボタン */}
                <div className="flex justify-end">
                    <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                        更新
                    </Button>
                </div>
                <div className="grid gap-3">
                    <TabsContent value="list">
                        <ContractDetailsPresentational
                            items={details.items}
                            initialTotalCount={details.totalCount}
                        />
                    </TabsContent>
                    <TabsContent value="add">
                        <div>add</div>
                    </TabsContent>
                    <TabsContent value="new">
                        <div>new</div>
                    </TabsContent>
                </div>
            </Tabs>
            {/* タブ 明細一覧と追加を用意 追加はCarouselで複数保存可能にする */}
        </>
    );
};

export default ContractDetailsContainer;
