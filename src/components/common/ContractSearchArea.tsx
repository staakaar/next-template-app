"use client";

import { useState } from "react";
import { IconDownload, IconRefresh, IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface ContractSearchAreaProps {
    isOpen: boolean;
    onClose: () => void;
}

export type ContractSearchCondition = {
    keyword: string;
    // 契約情報
    contractCode: string;
    contractName: string;
    contractStatus: string;
    issuanceType: string;
    contractType: string;
    startDate: Date | null;
    endDate: Date | null;

    // 自社情報
    ownCompanyPersonInCharge: string;

    // 部署
    departmentId: string;
};

const ContractSearchArea = ({ isOpen, onClose }: ContractSearchAreaProps) => {
    // 検索タブ
    const [activeTab, setActiveTab] = useState("basic");

    // 検索条件
    const [searchParams, setSearchParams] = useState({
        keyword: "",
        contractCode: "",
        contractName: "",
        contractStatus: "",
        issuanceType: "",
        contractType: "",
        startDate: new Date(),
        endDate: new Date(),
        ownCompanyPersonInCharge: "",
        departmentId: "",
    } as ContractSearchCondition);

    // 検索条件の状態管理Zustand

    // 検索条件をリセット
    const handleReset = () => {};

    // 検索
    const handleSearch = () => {};

    // CSVエクスポート
    const handleExport = () => {};

    return (
        <div className="mb-2">
            <Collapsible open={isOpen}>
                <CollapsibleContent>
                    <Tabs defaultValue="basic">
                        <TabsList>
                            <TabsTrigger value="basic">基本情報</TabsTrigger>
                            <TabsTrigger value="ownCompany">
                                自社情報
                            </TabsTrigger>
                            <TabsTrigger value="department">
                                部署情報
                            </TabsTrigger>
                        </TabsList>

                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <TabsContent value="basic">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">
                                                キーワード
                                            </label>
                                            <Input
                                                placeholder="検索キーワードを入力"
                                                value={searchParams.keyword}
                                                onChange={(e) =>
                                                    setSearchParams({
                                                        ...searchParams,
                                                        keyword:
                                                            e.currentTarget
                                                                .value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">
                                                ステータス
                                            </label>
                                            <Select
                                                value={
                                                    searchParams.contractStatus
                                                }
                                                onValueChange={(value) =>
                                                    setSearchParams({
                                                        ...searchParams,
                                                        contractStatus:
                                                            value || "",
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="選択してください" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">
                                                        有効
                                                    </SelectItem>
                                                    <SelectItem value="inactive">
                                                        無効
                                                    </SelectItem>
                                                    <SelectItem value="pending">
                                                        保留中
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <DateRangePicker
                                                label="期間"
                                                placeholder="期間を選択"
                                                value={[
                                                    searchParams.startDate,
                                                    searchParams.endDate,
                                                ]}
                                                onChange={([start, end]) =>
                                                    setSearchParams({
                                                        ...searchParams,
                                                        startDate: start,
                                                        endDate: end,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">
                                                カテゴリ
                                            </label>
                                            <Select
                                                value={
                                                    searchParams.contractType
                                                }
                                                onValueChange={(value) =>
                                                    setSearchParams({
                                                        ...searchParams,
                                                        contractType:
                                                            value || "",
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="選択してください" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="category1">
                                                        カテゴリ1
                                                    </SelectItem>
                                                    <SelectItem value="category2">
                                                        カテゴリ2
                                                    </SelectItem>
                                                    <SelectItem value="category3">
                                                        カテゴリ3
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </TabsContent>
                                {/* ボタングループ */}
                                <div className="mt-4 flex flex-1 items-center justify-center gap-2">
                                    <Button
                                        variant="ghost"
                                        onClick={handleReset}
                                    >
                                        <IconRefresh size="1rem" />
                                        条件をリセット
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button onClick={handleSearch}>
                                            <IconSearch size="1rem" />
                                            検索
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleExport}
                                        >
                                            <IconDownload size="1rem" />
                                            CSVエクスポート
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default ContractSearchArea;
