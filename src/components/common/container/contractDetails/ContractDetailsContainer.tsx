import {
    Box,
    Button,
    Divider,
    TabsList,
    TabsTab,
    Tabs,
    TabsPanel,
} from "@mantine/core";
import ContractDetailsPresentational from "../../presentational/contractDetails/ContractDetailsPresentational";
import { useFetchContractDetails } from "@/lib/contractDetails/api";

const ContractDetailsContainer = () => {
    /** 明細情報の取得 */
    const details = useFetchContractDetails();
    return (
        <>
            <Box>
                <Tabs defaultValue="list">
                    <Box className="flex items-center justify-between">
                        {/* <Title className="mt-4 mb-6">契約書明細</Title> */}
                        <Box className="flex items-center">
                            <TabsList className="inline-flex h-9 items-center justify-center p-1 text-muted-foreground">
                                <TabsTab value="list">一覧</TabsTab>
                                <TabsTab value="add">編集</TabsTab>
                                <TabsTab value="new">担当者追加</TabsTab>
                            </TabsList>
                        </Box>
                        {/* 詳細時は更新ボタン */}
                        <Button className="mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            更新
                        </Button>
                    </Box>
                    <Divider />
                    <Box className="grid gap-3">
                        <TabsPanel value="list">
                            <ContractDetailsPresentational
                                items={details.items}
                                initialTotalCount={details.totalCount}
                            />
                        </TabsPanel>
                        <TabsPanel value="add">
                            <Box>add</Box>
                        </TabsPanel>
                        <TabsPanel value="new">
                            <Box>new</Box>
                        </TabsPanel>
                    </Box>
                </Tabs>
            </Box>
            {/* タブ 明細一覧と追加を用意 追加はCarouselで複数保存可能にする */}
        </>
    );
};

export default ContractDetailsContainer;
