"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  className?: string;
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
} // Explicit typing

export function DatePicker({ className, selected, onSelect }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(selected ? format(selected, "dd/MM/yyyy") : "")

  // Sincronizar valor do input quando selected muda externamente
  React.useEffect(() => {
    if (selected) {
      setDate(selected)
      setInputValue(format(selected, "dd/MM/yyyy"))
    } else {
      setDate(undefined)
      setInputValue("")
    }
  }, [selected])

  // Atualizar o valor do input quando a data for selecionada internamente
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "dd/MM/yyyy"))
      onSelect?.(date)
    } else {
      setInputValue("")
      onSelect?.(undefined)
    }
  }, [date])

  // Função para lidar com a entrada manual de data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Tentar converter a entrada em uma data válida
    const parts = value.split("/")
    if (parts.length === 3) {
      const day = Number.parseInt(parts[0], 10)
      const month = Number.parseInt(parts[1], 10) - 1
      const year = Number.parseInt(parts[2], 10)

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const newDate = new Date(year, month, day)
        if (newDate.getDate() === day && newDate.getMonth() === month && newDate.getFullYear() === year) {
          setDate(newDate)
          return
        }
      }
    }

    // Se a entrada não for uma data válida, limpar a data selecionada
    setDate(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className={cn("relative", className)}>
        <Input value={inputValue} onChange={handleInputChange} placeholder="DD/MM/AAAA" className="pr-10" />
        <DialogTrigger asChild>
          <Button variant="ghost" className="absolute right-0 top-0 h-full px-3" onClick={() => setOpen(true)}>
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate instanceof Date || newDate === undefined) {
              setDate(newDate)
              setOpen(false)
            }
          }}
          initialFocus
        />
      </DialogContent>
    </Dialog>
  )
}
