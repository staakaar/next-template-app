import { FileWithPath } from "@mantine/dropzone";
import { atom } from "recoil";

interface UploadFile extends FileWithPath {
    id: string;
    progress: number;
    status: "uploading" | "done" | "error";
    file: File;
    preview: string;
}

export const uploadFilesState = atom({
    key: "uploadFilesState",
    default: [] as UploadFile[],
});

export const contractFilesState = atom({
    key: "contractFilesState",
    default: [],
});
