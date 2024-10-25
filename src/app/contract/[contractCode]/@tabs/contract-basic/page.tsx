import ContractBasicContainer from "@/components/common/container/ContractBasicContainer";
import { selectedContractCodeState } from "@/stores/contracts/atom";
import { useRecoilValue } from "recoil";

const ContractBasicTab = () => {
    const setSelectedContractCode = useRecoilValue(selectedContractCodeState);
    return (
        <ContractBasicContainer
            isEdit={true}
            contractCode={setSelectedContractCode}
        />
    );
};

export default ContractBasicTab;
