"use client";
import { Box, Button, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { useParams } from "next/navigation";
import ContractAuthorityListContainer from "./ContractAuthorityListContainer";
import ContractAuthorityHierarchyContainer from "./contractAuthority/ContractAuthorityHierarchyContainer";

const ContractAuthorityContainer = () => {
    const { contractCode } = useParams();
    if (Array.isArray(contractCode) || !contractCode) return;

    return (
        <Tabs
            className="mt-6"
            autoContrast
            variant="pills"
            defaultValue="authorityList"
        >
            <TabsList>
                <TabsTab value="authorityList">権限一覧</TabsTab>
                <TabsTab value="addAuthority">権限追加</TabsTab>
            </TabsList>
            {/* 詳細時は更新ボタン */}
            <Box className="flex justify-end">
                <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </Box>
            <Box className="grid gap-3">
                <TabsPanel value="authorityList">
                    <ContractAuthorityListContainer
                        contractCode={contractCode}
                    />
                </TabsPanel>
                <TabsPanel value="addAuthority">
                    <ContractAuthorityHierarchyContainer />
                </TabsPanel>
            </Box>
        </Tabs>
    );
};

export default ContractAuthorityContainer;
