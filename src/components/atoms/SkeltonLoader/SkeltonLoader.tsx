import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    className?: string;
};

const SkeltonLoader: React.FC<Props> = ({ className }) => {
    return <Skeleton className={className} />;
};

export default SkeltonLoader;
