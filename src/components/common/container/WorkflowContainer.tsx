import { Box, Button, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";

const WorkflowContainer = () => {
    return (
        <Tabs
            className="mt-6"
            autoContrast
            variant="pills"
            defaultValue="approvalFlow"
        >
            <TabsList>
                <TabsTab value="approvalFlow">承認状況</TabsTab>
                <TabsTab value="workflowSetting">WF設定</TabsTab>
            </TabsList>
            {/* 詳細時は更新ボタン */}
            <Box className="flex justify-end">
                <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </Box>
            <Box className="grid gap-3">
                <TabsPanel value="approvalFlow">
                    <Box>approvalFlow</Box>
                </TabsPanel>
                <TabsPanel value="workflowSetting">
                    <Box>workflowSetting</Box>
                </TabsPanel>
            </Box>
        </Tabs>
    );
};

export default WorkflowContainer;
