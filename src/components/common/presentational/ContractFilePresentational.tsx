"use client";
import "@mantine/dropzone/styles.css";
import { uploadFilesState } from "@/stores/contractFile/atom";
import {
    Box,
    Text,
    Button,
    ActionIcon,
    Group,
    Stack,
    Progress,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
    Dropzone,
    DropzoneAccept,
    DropzoneIdle,
    DropzoneProps,
    DropzoneReject,
    FileWithPath,
    IMAGE_MIME_TYPE,
    MS_EXCEL_MIME_TYPE,
    MS_POWERPOINT_MIME_TYPE,
    MS_WORD_MIME_TYPE,
    PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { TrashIcon } from "lucide-react";

interface UploadFile extends FileWithPath {
    id: string;
    progress: number;
    status: "uploading" | "done" | "error";
    file: File;
    preview: string;
}

const ContractFilePresentational = (props: Partial<DropzoneProps>) => {
    const openRef = useRef<() => void>(null);
    const [uploadFiles, setUploadFiles] =
        useRecoilState<Array<UploadFile>>(uploadFilesState);
    const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
        null
    );
    // プラグイン初期化
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    /** ファイルのアップロード */
    /** ファイルのドロップ */
    /** ファイルの削除 */
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

    const MIME_TYPE = [
        ...IMAGE_MIME_TYPE,
        ...PDF_MIME_TYPE,
        ...MS_WORD_MIME_TYPE,
        ...MS_EXCEL_MIME_TYPE,
        ...MS_POWERPOINT_MIME_TYPE,
    ];

    return (
        <Box>
            <Dropzone
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={MIME_TYPE}
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
                            className="w-[52px] h-[52px] text-gray-400 dark:text-gray-500"
                            stroke={1.5}
                        />
                    </DropzoneAccept>
                    <DropzoneReject>
                        <IconX
                            className="w-[52px] h-[52px] text-gray-400 dark:text-gray-500"
                            stroke={1.5}
                        />
                    </DropzoneReject>
                    <DropzoneIdle>
                        <IconPhoto
                            className="w-[52px] h-[52px] text-gray-400 dark:text-gray-500"
                            stroke={1.5}
                        />
                    </DropzoneIdle>

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
                        <Box>
                            <Progress value={file.progress} />
                        </Box>
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
