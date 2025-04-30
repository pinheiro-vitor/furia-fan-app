"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface DayPickerProps {
  month?: Date;
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  className?: string;
}

export function DayPicker({
  month: initialMonth = new Date(),
  selected,
  onSelect,
  disabled,
  fromDate,
  toDate,
  weekStartsOn = 0,
  showOutsideDays = true,
  className,
  ...props
}: DayPickerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth)

  // Função para verificar se uma data está selecionada
  const isSelected = (date: Date) => {
    if (!selected) return false
    return (
      selected.getDate() === date.getDate() &&
      selected.getMonth() === date.getMonth() &&
      selected.getFullYear() === date.getFullYear()
    )
  }

  // Função para verificar se uma data é hoje
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
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
  }

  // Função para navegar para o próximo mês
  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentMonth(nextMonth)
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
    let firstDay = new Date(year, month, 1).getDay() - weekStartsOn
    if (firstDay < 0) firstDay += 7
    return firstDay
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

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

  // Ajustar os dias da semana com base em weekStartsOn
  const adjustedWeekDays = [...weekDays.slice(weekStartsOn), ...weekDays.slice(0, weekStartsOn)]

  // Gerar dias do mês
  const days = []

  // Adicionar dias do mês anterior
  if (showOutsideDays) {
    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()

    for (let i = daysInPrevMonth - firstDayOfMonth + 1; i <= daysInPrevMonth; i++) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
        isOutside: true,
      })
    }
  } else {
    // Adicionar espaços vazios para os dias do mês anterior
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
  }

  // Adicionar dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
      isOutside: false,
    })
  }

  // Calcular quantos dias do próximo mês precisamos mostrar para completar a grade
  const remainingDays = (7 - (days.length % 7)) % 7

  // Adicionar dias do próximo mês
  if (showOutsideDays && remainingDays > 0) {
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isOutside: true,
      })
    }
  } else if (remainingDays > 0) {
    // Adicionar espaços vazios para os dias do próximo mês
    for (let i = 0; i < remainingDays; i++) {
      days.push(null)
    }
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          disabled={
            fromDate &&
            currentMonth.getMonth() === fromDate.getMonth() &&
            currentMonth.getFullYear() === fromDate.getFullYear()
          }
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {monthNames[month]} {year}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          disabled={
            toDate &&
            currentMonth.getMonth() === toDate.getMonth() &&
            currentMonth.getFullYear() === toDate.getFullYear()
          }
          className="h-7 w-7"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {adjustedWeekDays.map((day, i) => (
          <div key={i} className="text-muted-foreground h-9 flex items-center justify-center">
            {day}
          </div>
        ))}
        {days.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} className="h-9" />
          }

          const { date, isCurrentMonth, isOutside } = day
          const dateIsSelected = isSelected(date)
          const dateIsToday = isToday(date)
          const dateIsDisabled = isDisabled(date)

          return (
            <div
              key={i}
              className={cn(
                "h-9 w-9 flex items-center justify-center rounded-md text-sm",
                dateIsSelected && "bg-primary text-primary-foreground",
                !dateIsSelected && "hover:bg-accent",
                dateIsToday && !dateIsSelected && "border border-primary",
                isOutside && "text-muted-foreground opacity-50",
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
