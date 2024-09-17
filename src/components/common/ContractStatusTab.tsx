import { Box, IconButton, Tab, TabList, Tabs } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LuCheckSquare, LuFolder, LuUser } from "react-icons/lu";

const contractStatusTab = [
    { label: "", content: "" },
    { label: "", content: "" },
    { label: "", content: "" },
    { label: "", content: "" },
];

const ContractStatusTab = () => {
    return (
        <Box
            minW={{ base: "100%" }}
            borderTop={"solid"}
            borderX={"solid"}
            borderColor={"gray.100"}
        >
            <Tabs
                mt={2}
                key={"outline"}
                defaultValue="contractBasic"
                variant={"outline"}
            >
                <Box className="flex justify-center">
                    <IconButton
                        aria-label={"button"}
                        icon={<ChevronLeft />}
                        bg={"white"}
                    />
                    <TabList
                        overflowX="auto"
                        whiteSpace="nowrap"
                        sx={{
                            "::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    >
                        <Tab value="contractBasic">
                            <LuUser />
                            contractBasic
                        </Tab>
                        <Tab value="tradePartner">
                            <LuFolder />
                            tradePartner
                        </Tab>
                        <Tab value="contractFile">
                            <LuCheckSquare />
                            contractFile
                        </Tab>
                        <Tab value="contractAuthority">
                            <LuCheckSquare />
                            contractAuthority
                        </Tab>
                        <Tab value="customField">
                            <LuCheckSquare />
                            customFiled
                        </Tab>
                        <Tab value="cloudsign">
                            <LuCheckSquare />
                            cloudsign
                        </Tab>
                        <Tab value="ownCompany">
                            <LuCheckSquare />
                            ownCompany
                        </Tab>
                        <Tab value="draft">
                            <LuCheckSquare />
                            draft
                        </Tab>
                        <Tab value="relatedContract">
                            <LuCheckSquare />
                            relatedContract
                        </Tab>
                        <Tab value="history">
                            <LuCheckSquare />
                            history
                        </Tab>
                    </TabList>
                    <IconButton
                        aria-label={"button"}
                        icon={<ChevronRight />}
                        bg={"white"}
                    />
                </Box>
                {/* <TabPanels></TabPanels> */}
            </Tabs>
        </Box>
    );
};

export default ContractStatusTab;
