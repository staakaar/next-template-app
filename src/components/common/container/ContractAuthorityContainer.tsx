import { Box, Button, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";

const ContractAuthorityContainer = () => {
    return (
        <Tabs
            className="mt-6"
            autoContrast
            variant="pills"
            defaultValue="authorityList"
        >
            <TabsList>
                <TabsTab value="authorityList">権限一覧</TabsTab>
                <TabsTab value="userAuthority">ユーザー権限</TabsTab>
                <TabsTab value="departmentAuthority">部署権限</TabsTab>
                <TabsTab value="companyAuthority">会社権限</TabsTab>
            </TabsList>
            {/* 詳細時は更新ボタン */}
            <Box className="flex justify-end">
                <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </Box>
            <Box className="grid gap-3">
                <TabsPanel value="authorityList">
                    <Box>authorityList</Box>
                </TabsPanel>
                <TabsPanel value="userAuthority">
                    <Box>userAuthority</Box>
                </TabsPanel>
                <TabsPanel value="departmentAuthority">
                    <Box>departmentAuthority</Box>
                </TabsPanel>
                <TabsPanel value="companyAuthority">
                    <Box>companyAuthority</Box>
                </TabsPanel>
            </Box>
        </Tabs>
    );
};

export default ContractAuthorityContainer;
