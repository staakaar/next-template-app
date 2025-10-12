"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import ContractAuthorityListContainer from "./ContractAuthorityListContainer";
import ContractAuthorityHierarchyContainer from "./contractAuthority/ContractAuthorityHierarchyContainer";

const ContractAuthorityContainer = () => {
    const { contractCode } = useParams();
    if (Array.isArray(contractCode) || !contractCode) return;

    return (
        <Tabs
            className="mt-6"
            defaultValue="authorityList"
        >
            <TabsList>
                <TabsTrigger value="authorityList">権限一覧</TabsTrigger>
                <TabsTrigger value="addAuthority">権限追加</TabsTrigger>
            </TabsList>
            {/* 詳細時は更新ボタン */}
            <div className="flex justify-end">
                <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </div>
            <div className="grid gap-3">
                <TabsContent value="authorityList">
                    <ContractAuthorityListContainer
                        contractCode={contractCode}
                    />
                </TabsContent>
                <TabsContent value="addAuthority">
                    <ContractAuthorityHierarchyContainer />
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default ContractAuthorityContainer;
