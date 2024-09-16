import { Text, Spinner, VStack } from "@chakra-ui/react";

type SpinnerProps = {
    speed?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    thickness?: string;
    label?: string;
    colorScheme?: string;
};

const VSpinner = (sp: SpinnerProps) => {
    return (
        <VStack>
            <Spinner color={sp.colorScheme} />
            <Text>Loading...</Text>
        </VStack>
    );
};

export default VSpinner;
