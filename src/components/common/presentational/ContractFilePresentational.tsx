"use client";
import "@mantine/dropzone/styles.css";
import { useContractFileStore } from "@/stores/contractFile/ContractFileStore";
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
import dynamic from "next/dynamic";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// PDFビューアーを動的インポート（SSR無効）
const PDFViewer = dynamic(
    () =>
        import("@react-pdf-viewer/core").then((mod) => ({
            default: mod.Viewer,
        })),
    { ssr: false }
);
const PDFWorker = dynamic(
    () =>
        import("@react-pdf-viewer/core").then((mod) => ({
            default: mod.Worker,
        })),
    { ssr: false }
);
import { TrashIcon } from "lucide-react";

interface UploadContractFile extends FileWithPath {
    id: string;
    name: string;
    progress: number;
    status: "uploading" | "done" | "error";
    file: File;
    preview: string;
}

const ContractFilePresentational = (props: Partial<DropzoneProps>) => {
    const openRef = useRef<() => void>(null);
    const { contractFiles, setContractFiles } = useContractFileStore();
    const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
        null
    );
    const [isUploading, setIsUploading] = useState(false);
    // プラグイン初期化（動的インポート対応）
    const [defaultLayoutPluginInstance, setDefaultLayoutPluginInstance] =
        useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("@react-pdf-viewer/default-layout").then((mod) => {
                setDefaultLayoutPluginInstance(mod.defaultLayoutPlugin());
            });
        }
    }, []);

    /** ファイルのアップロード */
    const uploadFile = async (file: UploadContractFile) => {
        const formData = new FormData();
        formData.append("file", file);

        // API処理
    };

    /** ファイルのドロップ */
    const handleDrop = async (acceptedFiles: FileWithPath[]) => {
        console.log("handle drop", acceptedFiles);
        const newFiles = acceptedFiles.map(
            (file) =>
                ({
                    ...file,
                    id: crypto.randomUUID(),
                    name: file.name,
                    progress: 0,
                    file: file,
                    status: "uploading" as const,
                }) as UploadContractFile
        );

        const allContractFiles = [
            ...contractFiles,
            ...newFiles,
        ] as UploadContractFile[];

        setContractFiles(allContractFiles);
        setIsUploading(true);

        for (const file of newFiles) {
            // API処理関数呼び出し
            console.log("API処理関数呼び出し", file);
        }
        console.log(selectedFileIndex);

        setIsUploading(false);
    };

    /** ファイルの削除 */
    const removeFile = useCallback(
        (index: number) => {
            const filteredFiles = contractFiles.filter((_, i) => i !== index);
            setContractFiles(filteredFiles);

            if (selectedFileIndex === index) {
                setSelectedFileIndex(null);
            }
        },
        [contractFiles, selectedFileIndex, setContractFiles]
    );

    // クリーンアップ関数
    useEffect(() => {
        return () => {
            // ファイルのプレビューURLを解放
            contractFiles.forEach((file) => {
                URL.revokeObjectURL(file.preview);
            });
        };
    }, [contractFiles]);

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
                onDrop={(files) => handleDrop(files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={MIME_TYPE}
                disabled={isUploading}
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
                            <Button onClick={() => {}}>ファイルを選択</Button>
                        </Group>
                    </div>
                </Group>
            </Dropzone>

            <Stack mt={4} align="stretch">
                {contractFiles.map((file, index) => (
                    <Group
                        key={file.name + index}
                        p={2}
                        bg="gray.100"
                        className="justify-between"
                    >
                        <Text
                            onClick={() => handleFileSelect}
                            className="cursor-pointer"
                        >
                            {file.name} - {(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB
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

            {selectedFileIndex !== null && defaultLayoutPluginInstance && (
                <Box>
                    <PDFWorker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <PDFViewer
                            fileUrl={contractFiles[selectedFileIndex].preview}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </PDFWorker>
                </Box>
            )}
        </Box>
    );
};

export default ContractFilePresentational;
