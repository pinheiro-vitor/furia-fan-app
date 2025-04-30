"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, X, Loader2, Camera, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface DocumentUploadProps {
  loading?: boolean;
  onComplete: (data: { idDocument: string | null; selfie: string | null }) => void;
}

export default function DocumentUpload({ onComplete }: DocumentUploadProps) {

  const [idPreview, setIdPreview] = useState<string | null>(null)
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null)
  const [idUploaded, setIdUploaded] = useState(false)
  const [selfieUploaded, setSelfieUploaded] = useState(false)

  const [validating, setValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo permitido é 5MB",
          variant: "destructive",
        })
        return
      }

      setIdPreview(URL.createObjectURL(file))
      setIdUploaded(true)
      setValidationResult(null)

      toast({
        title: "Documento enviado",
        description: "Documento de identidade enviado com sucesso",
      })
    }
  }

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo permitido é 5MB",
          variant: "destructive",
        })
        return
      }

      setSelfiePreview(URL.createObjectURL(file))
      setSelfieUploaded(true)
      setValidationResult(null)

      toast({
        title: "Selfie enviada",
        description: "Selfie enviada com sucesso",
      })
    }
  }

  // Função para capturar foto da webcam (simulada)
  const captureWebcam = (type: 'selfie' | 'id') => {
    // Em uma aplicação real, isso usaria a API MediaDevices
    // Aqui vamos simular com um timeout
    toast({
      title: "Câmera ativada",
      description: "Posicione seu rosto no centro da tela",
    })

    setTimeout(() => {
      // Simular captura de imagem
      const mockImageUrl =
        type === "selfie" ? "/placeholder.svg?height=300&width=300" : "/placeholder.svg?height=400&width=600"

      if (type === "selfie") {
        setSelfiePreview(mockImageUrl)
        setSelfieUploaded(true)
        setValidationResult(null)
      } else {
        setIdPreview(mockImageUrl)
        setIdUploaded(true)
        setValidationResult(null)
      }

      toast({
        title: "Foto capturada",
        description: type === "selfie" ? "Selfie capturada com sucesso" : "Documento capturado com sucesso",
      })
    }, 2000)
  }

  const validateDocuments = async () => {
    setValidating(true)

    // Simular validação de documentos
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simular um resultado positivo
    setValidationResult({
      success: true,
      message: "Documentos validados com sucesso! Identidade confirmada.",
    })

    setValidating(false)

    toast({
      title: "Validação concluída",
      description: "Seus documentos foram validados com sucesso!",
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Em uma aplicação real, enviaríamos os arquivos para o servidor
    // e processaríamos com IA para validação
    onComplete({
      idDocument: idPreview ? "uploaded" : null,
      selfie: selfiePreview ? "uploaded" : null,
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upload de Documentos</h2>
      <p className="text-gray-600 mb-6">
        Para garantir a segurança da sua conta e oferecer experiências exclusivas, precisamos validar sua identidade.
        Faça o upload de um documento com foto (RG ou CNH) e uma selfie.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Documento de Identidade (RG ou CNH)</label>
            <Card className={`p-4 border-dashed border-2 text-center ${idUploaded ? "border-green-500" : ""}`}>
              {!idPreview ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <FileText className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">
                    {isMobile ? "Tire uma foto ou faça upload" : "Clique para fazer upload ou arraste o arquivo"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input type="file" accept="image/*" className="hidden" id="id-upload" onChange={handleIdUpload} />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("id-upload")?.click()}
                    >
                      Selecionar Arquivo
                    </Button>
                    {isMobile && (
                      <Button type="button" variant="outline" onClick={() => captureWebcam("id")}>
                        <Camera className="h-4 w-4 mr-2" /> Usar Câmera
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={idPreview || "/placeholder.svg"}
                    alt="Documento de Identidade"
                    width={350}
                    height={220}
                    className="max-h-48 mx-auto rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => {
                      setIdPreview(null)
                      setIdUploaded(false)
                      setValidationResult(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="mt-2 text-sm text-green-600 flex items-center justify-center">
                    <Check className="h-4 w-4 mr-1" /> Documento enviado
                  </div>
                </div>
              )}
            </Card>
            <p className="text-xs text-gray-500 mt-1">Formatos aceitos: JPG, PNG, PDF. Tamanho máximo: 5MB</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Selfie (foto do seu rosto)</label>
            <Card className={`p-4 border-dashed border-2 text-center ${selfieUploaded ? "border-green-500" : ""}`}>
              {!selfiePreview ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <Camera className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">
                    {isMobile ? "Tire uma selfie ou faça upload" : "Clique para fazer upload ou arraste o arquivo"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="selfie-upload"
                      onChange={handleSelfieUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("selfie-upload")?.click()}
                    >
                      Selecionar Arquivo
                    </Button>
                    {isMobile && (
                      <Button type="button" variant="outline" onClick={() => captureWebcam("selfie")}>
                        <Camera className="h-4 w-4 mr-2" /> Usar Câmera
                      </Button>
                    )}
                </div>
              </div>
            ) : (
              <div className="relative">
                <Image
                  src={selfiePreview || "/placeholder.svg"}
                  alt="Selfie"
                  width={220}
                  height={220}
                  className="max-h-48 mx-auto rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => {
                    setSelfiePreview(null)
                    setSelfieUploaded(false)
                    setValidationResult(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="mt-2 text-sm text-green-600 flex items-center justify-center">
                  <Check className="h-4 w-4 mr-1" /> Selfie enviada
                </div>
              </div>
            )}
            </Card>
            <p className="text-xs text-gray-500 mt-1">Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB</p>
          </div>
        </div>

        {idUploaded && selfieUploaded && !validationResult && (
          <Button
            type="button"
            onClick={validateDocuments}
            disabled={validating}
            className="w-full bg-[#00a859] hover:bg-[#008a49] text-white"
          >
            {validating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Validando documentos...
              </>
            ) : (
              <>Validar Documentos com IA</>
            )}
          </Button>
        )}

        {validationResult && (
          <Alert className={validationResult.success ? "bg-green-50" : "bg-red-50"}>
            <AlertDescription className="flex items-center">
              {validationResult.success ? (
                <Check className="h-4 w-4 text-green-600 mr-2" />
              ) : (
                <X className="h-4 w-4 text-red-600 mr-2" />
              )}
              {validationResult.message}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={!validationResult?.success}
          className="w-full bg-[#00a859] hover:bg-[#008a49] text-white"
        >
          Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
