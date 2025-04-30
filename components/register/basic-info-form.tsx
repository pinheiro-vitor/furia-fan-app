"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from "lucide-react"
import { validateCPF, formatCPF, formatPhone } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { DateInput } from "@/components/ui/date-input"

export const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  cpf: z
    .string()
    .min(11, { message: "CPF inválido" })
    .refine((cpf) => validateCPF(cpf.replace(/[^\d]/g, "")), {
      message: "CPF inválido. Verifique os números digitados.",
    }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  birthdate: z.string().min(1, { message: "Data de nascimento é obrigatória" }),
  address: z.string().min(5, { message: "Endereço é obrigatório" }),
  city: z.string().min(2, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  zipCode: z.string().min(8, { message: "CEP inválido" }),
  interests: z.array(z.string()).min(1, { message: "Selecione pelo menos um interesse" }),
  events: z.string().optional(),
  purchases: z.string().optional(),
})

const interestOptions = [
  { id: "csgo", label: "CS:GO" },
  { id: "valorant", label: "Valorant" },
  { id: "lol", label: "League of Legends" },
  { id: "r6", label: "Rainbow Six Siege" },
  { id: "dota2", label: "Dota 2" },
  { id: "fifa", label: "FIFA" },
  { id: "fortnite", label: "Fortnite" },
  { id: "apex", label: "Apex Legends" },
]

interface BasicInfoFormProps {
  loading?: boolean;
  onComplete: (values: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema>;
}

export default function BasicInfoForm({ onComplete, initialData }: BasicInfoFormProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialData?.interests || [])
  const { toast } = useToast()
  const isMobile = useMobile()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      cpf: "",
      phone: "",
      birthdate: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      interests: [],
      events: "",
      purchases: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Informações básicas salvas",
      description: "Seus dados foram salvos com sucesso!",
    })
    onComplete(values)
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) => {
      const updated = current.includes(interest) ? current.filter((i) => i !== interest) : [...current, interest]

      form.setValue("interests", updated)
      return updated
    })
  }

  // Formatação automática de CPF
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "")
    const formattedValue = formatCPF(value)
    form.setValue("cpf", formattedValue)
  }

  // Formatação automática de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "")
    const formattedValue = formatPhone(value)
    form.setValue("phone", formattedValue)
  }

  // Formatação automática de CEP
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "")
    const formattedValue = value.replace(/(\d{5})(\d{3})/, "$1-$2")
    form.setValue("zipCode", formattedValue)
  }

  // Buscar endereço pelo CEP
  const fetchAddressByCEP = async (cep: string) => {
    if (cep.replace(/[^\d]/g, "").length !== 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/[^\d]/g, "")}/json/`)
      const data = await response.json()

      if (!data.erro) {
        form.setValue("address", data.logradouro)
        form.setValue("city", data.localidade)
        form.setValue("state", data.uf)

        toast({
          title: "CEP encontrado",
          description: "Endereço preenchido automaticamente",
        })
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Informações Básicas</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000-00"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleCPFChange(e)
                      }}
                      maxLength={14}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handlePhoneChange(e)
                      }}
                      maxLength={15}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      onDateChange={(date) => {
                        if (date) {
                          field.onChange(date.toISOString().split("T")[0])
                        } else {
                          field.onChange("")
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="00000-000"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleZipCodeChange(e)
                        }}
                        maxLength={9}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fetchAddressByCEP(field.value)}
                        className="whitespace-nowrap"
                      >
                        Buscar CEP
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número, complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um estado" />
                      </SelectTrigger>
                      <SelectContent className={isMobile ? "max-h-[40vh]" : ""}>
                        <SelectItem value="AC">Acre</SelectItem>
                        <SelectItem value="AL">Alagoas</SelectItem>
                        <SelectItem value="AP">Amapá</SelectItem>
                        <SelectItem value="AM">Amazonas</SelectItem>
                        <SelectItem value="BA">Bahia</SelectItem>
                        <SelectItem value="CE">Ceará</SelectItem>
                        <SelectItem value="DF">Distrito Federal</SelectItem>
                        <SelectItem value="ES">Espírito Santo</SelectItem>
                        <SelectItem value="GO">Goiás</SelectItem>
                        <SelectItem value="MA">Maranhão</SelectItem>
                        <SelectItem value="MT">Mato Grosso</SelectItem>
                        <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="PA">Pará</SelectItem>
                        <SelectItem value="PB">Paraíba</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="PE">Pernambuco</SelectItem>
                        <SelectItem value="PI">Piauí</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        <SelectItem value="RO">Rondônia</SelectItem>
                        <SelectItem value="RR">Roraima</SelectItem>
                        <SelectItem value="SC">Santa Catarina</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="SE">Sergipe</SelectItem>
                        <SelectItem value="TO">Tocantins</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel>Interesses em Esports</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {interestOptions.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.id}
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={() => toggleInterest(interest.id)}
                  />
                  <label
                    htmlFor={interest.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {interest.label}
                  </label>
                </div>
              ))}
            </div>
            {form.formState.errors.interests && (
              <p className="text-sm font-medium text-red-500 mt-2">{form.formState.errors.interests.message}</p>
            )}
          </div>

          <FormField
            control={form.control}
            name="events"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eventos da FURIA que você participou no último ano</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Liste os eventos que você participou (campeonatos, meet & greet, etc.)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purchases"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produtos da FURIA que você comprou no último ano</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Liste os produtos que você adquiriu (camisetas, ingressos, etc.)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-[#00a859] hover:bg-[#008a49] text-white">
            Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
