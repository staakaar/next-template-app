import { Tooltip, Text } from "@mantine/core";

interface TooltipProps {
    content: string;
    tooltip: string;
    maxWidth: string;
}

const VTooltip = ({ content, tooltip, maxWidth = "200" }: TooltipProps) => {
    return (
        <Tooltip
            label={tooltip}
            position="top"
            withArrow
            multiline
            maw={220}
            openDelay={300}
            transitionProps={{ duration: 200 }}
        >
            <Text
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: `${maxWidth}px`,
                }}
            >
                {content}
            </Text>
        </Tooltip>
    );
};

export default VTooltip;
