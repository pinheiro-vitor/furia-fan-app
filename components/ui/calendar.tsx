"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void
  disabled?: (date: Date) => boolean
  fromDate?: Date
  toDate?: Date
  month?: Date
  onMonthChange?: (date: Date) => void
  numberOfMonths?: number
  defaultMonth?: Date
  initialFocus?: boolean
  showOutsideDays?: boolean
  fixedWeeks?: boolean
  locale?: Locale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  captionLayout?: "dropdown" | "buttons"
  classNames?: {
    months?: string
    month?: string
    caption?: string
    caption_label?: string
    nav?: string
    nav_button?: string
    nav_button_previous?: string
    nav_button_next?: string
    table?: string
    head_row?: string
    head_cell?: string
    row?: string
    cell?: string
    day?: string
    day_selected?: string
    day_today?: string
    day_outside?: string
    day_disabled?: string
    day_range_middle?: string
    day_range_end?: string
    day_hidden?: string
  }
}

interface Locale {
  code: string
  name: string
  // Add other locale properties as needed
}

export function Calendar({
  className,
  mode = "single",
  selected,
  onSelect,
  disabled,
  fromDate,
  toDate,
  month,
  onMonthChange,
  numberOfMonths = 1,
  defaultMonth = new Date(),
  initialFocus,
  showOutsideDays = true,
  fixedWeeks = false,
  locale,
  weekStartsOn = 0,
  captionLayout = "buttons",
  classNames,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month || defaultMonth)

  // Atualizar o mês atual quando a prop month mudar
  React.useEffect(() => {
    if (month) {
      setCurrentMonth(month)
    }
  }, [month])

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

  // Função para verificar se uma data está selecionada
  const isDateSelected = (date: Date): boolean => {
    if (!selected) return false

    if (mode === "single" && selected instanceof Date) {
      return isSameDay(date, selected)
    }

    if (mode === "multiple" && Array.isArray(selected)) {
      return selected.some((selectedDate) => isSameDay(date, selectedDate))
    }

    if (mode === "range" && selected && typeof selected === "object" && "from" in selected) {
      const { from, to } = selected
      if (!to) return isSameDay(date, from)
      return isDateInRange(date, from, to)
    }

    return false
  }

  // Função para verificar se duas datas são o mesmo dia
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  // Função para verificar se uma data está em um intervalo
  const isDateInRange = (date: Date, from: Date, to: Date): boolean => {
    return date >= from && date <= to
  }

  // Função para verificar se uma data é hoje
  const isToday = (date: Date): boolean => {
    const today = new Date()
    return isSameDay(date, today)
  }

  // Função para verificar se uma data está desabilitada
  const isDateDisabled = (date: Date): boolean => {
    if (disabled && disabled(date)) return true
    if (fromDate && date < fromDate) return true
    if (toDate && date > toDate) return true
    return false
  }

  // Função para lidar com a seleção de uma data
  const handleSelectDate = (date: Date) => {
    if (isDateDisabled(date)) return

    if (mode === "single") {
      onSelect?.(date)
    } else if (mode === "multiple") {
      if (!selected || !Array.isArray(selected)) {
        onSelect?.([date])
      } else {
        const isSelected = selected.some((selectedDate) => isSameDay(selectedDate, date))
        if (isSelected) {
          onSelect?.(selected.filter((selectedDate) => !isSameDay(selectedDate, date)))
        } else {
          onSelect?.([...selected, date])
        }
      }
    } else if (mode === "range") {
      if (!selected || !("from" in selected)) {
        onSelect?.({ from: date, to: date })
      } else {
        const { from, to } = selected
        if (from && !to && date >= from) {
          onSelect?.({ from, to: date })
        } else {
          onSelect?.(undefined)
        }
      }
    }
  }

  // Renderizar os dias do mês
  const renderDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Obter o primeiro dia do mês
    const firstDayOfMonth = new Date(year, month, 1)

    // Obter o último dia do mês
    const lastDayOfMonth = new Date(year, month + 1, 0)

    // Obter o dia da semana do primeiro dia do mês (0 = Domingo, 1 = Segunda, etc.)
    let firstDayOfWeek = firstDayOfMonth.getDay() - weekStartsOn
    if (firstDayOfWeek < 0) firstDayOfWeek += 7

    // Obter o número de dias no mês
    const daysInMonth = lastDayOfMonth.getDate()

    // Calcular o número de dias a mostrar do mês anterior
    const daysFromPrevMonth = firstDayOfWeek

    // Calcular o número de dias a mostrar do próximo mês
    const daysFromNextMonth = fixedWeeks
      ? Math.max(0, 42 - daysInMonth - daysFromPrevMonth)
      : (7 - ((daysFromPrevMonth + daysInMonth) % 7)) % 7

    // Criar array com todos os dias a serem mostrados
    const days: Date[] = []

    // Adicionar dias do mês anterior
    if (showOutsideDays) {
      const prevMonth = new Date(year, month, 0)
      const daysInPrevMonth = prevMonth.getDate()

      for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
        days.push(new Date(year, month - 1, i))
      }
    } else {
      // Adicionar espaços vazios para os dias do mês anterior
      for (let i = 0; i < daysFromPrevMonth; i++) {
        days.push(null as unknown as Date)
      }
    }

    // Adicionar dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    // Adicionar dias do próximo mês
    if (showOutsideDays && daysFromNextMonth > 0) {
      for (let i = 1; i <= daysFromNextMonth; i++) {
        days.push(new Date(year, month + 1, i))
      }
    } else if (daysFromNextMonth > 0) {
      // Adicionar espaços vazios para os dias do próximo mês
      for (let i = 0; i < daysFromNextMonth; i++) {
        days.push(null as unknown as Date)
      }
    }

    // Dividir os dias em semanas
    const weeks: (Date | null)[][] = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return weeks.map((week, weekIndex) => (
      <tr key={weekIndex} className={cn("flex w-full", classNames?.row)}>
        {week.map((date, dayIndex) => {
          if (!date) {
            return (
              <td key={dayIndex} className={cn("text-center p-0 relative h-9 w-9", classNames?.cell)}>
                <div className={cn("h-9 w-9 p-0 flex items-center justify-center", classNames?.day_hidden)} />
              </td>
            )
          }

          const isSelected = isDateSelected(date)
          const isCurrentMonth = date.getMonth() === month
          const isDisabled = isDateDisabled(date)
          const isCurrentDay = isToday(date)

          return (
            <td key={dayIndex} className={cn("text-center p-0 relative h-9 w-9", classNames?.cell)}>
              <div
                role="button"
                tabIndex={isDisabled ? -1 : 0}
                className={cn(
                  "h-9 w-9 p-0 flex items-center justify-center rounded-md text-sm transition-colors",
                  isSelected && "bg-primary text-primary-foreground",
                  !isSelected && "hover:bg-accent",
                  isCurrentDay && !isSelected && "border border-primary",
                  !isCurrentMonth && showOutsideDays && "text-muted-foreground opacity-50",
                  isDisabled && "text-muted-foreground opacity-50 cursor-not-allowed",
                  !isDisabled && "cursor-pointer",
                  classNames?.day,
                  isSelected && classNames?.day_selected,
                  isCurrentDay && classNames?.day_today,
                  !isCurrentMonth && showOutsideDays && classNames?.day_outside,
                  isDisabled && classNames?.day_disabled,
                )}
                onClick={() => !isDisabled && handleSelectDate(date)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    !isDisabled && handleSelectDate(date)
                  }
                }}
              >
                {date.getDate()}
              </div>
            </td>
          )
        })}
      </tr>
    ))
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className={cn("flex justify-between items-center mb-4", classNames?.caption)}>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          disabled={
            fromDate &&
            currentMonth.getMonth() === fromDate.getMonth() &&
            currentMonth.getFullYear() === fromDate.getFullYear()
          }
          className={cn("h-7 w-7", classNames?.nav_button, classNames?.nav_button_previous)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className={cn("font-medium", classNames?.caption_label)}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
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
          className={cn("h-7 w-7", classNames?.nav_button, classNames?.nav_button_next)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <table className={cn("w-full border-collapse", classNames?.table)}>
        <thead>
          <tr className={cn("flex", classNames?.head_row)}>
            {adjustedWeekDays.map((day, i) => (
              <th
                key={i}
                className={cn("text-muted-foreground text-xs font-normal flex-1 text-center", classNames?.head_cell)}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderDays()}</tbody>
      </table>
    </div>
  )
}
