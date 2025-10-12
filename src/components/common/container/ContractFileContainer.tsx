import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContractFilePresentational from "../presentational/ContractFilePresentational";

export type ContractFileContainerProps = {
    isEdit: boolean;
};

const ContractFileContainer = ({ isEdit }: ContractFileContainerProps) => {
    return (
        <>
            <div className="flex items-center justify-end mt-6">
                {/* 詳細時は更新ボタン */}
                {isEdit ? (
                    <div className="flex justify-end">
                        <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            アップロード
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            スキップ
                        </Button>
                        <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            アップロード
                        </Button>
                    </div>
                )}
            </div>
            <Separator className="mt-4" />
            <div className="grid gap-3">
                <ContractFilePresentational />
            </div>
        </>
    );
};

export default ContractFileContainer;
