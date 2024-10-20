import { atom } from "recoil";

export type UserProfile = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export const defaultUserProfile: UserProfile = Object.freeze({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
});

export const userProfileState = atom<UserProfile>({
    key: "userProfile",
    default: defaultUserProfile,
});
