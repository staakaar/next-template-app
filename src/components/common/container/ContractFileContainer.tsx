import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ContractFileContainer = () => {
    return (
        <>
            <div className="grid gap-3">
                <Label htmlFor="model">契約書ファイル</Label>
                {/* TODO: 削除ボタンと見出し作成 */}
                <Select>
                    <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                    >
                        <SelectValue placeholder="ファイルを選択" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* ファイル数分マップ コンポーネント分割 */}
                        <SelectItem value="genesis">
                            <div className="flex items-start gap-3 text-muted-foreground">
                                <div className="grid gap-0.5">
                                    <p>ファイル名</p>
                                </div>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default ContractFileContainer;
