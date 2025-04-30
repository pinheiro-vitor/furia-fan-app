"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, HelpCircle } from "lucide-react"
import BasicInfoForm from "@/components/register/basic-info-form"
import DocumentUpload from "@/components/register/document-upload"
import SocialConnect from "@/components/register/social-connect"
import EsportsProfiles from "@/components/register/esports-profiles"
import RegistrationComplete from "@/components/register/registration-complete"
import { useToastSuccess } from "@/hooks/use-toast-success"
import { useToastError } from "@/hooks/use-toast-error"
import { storage } from "@/lib/storage"
import * as z from "zod"
import { formSchema } from "@/components/register/basic-info-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { completeRegistration } from "@/app/actions/user"

type BasicInfo = z.infer<typeof formSchema>;
interface Documents {
  idDocument?: string | null;
  selfie?: string | null;
  validated?: boolean;
  [key: string]: unknown;
}
interface SocialProfile {
  platform: string;
  connected: boolean;
  [key: string]: any;
}
interface EsportsProfiles {
  [key: string]: any;
}
interface UserData {
  basicInfo?: BasicInfo;
  documents?: Documents;
  socialProfiles?: SocialProfile[];
  esportsProfiles?: EsportsProfiles;
}

export default function RegisterPage() {
  const steps = [
    { id: "basic-info", label: "Informações Básicas", description: "Dados pessoais e preferências" },
    { id: "documents", label: "Documentos", description: "Validação de identidade" },
    { id: "social", label: "Redes Sociais", description: "Conexão com plataformas sociais" },
    { id: "esports", label: "Perfis de Esports", description: "Perfis em plataformas de jogos" },
    { id: "complete", label: "Concluído", description: "Revisão e finalização" },
  ];
  const [userData, setUserData] = useState<UserData>({
    basicInfo: undefined,
    documents: undefined,
    socialProfiles: undefined,
    esportsProfiles: undefined,
  });
  const [activeStep, setActiveStep] = useState("basic-info");
  const [progress, setProgress] = useState(20);
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toastSuccess = useToastSuccess()
  const toastError = useToastError()

  useEffect(() => {
    const currentUser = storage.getItem("currentUser")
    if (currentUser) {
      router.push("/dashboard")
    }
  }, [router])

  const handleBasicInfoComplete = async (data: BasicInfo) => {
    setLoading(true)
    try {
      setUserData((prev: UserData) => ({ ...prev, basicInfo: data }))
      setActiveStep("documents")
      setProgress(40)
      toastSuccess("Seus dados foram salvos com sucesso!")
    } catch (error: unknown) {
      console.error("Erro ao processar informações básicas:", error)
      toastError((error as Error).message || "Ocorreu um erro ao salvar seus dados")
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentsComplete = async (data: Documents) => {
    setLoading(true)
    try {
      setUserData((prev: UserData) => ({ ...prev, documents: data }))
      setActiveStep("social")
      setProgress(60)
      toastSuccess("Seus documentos foram salvos com sucesso!")
    } catch (error: unknown) {
      console.error("Erro ao processar documentos:", error)
      toastError((error as Error).message || "Ocorreu um erro ao salvar seus documentos")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialComplete = async (data: SocialProfile[]) => {
    setLoading(true)
    try {
      setUserData((prev: UserData) => ({ ...prev, socialProfiles: data }))
      setActiveStep("esports")
      setProgress(80)
      toastSuccess("Seus perfis sociais foram salvos com sucesso!")
    } catch (error: unknown) {
      console.error("Erro ao processar perfis sociais:", error)
      toastError((error as Error).message || "Ocorreu um erro ao salvar seus perfis sociais")
    } finally {
      setLoading(false)
    }
  }

  const handleEsportsComplete = async (data: EsportsProfiles) => {
    setLoading(true)
    try {
      setUserData((prev: UserData) => ({ ...prev, esportsProfiles: data }))
      setActiveStep("complete")
      setProgress(100)
      toastSuccess("Seus perfis de esports foram salvos com sucesso!")
    } catch (error: unknown) {
      console.error("Erro ao processar perfis de esports:", error)
      toastError((error as Error).message || "Ocorreu um erro ao salvar seus perfis de esports")
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = async () => {
    setLoading(true)
    try {
      const result = await completeRegistration(userData.basicInfo?.email ?? '')
      if (!result.success) {
        throw new Error(result.error || "Erro ao finalizar cadastro")
      }
      toastSuccess("Seu cadastro foi concluído com sucesso! Verifique seu email para mais informações.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro ao finalizar cadastro:", error)
      toastError((error as Error).message || "Ocorreu um erro ao finalizar seu cadastro")
    } finally {
      setLoading(false)
    }
  }

  const handlePrevStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep)
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1].id
      setActiveStep(prevStep)
      setProgress(currentIndex * 20)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Cadastro de Fã FURIA</h1>
            <p className="text-gray-600 mb-6">Complete seu perfil para ter acesso a experiências exclusivas</p>
            <Progress value={progress} className="h-2 w-full bg-gray-200" />

            <div className="flex justify-between mt-2 text-sm text-gray-500">
              {steps.map((step: typeof steps[number], index: number) => (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    steps.findIndex((s) => s.id === activeStep) >= index ? "text-[#00a859] font-medium" : ""
                  }`}
                >
                  {steps.findIndex((s) => s.id === activeStep) > index && <Check className="h-4 w-4 mr-1" />}
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{index + 1}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-500 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" /> Ajuda com o cadastro
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sobre o processo de cadastro</DialogTitle>
                    <DialogDescription>O cadastro é dividido em 5 etapas simples:</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {steps.map((step: typeof steps[number], index: number) => (
                      <div key={step.id} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00a859] text-white flex items-center justify-center mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{step.label}</h4>
                          <p className="text-sm text-gray-500">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs value={activeStep} className="w-full">
                <TabsContent value="basic-info">
                  <BasicInfoForm
                    onComplete={handleBasicInfoComplete}
                    initialData={userData.basicInfo}
                    loading={loading}
                  />
                </TabsContent>

                <TabsContent value="documents">
                  <DocumentUpload
                    onComplete={handleDocumentsComplete}
                    loading={loading}
                  />
                </TabsContent>

                <TabsContent value="social">
                  <SocialConnect
                    onComplete={handleSocialComplete}
                    initialData={userData.socialProfiles}
                    loading={loading}
                  />
                </TabsContent>

                <TabsContent value="esports">
                  <EsportsProfiles
                    onComplete={handleEsportsComplete}
                    initialData={userData.esportsProfiles}
                    loading={loading}
                  />
                </TabsContent>

                <TabsContent value="complete">
                  <RegistrationComplete userData={userData} onFinish={handleFinish} />
                </TabsContent>
              </Tabs>

              {activeStep !== "basic-info" && activeStep !== "complete" && (
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep} className="flex items-center" disabled={loading}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
