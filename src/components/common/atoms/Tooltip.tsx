import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
    content: string;
    tooltip: string;
    maxWidth: string;
}

const VTooltip = ({ content, tooltip, maxWidth = "200" }: TooltipProps) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        className="whitespace-nowrap overflow-hidden text-ellipsis inline-block"
                        style={{ maxWidth: `${maxWidth}px` }}
                    >
                        {content}
                    </span>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    className="max-w-[220px] whitespace-normal"
                >
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default VTooltip;
