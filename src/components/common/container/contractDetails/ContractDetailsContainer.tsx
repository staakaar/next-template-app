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
            {/* <Box> */}
            <Tabs
                className="mt-6"
                autoContrast
                variant="pills"
                defaultValue="list"
            >
                <TabsList>
                    <TabsTab value="list">一覧</TabsTab>
                    <TabsTab value="add">編集</TabsTab>
                    <TabsTab value="new">担当者追加</TabsTab>
                </TabsList>
                {/* 詳細時は更新ボタン */}
                <Box className="flex justify-end">
                    <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                        更新
                    </Button>
                </Box>
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
            {/* </Box> */}
            {/* タブ 明細一覧と追加を用意 追加はCarouselで複数保存可能にする */}
        </>
    );
};

export default ContractDetailsContainer;
