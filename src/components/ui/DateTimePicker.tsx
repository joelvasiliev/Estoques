"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format, isValid } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { UseFormReturn, useWatch } from "react-hook-form"

export function DatetimePicker({ form, date_form_label }: {
    form: UseFormReturn<any>,
    date_form_label: string
}) {
    if (!form) throw new Error("useForm is required")
    
    const date = useWatch({
        control: form.control,
        name: date_form_label
    });

    useEffect(() => {
        const initialDate = form.getValues(date_form_label);
        if (initialDate) {
            const updatedDate = new Date(initialDate as Date);
            form.setValue(date_form_label, updatedDate);
        }
    }, [form, date_form_label]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                        {date && isValid(new Date(date)) ? format(new Date(date), "dd/MM/yyyy") : "00/00/0000"}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 text-black bg-[#E1E1E1]" align="center">
                <Calendar
                    mode="single"
                    selected={date && isValid(new Date(date)) ? new Date(date) : undefined}
                    onSelect={(selectedDate) => {
                        if (!selectedDate) return
                        form.setValue(date_form_label, selectedDate)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
