import Loading from "@/components/common/atoms/Loading";
import OwnCompanyContainer from "@/components/common/container/OwnCompanyContainer";
import useOwnCompanyStore from "@/stores/ownCompany/OwnCompanyStore";
import { Suspense } from "react";

const OwnCompanyTab = () => {
    // const { ownCompany } = useOwnCompanyStore();

    return (
        <Suspense fallback={<Loading />}>
            <OwnCompanyContainer isEdit={true} />
        </Suspense>
    );
};

export default OwnCompanyTab;
