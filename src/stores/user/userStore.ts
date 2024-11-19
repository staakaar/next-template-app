import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserProfile = {
    userId: string;
    departmentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export const defaultUserProfile: UserProfile = Object.freeze({
    userId: "",
    departmentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
});

export type UserProfileState = {
    userProfile: UserProfile;
    setUserProfile: (userProfile: UserProfile) => void;
    resetUserProfile: () => void;
};

export const useUserProfileStore = create<UserProfileState>()(
    persist(
        (set) => ({
            userProfile: {
                userId: "",
                departmentId: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
            } as UserProfile,
            setUserProfile: (userProfile: UserProfile) =>
                set((state) => ({ ...state, userProfile: userProfile })),
            resetUserProfile: () =>
                set((state) => ({
                    ...state,
                    userProfile: {} as UserProfile,
                })),
        }),
        {
            name: "user-profile-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
