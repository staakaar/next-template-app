"use client";
import { TradePartner } from "@/types/api/tradePartner";
import { sort } from "fast-sort";
import {
    DataTableRowClickHandler,
    DataTableSortStatus,
} from "mantine-datatable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export type TradePartnerTableProps<T extends TradePartner> = {
    data: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerTablePresentation = <T extends TradePartner>({
    data,
    initialTotalCount,
}: TradePartnerTableProps<T>) => {
    const router = useRouter();

    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<TradePartner>
    >({
        columnAccessor: "contractCode",
        direction: "asc",
    });

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<TradePartner[]>(
        data.slice(0, pageSize)
    );

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(data.slice(from, to));
    }, [data, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(DataTransfer).by([
            { asc: (c) => c.contractCode },
        ]) as TradePartner[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [data, sortStatus]);

    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = useSetRecoilState("");

    const navigateToContractDetail: DataTableRowClickHandler<TradePartner> = ({
        record,
    }) => {
        router.push(`/contract/${record.tradeCompanyId}`);
    };

    return <></>;
};

export default TradePartnerTablePresentation;
