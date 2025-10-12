import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const RelatedContractContainer = () => {
    return (
        <Tabs
            className="mt-6"
            defaultValue="parentContract"
        >
            <TabsList>
                <TabsTrigger value="parentContract">親契約</TabsTrigger>
                <TabsTrigger value="childContract">子契約</TabsTrigger>
            </TabsList>
            {/* 詳細時は更新ボタン */}
            <div className="flex justify-end">
                <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </div>
            <div className="grid gap-3">
                <TabsContent value="parentContract">
                    <div>parentContract</div>
                </TabsContent>
                <TabsContent value="childContract">
                    <div>childContract</div>
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default RelatedContractContainer;
