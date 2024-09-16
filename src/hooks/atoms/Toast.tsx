import { useToast } from "@chakra-ui/react";

export type ToastStatus =
    | "info"
    | "warning"
    | "success"
    | "error"
    | "loading"
    | undefined;

export type CustomToast = {
    title: string;
    description: string;
    status?: ToastStatus;
    duration?: number;
    isClosable?: boolean;
};

export const useCustomToast = (props: CustomToast) => {
    const toast = useToast();

    const showToast = ({
        title,
        description,
        status = "info",
        duration = 5000,
        isClosable = true,
    }: CustomToast) => {
        toast({
            title,
            description,
            status,
            duration,
            isClosable,
        });
    };

    return showToast({ title: props.title, description: props.description });
};
