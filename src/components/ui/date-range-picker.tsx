"use client";

import * as React from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
    value?: [Date | null, Date | null];
    onChange?: (dates: [Date | null, Date | null]) => void;
    placeholder?: string;
    label?: string;
}

export function DateRangePicker({
    value,
    onChange,
    placeholder = "期間を選択",
    label,
}: DateRangePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>(() => {
        if (value && value[0] && value[1]) {
            return {
                from: value[0],
                to: value[1],
            };
        }
        return undefined;
    });

    React.useEffect(() => {
        if (date?.from && date?.to) {
            onChange?.([date.from, date.to]);
        } else if (!date?.from && !date?.to) {
            onChange?.([null, null]);
        }
    }, [date, onChange]);

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm font-medium">{label}</label>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "PPP", { locale: ja })} -{" "}
                                    {format(date.to, "PPP", { locale: ja })}
                                </>
                            ) : (
                                format(date.from, "PPP", { locale: ja })
                            )
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={ja}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
