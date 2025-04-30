"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// importação removida porque Drawer não é exportado diretamente

import { useMobile } from "@/hooks/use-mobile"
import { CalendarIcon } from "lucide-react"

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onDateChange?: (date: Date | null) => void
}

export function DateInput({ className, onDateChange, value, onChange, ...props }: DateInputProps) {
  const [date, setDate] = React.useState<Date | undefined>(value ? new Date(value as string) : undefined)
  const [open, setOpen] = React.useState(false)
  const isMobile = useMobile()

  // Função para formatar a data no formato brasileiro (DD/MM/YYYY)
  const formatDate = (dateString: string): string => {
    if (!dateString) return ""

    // Se já estiver no formato DD/MM/YYYY, retornar como está
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return dateString

    // Se estiver no formato ISO (YYYY-MM-DD), converter para DD/MM/YYYY
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split("-")
      return `${day}/${month}/${year}`
    }

    // Tentar converter de Date para string formatada
    try {
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
      }
    } catch (e) {
      // Ignorar erros de parsing
    }

    return dateString
  }

  // Função para converter string formatada (DD/MM/YYYY) para objeto Date
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null

    // Verificar se está no formato DD/MM/YYYY
    const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (match) {
      const [_, day, month, year] = match
      const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))

      // Verificar se a data é válida
      if (
        date.getDate() === Number.parseInt(day) &&
        date.getMonth() === Number.parseInt(month) - 1 &&
        date.getFullYear() === Number.parseInt(year)
      ) {
        return date
      }
    }

    return null
  }

  // Função para lidar com a mudança no input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Chamar o onChange original, se fornecido
    if (onChange) {
      onChange(e)
    }

    const value = e.target.value

    // Formatar automaticamente a entrada do usuário
    let input = value.replace(/\D/g, "")

    if (input.length > 0) {
      // Adicionar barras automaticamente
      if (input.length <= 2) {
        input = input
      } else if (input.length <= 4) {
        input = `${input.slice(0, 2)}/${input.slice(2)}`
      } else {
        input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4, 8)}`
      }

      // Atualizar o valor do input
      e.target.value = input

      // Notificar sobre a mudança de data
      if (input.length === 10) {
        const parsedDate = parseDate(input)
        setDate(parsedDate || undefined)
        onDateChange?.(parsedDate)
      } else {
        setDate(undefined)
        onDateChange?.(null)
      }
    } else {
      setDate(undefined)
      onDateChange?.(null)
    }
  }

  // Função para lidar com a seleção de data no calendário
  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)

    if (selectedDate) {
      // Formatar a data para o formato DD/MM/YYYY
      const day = selectedDate.getDate().toString().padStart(2, "0")
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0")
      const year = selectedDate.getFullYear()
      const formattedDate = `${day}/${month}/${year}`

      // Criar um evento sintético para simular a mudança no input
      const event = {
        target: {
          name: props.name,
          value: formattedDate,
        },
      } as React.ChangeEvent<HTMLInputElement>

      // Chamar o onChange original, se fornecido
      if (onChange) {
        onChange(event)
      }

      // Notificar sobre a mudança de data
      onDateChange?.(selectedDate)
    } else {
      onDateChange?.(null)
    }
  }

  // Formatar o valor inicial
  const formattedValue = React.useMemo(() => {
    return formatDate(value as string)
  }, [value])

  // Renderizar um Drawer em dispositivos móveis e um Dialog em desktop
  // Em mobile, use Dialog assim como no desktop
  if (isMobile) {
    return (
      <div className="relative">
        <Input
          type="text"
          placeholder="DD/MM/AAAA"
          maxLength={10}
          className={cn("pr-10", className)}
          value={formattedValue}
          onChange={handleInputChange}
          {...props}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setOpen(true)}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <Calendar mode="single" selected={date} onSelect={(selected) => { if (selected instanceof Date || selected === undefined) { handleSelectDate(selected); } }} initialFocus />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="DD/MM/AAAA"
        maxLength={10}
        className={cn("pr-10", className)}
        value={formattedValue}
        onChange={handleInputChange}
        {...props}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <Calendar mode="single" selected={date} onSelect={(selected) => { if (selected instanceof Date || selected === undefined) { handleSelectDate(selected); } }} initialFocus />
        </DialogContent>
      </Dialog>
    </div>
  )
}
