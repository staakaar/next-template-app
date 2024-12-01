"use client";

import { useState } from "react";
import { Company } from "../../container/tradePartner/TradingPartnerCompanyNestedContainer";
import { DataTable } from "mantine-datatable";
import CompanyDepartmentTable from "./CompanyDepartmentTable";

type TradingCompany = Company;

type TradingPartnerCompanyNestedProps<T extends TradingCompany> = {
    tradingCompanies: T[];
    initialCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradingPartnerCompanyNestedPresentation = <T extends TradingCompany>({
    tradingCompanies,
    initialCount,
}: TradingPartnerCompanyNestedProps<T>) => {
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

    return (
        <DataTable
          withTableBorder
          withColumnBorders
          highlightOnHover
          columns={[
            {
              accessor: 'name',
              title: 'Company / Department / Employee',
              noWrap: true,
              render: ({ id, name}) => (),
            },
            {
              accessor: 'users',
              title: "Users / Birth date",
              textAlign: 'right',
              width: 200
            },
          ]}
          records={tradingCompanies}
          rowExpansion={{
            allowMultiple: true,
            expanded: { recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds },
            content: ({ record }) => <TradingDepartmentTable companyId={record.id} />,
          }}
        />
    );
};

export default TradingPartnerCompanyNestedPresentation;
