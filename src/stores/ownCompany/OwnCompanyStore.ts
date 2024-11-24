import { OwnCompanyForm } from "@/lib/ownCompany/schema";
import { OwnCompany } from "@/types/api/ownCompany";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultOwnCompanyForm: OwnCompanyForm = Object.freeze({
    ownCompanyPersonInCharge: "",
    ownCompanyDepartmentName: "",
    externalLink: "",
    isCancellation: false,
    cancellationText: "",
    // notifications settings
    // other settings (e.g., permissions)
});

// state actions mutations
export type OwnCompanyState = {
    ownCompany: OwnCompany;
    resetOwnCompany: () => void;
};

const useOwnCompanyStore = create<OwnCompanyState>()(
    persist(
        (set) => ({
            ownCompany: {} as OwnCompany,
            resetOwnCompany: () =>
                set((state) => ({ ...state, ownCompany: {} as OwnCompany })),
        }),
        {
            name: "own-company-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useOwnCompanyStore;
