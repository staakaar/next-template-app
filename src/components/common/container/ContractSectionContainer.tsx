import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const ContractSectionContainer = () => {
    /** セクション情報の取得 */
    return (
        <>
            <Tabs
                className="mt-6"
                defaultValue="link"
            >
                <TabsList>
                    <TabsTrigger value="link">連携</TabsTrigger>
                    <TabsTrigger value="section">セクション</TabsTrigger>
                </TabsList>
                {/* 詳細時は更新ボタン */}
                <div className="flex justify-end">
                    <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                        更新
                    </Button>
                </div>
                <div className="grid gap-3">
                    <TabsContent value="link">
                        <div>link</div>
                    </TabsContent>
                    <TabsContent value="section">
                        <div>section</div>
                    </TabsContent>
                </div>
            </Tabs>
            {/* タブ 明細一覧と追加を用意 追加はCarouselで複数保存可能にする */}
        </>
    );
};

export default ContractSectionContainer;
