import Loading from "@/components/common/atoms/Loading";
import BusinessFormContainer from "@/components/common/container/businessForm/BusinessFormContainer";
import { Suspense } from "react";

const BusinessFormTab = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BusinessFormContainer />
        </Suspense>
    );
};

export default BusinessFormTab;
