import {
    Box,
    Button,
    Divider,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
} from "@mantine/core";

const ContractSectionContainer = () => {
    /** セクション情報の取得 */
    return (
        <>
            {/* <Box> */}
            <Tabs
                className="mt-6"
                autoContrast
                variant="pills"
                defaultValue="link"
            >
                <TabsList>
                    <TabsTab value="link">連携</TabsTab>
                    <TabsTab value="section">セクション</TabsTab>
                </TabsList>
                {/* 詳細時は更新ボタン */}
                <Box className="flex justify-end">
                    <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                        更新
                    </Button>
                </Box>
                <Box className="grid gap-3">
                    <TabsPanel value="link">
                        <Box>link</Box>
                    </TabsPanel>
                    <TabsPanel value="section">
                        <Box>section</Box>
                    </TabsPanel>
                </Box>
            </Tabs>
            {/* </Box> */}
            {/* タブ 明細一覧と追加を用意 追加はCarouselで複数保存可能にする */}
        </>
    );
};

export default ContractSectionContainer;
