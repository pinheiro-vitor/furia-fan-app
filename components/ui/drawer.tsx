"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  month?: Date
  onMonthChange?: (date: Date) => void
  selected?: Date | Date[]
  onSelect?: (date: Date) => void
  disabled?: (date: Date) => boolean
  fromDate?: Date
  toDate?: Date
}

interface CalendarComponentProps {
  className?: string
  month?: Date
  onMonthChange?: (date: Date) => void
  selected?: Date | Date[]
  onSelect?: (date: Date) => void
  disabled?: (date: Date) => boolean
  fromDate?: Date
  toDate?: Date
  props?: React.HTMLAttributes<HTMLDivElement>
}

export function Calendar({
  className,
  month = new Date(),
  onMonthChange,
  selected,
  onSelect,
  disabled,
  fromDate,
  toDate,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month)

  // Função para verificar se uma data está selecionada
  const isSelected = (date: Date) => {
    if (!selected) return false
    if (Array.isArray(selected)) {
      return selected.some(
        (selectedDate) =>
          selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getFullYear() === date.getFullYear(),
      )
    }
    return (
      selected.getDate() === date.getDate() &&
      selected.getMonth() === date.getMonth() &&
      selected.getFullYear() === date.getFullYear()
    )
  }

  // Função para verificar se uma data está desabilitada
  const isDisabled = (date: Date) => {
    if (disabled && disabled(date)) return true
    if (fromDate && date < fromDate) return true
    if (toDate && date > toDate) return true
    return false
  }

  // Função para navegar para o mês anterior
  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth)
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    setCurrentMonth(previousMonth)
    onMonthChange?.(previousMonth)
  }

  // Função para navegar para o próximo mês
  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  // Função para selecionar uma data
  const handleSelectDate = (date: Date) => {
    if (isDisabled(date)) return
    onSelect?.(date)
  }

  // Gerar dias do mês atual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const currentMonthNumber = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, currentMonthNumber)
  const firstDayOfMonth = getFirstDayOfMonth(year, currentMonthNumber)

  // Nomes dos meses
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // Nomes dos dias da semana
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  // Gerar dias do mês
  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null) // Dias vazios no início do mês
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, currentMonthNumber, i))
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={handlePreviousMonth} className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {monthNames[currentMonthNumber]} {year}
        </div>
        <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-7 w-7">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {weekDays.map((day, i) => (
          <div key={i} className="text-muted-foreground h-9 flex items-center justify-center">
            {day}
          </div>
        ))}
        {days.map((date, i) => {
          if (!date) {
            return <div key={`empty-${i}`} className="h-9" />
          }

          const dateIsSelected = isSelected(date)
          const dateIsDisabled = isDisabled(date)

          return (
            <div
              key={i}
              className={cn(
                "h-9 w-9 flex items-center justify-center rounded-md text-sm",
                dateIsSelected && "bg-primary text-primary-foreground",
                !dateIsSelected && "hover:bg-accent",
                dateIsDisabled && "text-muted-foreground opacity-50 cursor-not-allowed",
                !dateIsDisabled && "cursor-pointer",
              )}
              onClick={() => !dateIsDisabled && handleSelectDate(date)}
            >
              {date.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}
