"use client";
import "@mantine/dropzone/styles.css";
import { uploadFilesState } from "@/stores/contractFile/atom";
import { Box, Text, Button, ActionIcon, Group, Stack } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
    Dropzone,
    DropzoneAccept,
    DropzoneProps,
    DropzoneReject,
    IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useDropzone } from "react-dropzone";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { TrashIcon } from "lucide-react";

interface UploadFile {
    file: File;
    preview: string;
}

const ContractFilePresentational = () => {
    const openRef = useRef<() => void>(null);
    const [uploadFiles, setUploadFiles] =
        useRecoilState<Array<UploadFile>>(uploadFilesState);
    const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
        null
    );
    // プラグイン初期化
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));

            setUploadFiles((prev) => [...prev, ...newFiles]);
        },
        [setUploadFiles]
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpg", ".jpeg"],
        },
        onDrop: onDrop,
    });

    const removeFile = useCallback(
        (index: number) => {
            setUploadFiles((v) => v.filter((_, i) => i !== index));
            if (selectedFileIndex === index) {
                setSelectedFileIndex(null);
            }
        },
        [selectedFileIndex, setUploadFiles]
    );

    // クリーンアップ関数
    useEffect(() => {
        return () => {
            // ファイルのプレビューURLを解放
            uploadFiles.forEach((file) => {
                URL.revokeObjectURL(file.preview);
            });
        };
    }, [uploadFiles]);

    const handleFileSelect = useCallback((index: number) => {
        setSelectedFileIndex(index);
    }, []);

    return (
        <Box>
            {/* <Box
                {...getRootProps()}
                className="border-dashed border-gray-200 bg-gray-100 p-4 rounded-md text-center cursor-pointer"
            >
                <input {...getInputProps()} />
                <Text mb={2}>
                    ファイルをドラッグ＆ドロップするか、クリックして選択してください
                </Text>
                <Button>ファイルを選択</Button>
            </Box> */}
            <Dropzone
                loading
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...props}
            >
                <Group
                    justify="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: "none" }}
                >
                    <DropzoneAccept>
                        <IconUpload
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-blue-6)",
                            }}
                            stroke={1.5}
                        />
                    </DropzoneAccept>
                    <DropzoneReject>
                        <IconX
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-red-6)",
                            }}
                            stroke={1.5}
                        />
                    </DropzoneReject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-dimmed)",
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            ファイルをドラッグ＆ドロップするか、クリックして選択してください
                        </Text>
                        <Group justify="center" mt="md">
                            <Button onClick={() => openRef.current?.()}>
                                Select files
                            </Button>
                        </Group>
                    </div>
                </Group>
            </Dropzone>

            <Stack mt={4} align="stretch">
                {uploadFiles.map((file, index) => (
                    <Group
                        key={file.file.name + index}
                        p={2}
                        bg="gray.100"
                        className="justify-between"
                    >
                        <Text
                            onClick={() => handleFileSelect}
                            className="cursor-pointer"
                        >
                            {file.file.name} -{" "}
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </Text>
                        <ActionIcon
                            aria-label="Delete file"
                            onClick={() => removeFile(index)}
                            size="sm"
                            color="red"
                            variant="subtle"
                        >
                            <TrashIcon size="1rem" />
                        </ActionIcon>
                    </Group>
                ))}
            </Stack>

            {selectedFileIndex !== null && (
                <Box>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
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
