"use client";

import { Box, Collapse, Paper, Stack } from "@mantine/core";
import { useState } from "react";

interface ContractSearchAreaProps {
    isOpen: boolean;
    onClose: () => void;
}

export type ContractSearchCondition = {};

const ContractSearchArea = ({ isOpen, onClose }: ContractSearchAreaProps) => {
    // 検索タブ
    const [activeTab, setActiveTab] = useState("");

    // 検索条件の状態管理Recoil

    // 検索条件をリセット
    const handleReset = () => {};

    // 検索
    const handleSearch = () => {};

    return (
        <Box mb="md">
            <Collapse in={isOpen}>
                <Paper p="md" withBorder>
                    <Stack></Stack>
                </Paper>
            </Collapse>
        </Box>
    );
};

export default ContractSearchArea;
