import { postContractBasic } from "@/lib/contract/api";
import { ContractBasicForm } from "@/lib/contract/schema";
import { useToast } from "@chakra-ui/react";
import ContractBasicPresentationalForm from "./ContractBasicPresentationalForm";

const ContractBasicContainer = () => {
    // 保存データのフェッチ
    // ストアに格納
    // 子要素で抜き出してセット

    // 子要素でセットしたデータをserver actionsへ
    // 成功の場合成功トースター 失敗の場合は失敗のトースター
    // const onSubmit = async (data: ContractBasicForm) => {};

    return <ContractBasicPresentationalForm />;
};
export default ContractBasicContainer;
