import React from "react";
import { Modal, Text, Button, Group, Stack } from "@mantine/core";

interface ContractNewConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ContractNewConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
}: ContractNewConfirmDialogProps) => {
    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title="確認"
            size="sm"
            centered
        >
            <Stack gap="md">
                <Text>入力した内容は保存されません。よろしいですか？</Text>
                <Group justify="flex-end" gap="sm">
                    <Button variant="outline" onClick={onClose}>
                        キャンセル
                    </Button>
                    <Button onClick={onConfirm}>OK</Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ContractNewConfirmDialog;
