import ContractMenu from "@/components/common/ContractMenu";
import ContractStatusTab from "@/components/common/ContractStatusTab";
import ContractSearchMenu from "@/components/common/ContractSearchMenu";
import ContractListTableContainer from "./_components/ContractListTableContainer";
import Header from "@/components/organisms/Header";
import { Box, Container } from "@chakra-ui/react";

const ContractList = () => {
    return (
        <>
            <Header />
            {/* タブで管理メニューと設定メニューを表示 */}
            <Container maxW="container.lg">
                {/* <Box bg="gray.100"> */}
                <ContractMenu />
                {/* </Box> */}
            </Container>
            {/* 検索窓の表示・検索項目のドロップダウン・新規追加ボタン // */}
            <ContractSearchMenu />
            {/* ContractListTableContainer ContractListTablePresentationalを作成 */}
            <ContractListTableContainer />
        </>
    );
};
export default ContractList;
