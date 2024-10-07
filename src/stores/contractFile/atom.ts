import { atom } from "recoil";

interface UploadFile {
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
