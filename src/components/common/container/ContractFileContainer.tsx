import { Box, Title, Button, Divider } from "@mantine/core";
import ContractFilePresentational from "../presentational/ContractFilePresentational";

export type ContractFileContainerProps = {
    isEdit: boolean;
};

const ContractFileContainer = ({ isEdit }: ContractFileContainerProps) => {
    return (
        // <Box>
        <>
            <Box className="flex items-center justify-end mt-6">
                {/* 詳細時は更新ボタン */}
                {isEdit ? (
                    <Box className="flex justify-end">
                        <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            アップロード
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            スキップ
                        </Button>
                        <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            アップロード
                        </Button>
                    </Box>
                )}
            </Box>
            <Divider className="mt-4" />
            <Box className="grid gap-3">
                <ContractFilePresentational />
            </Box>
        </>
        // </Box>
    );
};

export default ContractFileContainer;
