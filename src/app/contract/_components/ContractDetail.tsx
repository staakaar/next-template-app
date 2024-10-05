"use client";
import ContractDetailMenuLayout from "@/components/common/ContractDetailMenuLayout";
import ContractStatusStepper from "@/components/common/ContractStatusStepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { contractListState } from "@/stores/contracts/atom";
import { Badge, Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRecoilValue } from "recoil";

export type ContractDetailProps = {
    contractCode: string;
};

const ContractDetail = ({ contractCode }: ContractDetailProps) => {
    const contracts = useRecoilValue(contractListState);
    const contract = contracts.contracts.find(
        (c) => (c.contractCode = contractCode)
    );
    console.log(contracts.contracts);
    console.log(contract);
    if (!contract) return;

    return (
        <Card className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Box className="text-sm font-medium">
                        <Link href={"/contract-all"}>一覧へ戻る</Link>
                    </Box>
                    <ContractStatusStepper />
                    <Box className="flex items-center justify-between space-y-2 px-8">
                        <Heading className="text-md font-bold">
                            詳細画面
                            {/* 契約書コード、案件名、発行分類・種別ステータスはバッジで表示する */}
                            <Badge colorScheme="green">
                                {contract.contractCode}
                            </Badge>
                            <Badge colorScheme="green">
                                {contract.contractName}
                            </Badge>
                            <Badge colorScheme="green">
                                {contract.contractStatus}
                            </Badge>
                        </Heading>
                        <Box className="flex items-center space-x-2">
                            {/* 基本情報を保存した瞬間に非表示 */}
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                キャンセル
                            </Button>
                            {/* 基本情報とファイルの登録をしている場合は表示 */}
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                アプローチ
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                出力
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                コピー
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                WF
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                発行
                            </Button>
                        </Box>
                    </Box>
                    <Separator style={{ maxHeight: "calc(100vh - 300px)" }} />
                    <Box
                        className="overflow-auto"
                        style={{ maxHeight: "calc(100vh - 200px)" }}
                    >
                        <ContractDetailMenuLayout />
                    </Box>
                </main>
            </div>
        </Card>
    );
};

export default ContractDetail;
