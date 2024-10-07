"use client";
import { uploadFilesState } from "@/stores/contractFile/atom";
import {
    Box,
    Button,
    HStack,
    IconButton,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useRecoilState } from "recoil";
import { TrashIcon } from "lucide-react";

interface UploadFile {
    file: File;
    preview: string;
}

const ContractFilePresentational = () => {
    const [uploadFiles, setUploadFiles] =
        useRecoilState<UploadFile[]>(uploadFilesState);
    const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
        null
    );
    // プラグイン初期化
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setUploadFiles((prev) => [...prev, ...newFiles]);
        },
    });

    const removeFile = (index: number) => {
        setUploadFiles((v) => v.filter((_, i) => i !== index));
        if (selectedFileIndex === index) {
            setSelectedFileIndex(null);
        }
    };

    return (
        <Box>
            <Box
                {...getRootProps()}
                border="2px dashed"
                borderColor="gray.300"
                p={4}
                rounded="md"
                textAlign="center"
                cursor="pointer"
            >
                <input {...getInputProps()} />
                <Text fontSize="lg" mb={2}>
                    ファイルをドラッグ＆ドロップするか、クリックして選択してください
                </Text>
                <Button>フィアルを選択</Button>
            </Box>

            <VStack mt={4} align="stretch">
                {uploadFiles.map((file, index) => (
                    <HStack
                        key={index}
                        p={2}
                        bg="gray.100"
                        rounded="md"
                        justifyContent="space-between"
                    >
                        <Text
                            onClick={() => setSelectedFileIndex(index)}
                            cursor="pointer"
                        >
                            {file.file.name} -{" "}
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </Text>
                        <IconButton
                            aria-label="Delte file"
                            icon={<TrashIcon />}
                            onClick={() => removeFile(index)}
                            size="sm"
                        />
                    </HStack>
                ))}
            </VStack>

            {selectedFileIndex !== null && (
                <Box>
                    <Worker workerUrl="">
                        <Viewer
                            fileUrl={uploadFiles[selectedFileIndex].preview}
                            plugins={[defaultLayoutPluginInstance]}
                        ></Viewer>
                    </Worker>
                </Box>
            )}
        </Box>
    );
};

export default ContractFilePresentational;
