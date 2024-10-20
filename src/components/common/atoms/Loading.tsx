import { Center, Stack, Loader, Text } from "@mantine/core";

const Loading = () => {
    return (
        <Center style={{ width: "100vw", height: "100vh" }}>
            <Stack align="center" gap="md">
                <Loader size="xl" variant="dots" />
                <Text size="lg">読み込み中...</Text>
            </Stack>
        </Center>
    );
};

export default Loading;
