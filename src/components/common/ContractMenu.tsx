/** トップページのメニュー共通レイアウト 各ページのlayout.tsxに配置 */
"use client";
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    useBreakpointValue,
    Grid,
    Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // App Routerのルーター

const ContractMenu = () => {
    const router = useRouter();
    const isMobile = useBreakpointValue({ base: true, md: false });
    console.log(isMobile);

    const navigateToPage = (index: number) => {
        if (index === 0) return router.push("/contract-all");
        else if (index === 1) return router.push("/connected-contract");
        else if (index === 2) return router.push("/contract-independent");
        else if (index === 3) return router.push("/contract-issued");
        else if (index === 4) return router.push("/contract-received");
        else if (index === 5) return router.push("/draft-contract");
        else if (index === 6) return router.push("/ai");
        else if (index === 7) return router.push("/workflow-all");
        else if (index === 8) return router.push("/default-settings");
        else if (index === 9) return router.push("/section-templates");
        else if (index === 10) return router.push("/user-settings");
        else if (index === 11) return router.push("/company-settings");
    };

    return (
        <Tabs
            size="sm"
            borderBottom={"hidden"}
            borderColor={"white"}
            mt={8}
            onChange={navigateToPage}
            minWidth={isMobile ? "100%" : "1000px"}
        >
            <TabList>
                <Box
                    overflowX="auto"
                    overflowY="hidden"
                    // sx={{
                    //     "::-webkit-scrollbar": {
                    //         display: "none",
                    //     },
                    // }}
                >
                    <Grid
                        templateColumns={isMobile ? "1fr" : "repeat(8, 1fr)"}
                        gap={2}
                        minWidth={isMobile ? "100%" : "1000px"}
                    >
                        <Tab minW={{ base: "150px" }}>管理</Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            契約書一覧
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            連携契約書
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            日連携契約書
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            契約書 受領側
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            ドラフト契約書
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            AI
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            WF
                        </Tab>

                        <Tab minW={{ base: "200px" }}>設定</Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            デフォルト設定
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            セクション/カスタム管理
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            会社設定
                        </Tab>
                        <Tab px={2} minW={{ base: "200px" }}>
                            個人設定
                        </Tab>
                    </Grid>
                </Box>
            </TabList>
            <TabPanels>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ContractMenu;
