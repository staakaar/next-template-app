import type { FileWithPath } from "@mantine/dropzone";
import { create } from "zustand";

interface UploadContractFile extends FileWithPath {
    id: string;
    name: string;
    progress: number;
    status: "uploading" | "done" | "error";
    file: File;
    preview: string;
}

// export const uploadFilesState = atom({
//     key: "uploadFilesState",
//     default: [] as UploadFile[],
// });

// export const contractFilesState = atom({
//     key: "contractFilesState",
//     default: [],
// });

export type ContractFileState = {
    contractFiles: UploadContractFile[];
    setContractFiles: (uploadFiles: UploadContractFile[]) => void;
    resetContractFiles: () => void;
};

export const useContractFileStore = create<ContractFileState>()(
    (set) => ({
        contractFiles: [] as UploadContractFile[],
        setContractFiles: (uploadFiles: UploadContractFile[]) =>
            set((state) => ({ ...state, contractFiles: uploadFiles })),
        resetContractFiles: () =>
            set((state) => ({
                ...state,
                contractFiles: [] as UploadContractFile[],
            })),
    })
    // {
    //     name: "contract-file-store",
    //     storage: createJSONStorage(() => sessionStorage),
    // }
);
