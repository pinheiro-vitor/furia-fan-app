"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

interface TermsConsentProps {
  onAccept: () => void;
}

export default function TermsConsent({ onAccept }: TermsConsentProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [acceptedDataUse, setAcceptedDataUse] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (acceptedTerms && acceptedPrivacy && acceptedDataUse) {
      onAccept()
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-800">Importante</h4>
            <p className="text-sm text-yellow-700">
              Antes de prosseguir com o cadastro, precisamos do seu consentimento para coletar e processar seus dados
              pessoais.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aceito os&nbsp;
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="text-blue-600 hover:underline">
                    Termos de Uso
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Termos de Uso</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4 text-sm">
                    <h3 className="font-bold">1. Aceitação dos Termos</h3>
                    <p>
                      Ao acessar e usar o aplicativo "Know Your Fan" da FURIA Esports, você concorda em cumprir e estar
                      vinculado a estes Termos de Uso.
                    </p>
                    {/* Conteúdo completo dos termos de uso */}
                  </div>
                </DialogContent>
              </Dialog>
            </label>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="privacy"
            checked={acceptedPrivacy}
            onCheckedChange={(checked) => setAcceptedPrivacy(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="privacy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aceito a&nbsp;
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="text-blue-600 hover:underline">
                    Política de Privacidade
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Política de Privacidade</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4 text-sm">
                    <h3 className="font-bold">1. Coleta de Dados</h3>
                    <p>
                      A FURIA Esports coleta dados pessoais como nome, email, CPF, telefone, endereço e data de
                      nascimento para identificação e contato.
                    </p>
                    {/* Conteúdo completo da política de privacidade */}
                  </div>
                </DialogContent>
              </Dialog>
            </label>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="data-use"
            checked={acceptedDataUse}
            onCheckedChange={(checked) => setAcceptedDataUse(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="data-use"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Concordo com o uso dos meus dados para personaliza&ccedil;&atilde;o de experi&ecirc;ncias, ofertas e comunica&ccedil;&otilde;es da FURIA Esports
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#00a859] hover:bg-[#008a49] text-white"
          disabled={!acceptedTerms || !acceptedPrivacy || !acceptedDataUse}
        >
          Continuar
        </Button>
      </form>
    </div>
  )
}
