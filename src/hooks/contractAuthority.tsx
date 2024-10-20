import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userProfileState } from "@/stores/user/userStore";

export type Permission = "edit" | "view";
export type UserRole = {
    userId: string;
    permission: Permission;
};

export type DepartmentRole = {
    departmentId: string;
    permission: Permission;
};

export const useContractAuthorityCheck = (contractCode: string) => {
    const [permission, setPermission] = useState<Permission>("view");
    // ユーザー情報をstoreに設定
    const userProfile = useRecoilValue(userProfileState);
    const router = useRouter();
    const toast = useToast();

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

                //部署権限設定

                // ユーザー権限設定

                // 最も高い権限を設定
                if (
                    userPermission === "EDIT" ||
                    departmentPermission === "EDIT"
                ) {
                    setPermission("edit");
                } else if (
                    userPermission === "READ" ||
                    departmentPermission === "READ"
                ) {
                    setPermission("view");
                } else {
                    setPermission("view"); // デフォルトは'view'
                }
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
