import { Button } from "@/components/atoms/Button/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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
        <Dialog
            open={isOpen}
            onOpenChange={(open: boolean) => (!open ? onClose() : null)}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>確認</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    入力した内容は保存されません。よろしいですか？
                </p>
                <DialogFooter>
                    <div className="flex w-full justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            キャンセル
                        </Button>
                        <Button onClick={onConfirm}>OK</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ContractNewConfirmDialog;
