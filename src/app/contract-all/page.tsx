import ContractMenu from "@/components/common/ContractMenu";
import ContractSearchMenu from "@/components/common/ContractSearchMenu";
import ContractListTableContainer from "./_components/ContractListTableContainer";
import Header from "@/components/organisms/Header";
import { Container } from "@chakra-ui/react";

const ContractList = () => {
    return (
        <>
            <Header />
            {/* タブで管理メニューと設定メニューを表示 */}

            {/* <Box bg="gray.100"> */}
            {/* <ContractMenu /> */}
            {/* </Box> */}
            <Container maxW={{ base: "90vw" }} mt={16}>
                {/* 検索窓の表示・検索項目のドロップダウン・新規追加ボタン // */}
                <ContractSearchMenu />
                {/* ContractListTableContainer ContractListTablePresentationalを作成 */}
                <ContractListTableContainer />
            </Container>
        </>
    );
};
export default ContractList;
