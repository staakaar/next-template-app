import { Spinner } from "@chakra-ui/react"

type SpinnerProps = {
    size: "xs" | "sm" | "md" | "lg" | "xl"
}

export const SpinnerComponent = (sp: SpinnerProps) => {
    return (
        <Spinner size={sp.size} />
    )
}
