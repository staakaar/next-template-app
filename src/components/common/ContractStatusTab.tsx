import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { LuCheckSquare, LuFolder, LuUser } from "react-icons/lu";

const ContractStatusTab = () => {
    return (
        <Tabs
            px={1}
            key={"outline"}
            defaultValue="contractBasic"
            variant={"outline"}
        >
            <TabList>
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
            {/* <TabPanels></TabPanels> */}
        </Tabs>
    );
};

export default ContractStatusTab;
