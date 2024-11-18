"use client";
import { redirect } from "next/navigation";

const ContractDetailDefault = ({
    params,
}: {
    params: { contractCode: string };
}) => {
    redirect(`/contract/${params.contractCode}/contractBasic`);
    // const params = useParams();
    // const contractCode = params.contractCode;
    // console.log(contractCode);

    // if (!contractCode || Array.isArray(contractCode)) {
    //     redirect("/contract-all");
    // }

    // const setSelectedContractCode = useSetRecoilState(
    //     selectedContractCodeState
    // );

    // console.log("contractDetailContainer", contractCode);

    // // 権限チェック

    // useEffect(() => {
    //     setSelectedContractCode(contractCode);
    // }, [contractCode, setSelectedContractCode]);

    // return <></>;
};

export default ContractDetailDefault;
