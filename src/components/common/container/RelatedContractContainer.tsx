import { Box, Button, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";

const RelatedContractContainer = () => {
    return (
        <Tabs
            className="mt-6"
            autoContrast
            variant="pills"
            defaultValue="parentContract"
        >
            <TabsList>
                <TabsTab value="parentContract">親契約</TabsTab>
                <TabsTab value="childContract">子契約</TabsTab>
            </TabsList>
            {/* 詳細時は更新ボタン */}
            <Box className="flex justify-end">
                <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </Box>
            <Box className="grid gap-3">
                <TabsPanel value="parentContract">
                    <Box>parentContract</Box>
                </TabsPanel>
                <TabsPanel value="childContract">
                    <Box>childContract</Box>
                </TabsPanel>
            </Box>
        </Tabs>
    );
};

export default RelatedContractContainer;
