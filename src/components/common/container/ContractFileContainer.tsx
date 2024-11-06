import { Box, Title, Button, Divider } from "@mantine/core";
import ContractFilePresentational from "../presentational/ContractFilePresentational";

export type ContractFileContainerProps = {
    isEdit: boolean;
};

const ContractFileContainer = ({ isEdit }: ContractFileContainerProps) => {
    return (
        <Box>
            <Box className="flex items-center justify-between">
                <Title className="mt-4 mb-6">契約書ファイル</Title>
                {/* 詳細時は更新ボタン */}
                {isEdit ? (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                        アップロード
                    </Button>
                ) : (
                    <>
                        <Box>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                スキップ
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                アップロード
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
            <Divider className="mt-4" />
            <Box className="grid gap-3">
                <ContractFilePresentational />
            </Box>
        </Box>
    );
};

export default ContractFileContainer;
