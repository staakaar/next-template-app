import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BusinessFormPresentation = () => {
    return (
        <>
            <Tabs className="mt-6" defaultValue="businessFormContract">
                <TabsList>
                    <TabsTrigger value="businessFormContract">契約情報</TabsTrigger>
                    <TabsTrigger value="businessFormPartner">取引先</TabsTrigger>
                    <TabsTrigger value="businessFormSetting">設定画面</TabsTrigger>
                    <TabsTrigger value="businessForm">出力ファイル</TabsTrigger>
                </TabsList>
                <TabsContent value="businessFormContract">
                    <div>契約情報</div>
                </TabsContent>
                <TabsContent value="businessFormPartner">
                    <div>取引先</div>
                </TabsContent>
                <TabsContent value="businessFormSetting">
                    <div>設定画面</div>
                </TabsContent>
                <TabsContent value="businessForm">
                    <div>出力ファイル</div>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default BusinessFormPresentation;
