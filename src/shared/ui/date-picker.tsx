"use client";

import { format, isValid, parse } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

const DATE_FORMAT = "dd.MM.yyyy";

type DatePickerProps = {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
};

export function DatePicker({ value, onValueChange, placeholder = "Оберіть дату", id, className }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const parsedDate = value ? parse(value, DATE_FORMAT, new Date()) : undefined;
  const selected = parsedDate && isValid(parsedDate) ? parsedDate : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn("w-full justify-start gap-2 font-normal", !selected && "text-muted-foreground", className)}
        >
          <CalendarIcon className="size-4" />
          {selected ? format(selected, DATE_FORMAT, { locale: uk }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={uk}
          selected={selected}
          onSelect={(date) => {
            if (!date) return;
            onValueChange(format(date, DATE_FORMAT));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
