import { atom } from "recoil";

/** 品目ページネーション */
export const itemPageOptionsState = atom({
    key: "itemPageOptionsState",
    default: {
        page: 0,
        pageSize: 50,
        search: "",
    },
});
