import { Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";

const BusinessFormPresentation = () => {
    return (
        <>
            <Tabs orientation="horizontal" defaultValue="list">
                <TabsList>
                    <TabsTab value="businessFormContract">契約情報</TabsTab>
                    <TabsTab value="businessFormPartner">取引先</TabsTab>
                    <TabsTab value="businessFormSetting">設定画面</TabsTab>
                    <TabsTab value="businessForm">出力ファイル</TabsTab>
                </TabsList>
                <TabsPanel value="businessFormContract">
                    <div>契約情報</div>
                </TabsPanel>
                <TabsPanel value="businessFormPartner">
                    <div>取引先</div>
                </TabsPanel>
                <TabsPanel value="businessFormSetting">
                    <div>設定画面</div>
                </TabsPanel>
                <TabsPanel value="businessForm">
                    <div>出力ファイル</div>
                </TabsPanel>
            </Tabs>
        </>
    );
};

export default BusinessFormPresentation;
