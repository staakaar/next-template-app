import { Spinner } from "@chakra-ui/react"

type SpinnerProps = {
    speed: string,
    size: "xs" | "sm" | "md" | "lg" | "xl"
    thickness: string
    label: string
    colorScheme: string
}

export const SpinnerComponent = (sp: SpinnerProps) => {
    return (
        <Spinner size={sp.size} />
    )
}
