import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserProfileStore from "@/stores/user/UserStore";
import axios from "axios";
import { Role } from "@/stores/contractBasic/ContractBasicStore";

export type Permission = "edit" | "view";
export type UserRole = {
    userId: string;
    permission: Permission;
};

export type DepartmentRole = {
    departmentId: string;
    permission: Permission;
};

/**
 * 契約書詳細開いた際の権限チェック
 * @param contractCode
 * @returns
 */
export const useContractAuthorityCheck = (contractCode: string) => {
    const [permission, setPermission] = useState<Permission>("view");
    // ユーザー情報をstoreに設定
    const { userProfile } = useUserProfileStore();
    const router = useRouter();

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const response = await axios.get(`/api/check-permission`, {
                    params: { contractCode },
                });

                const { userRoles, departmentRoles, companyRoles } =
                    response.data;

                const userPermission = checkUserPermission(
                    userRoles,
                    userProfile.userId
                );

                const departmentPermission = checkDepartmentPermission(
                    departmentRoles,
                    userProfile.departmentId
                );

                const companyPermission = checkCompanyPermission(
                    companyRoles,
                    userProfile.departmentId
                );

                // 全社権限設定

                // 部署権限設定

                // ユーザー権限設定

                // 最も高い権限を設定
                // if (
                //     userPermission === "EDIT" ||
                //     departmentPermission === "EDIT"
                // ) {
                //     setPermission("edit");
                // } else if (
                //     userPermission === "READ" ||
                //     departmentPermission === "READ"
                // ) {
                //     setPermission("view");
                // } else {
                //     setPermission("view"); // デフォルトは'view'
                // }
            } catch (error) {
                console.error("Error checking permission:", error);
                setPermission("view");
            }
        };

        checkPermission();
    }, [contractCode, userProfile]);

    return permission;
};

const checkCompanyPermission = (
    userRoles: any,
    companyId: string
): Permission | undefined => {
    return undefined;
};

const checkDepartmentPermission = (
    departmentRoles: any,
    departmentId: string
): Permission | undefined => {
    return undefined;
};

const checkUserPermission = (
    userRoles: any,
    userId: string
): Permission | undefined => {
    return undefined;
};

/**
    契約書権限のテーブル表示用
 */
export const useContractAuthorityTable = () => {
    // own company api
    // onb api
    // データを照合してテーブル専用の型へ詰め替え

    return [{}, {}, {}] as ContractAuthority[];
};

type RoleType = "VIEW" | "EDIT";
type RoleCategory = "USER" | "DEPARTMENT" | "COMPANY";

export type ContractAuthority = {
    roleCategory: RoleCategory;
    roleName: string;
    roleType: RoleType;
};
