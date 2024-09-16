import {
    SimpleGrid,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import ContractStatusStepper from "@/components/common/ContractStatusStepper";

const ContractDetails = () => {
    return (
        /** ぱんクズリスト */
        <>
            {/* ぱんクズリスト */}
            <Stack>
                <Breadcrumb
                    spacing="8px"
                    separator={
                        <ChevronRightIcon color="gray.500"></ChevronRightIcon>
                    }
                    size="lg"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">契約書一覧へ</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Stack>
            {/* ステータスバー */}
            <Stack gap="10" width="full">
                <ContractStatusStepper />
            </Stack>
            {/* タブ */}
            <SimpleGrid columns={2} gap="14" width="full"></SimpleGrid>
        </>
    );
};

export default ContractDetails;
