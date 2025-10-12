"use client";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useContractFileStore } from "@/stores/contractFile/ContractFileStore";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileWithPath extends File {
    path?: string;
}

interface UploadContractFile extends FileWithPath {
    id: string;
    name: string;
    progress: number;
    status: "uploading" | "done" | "error";
    file: File;
    preview: string;
}

interface ContractFilePresentationalProps {
    maxSize?: number;
    accept?: string[];
    disabled?: boolean;
}

const ContractFilePresentational = (props: ContractFilePresentationalProps) => {
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
    const openRef = useRef<() => void>(null);
    const { contractFiles, setContractFiles } = useContractFileStore();
    const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
        null
    );
    const [isUploading, setIsUploading] = useState(false);
    // プラグイン初期化（動的インポート対応）
    const [defaultLayoutPluginInstance, setDefaultLayoutPluginInstance] =
        useState<any>(null);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         import("@react-pdf-viewer/default-layout").then((mod) => {
    //             setDefaultLayoutPluginInstance(mod.defaultLayoutPlugin());
    //         });
    //     }
    // }, []);

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
                } as UploadContractFile)
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

    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDropEvent = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files) as FileWithPath[];
        await handleDrop(files);
    };

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) as FileWithPath[] : [];
        await handleDrop(files);
    };

    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropEvent}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-gray-300"
                } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
            >
                <div className="flex flex-col items-center gap-4 pointer-events-none">
                    <IconPhoto
                        className="w-[52px] h-[52px] text-gray-400 dark:text-gray-500"
                        stroke={1.5}
                    />
                    <div>
                        <p className="text-xl">
                            ファイルをドラッグ＆ドロップするか、クリックして選択してください
                        </p>
                        <div className="flex justify-center mt-4">
                            <Button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="pointer-events-auto"
                            >
                                ファイルを選択
                            </Button>
                        </div>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={isUploading}
                />
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {contractFiles.map((file, index) => (
                    <div
                        key={file.id}
                        className="p-2 bg-gray-100 flex justify-between items-center gap-2"
                    >
                        <span
                            onClick={() => handleFileSelect(index)}
                            className="cursor-pointer flex-1"
                        >
                            {file.name} - {(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                        <div className="w-24">
                            <Progress value={file.progress} />
                        </div>
                    </div>
                ))}
            </div>

            {selectedFileIndex !== null && defaultLayoutPluginInstance && (
                <div className="mt-4">
                    <PDFWorker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <PDFViewer
                            fileUrl={contractFiles[selectedFileIndex].preview}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </PDFWorker>
                </div>
            )}
        </div>
    );
};

export default ContractFilePresentational;
