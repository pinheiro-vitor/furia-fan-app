"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, X, Loader2, ExternalLink, AlertCircle, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EsportsService } from "@/lib/esports-service"

interface EsportsProfilesProps {
  loading?: boolean;
  onComplete: (profiles: Record<string, string>) => void;
  initialData?: Record<string, string>;
}

interface Validation {
  isValid: boolean;
  isValidating: boolean;
  message?: string;
  url?: string;
  relevanceScore?: number;
  platformData?: {
    lastActive: string;
    gamesPlayed: number;
  };
}

interface ProfileFieldProps {
  name: string;
  label: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: Validation;
  onValidate: () => void;
  isMobile: boolean;
}

export default function EsportsProfiles({ onComplete, initialData }: EsportsProfilesProps) {
  const [profiles, setProfiles] = useState<Record<string, string>>({
    hltv: initialData?.hltv || "",
    strafe: initialData?.strafe || "",
    esportsEarnings: initialData?.esportsEarnings || "",
    faceit: initialData?.faceit || "",
    vlr: initialData?.vlr || "",
    tracker: initialData?.tracker || "",
  })

  const [validations, setValidations] = useState<Record<string, Validation>>({})
  const { toast } = useToast()
  const isMobile = useMobile()

  const handleChange = (platform: string, value: string) => {
    setProfiles((prev) => ({
      ...prev,
      [platform]: value,
    }))
  }

  const validateProfile = async (platform: string) => {
    if (!profiles[platform]) return

    setValidations((prev) => ({
      ...prev,
      [platform]: {
        url: profiles[platform],
        isValid: false,
        message: "Validando...",
        isValidating: true,
      },
    }))

    try {
      // Usar o serviço de validação de perfis de esports
      const result = await EsportsService.validateEsportsProfile(platform, profiles[platform])

      setValidations((prev) => ({
        ...prev,
        [platform]: {
          url: profiles[platform],
          isValid: true,
          message: result.message,
          isValidating: false,
          relevanceScore: result.relevanceScore,
          platformData: result.platformData,
        },
      }))

      toast({
        title: "Perfil validado",
        description: `Seu perfil de ${getPlatformName(platform)} foi validado com sucesso!`,
      })
    } catch (error) {
      console.error(`Erro ao validar perfil ${platform}:`, error)

      setValidations((prev) => ({
        ...prev,
        [platform]: {
          url: profiles[platform],
          isValid: false,
          message: "Não foi possível validar o perfil. Verifique a URL e tente novamente.",
          isValidating: false,
        },
      }))

      toast({
        title: "Erro na validação",
        description: `Não foi possível validar seu perfil de ${getPlatformName(platform)}. Tente novamente.`,
        variant: "destructive",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validatedProfiles = Object.entries(profiles)
      .filter(([key, value]) => value && validations[key]?.isValid)
      .reduce((acc: Record<string, string>, [key, value]) => {
        acc[key] = value
        return acc
      }, {} as Record<string, string>)

    onComplete(validatedProfiles)
  }

  const atLeastOneValidated = Object.values(validations).some((v) => v?.isValid)
  const validatedCount = Object.values(validations).filter((v) => v?.isValid).length

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "hltv":
        return "HLTV.org"
      case "strafe":
        return "Strafe.gg"
      case "esportsEarnings":
        return "Esports Earnings"
      case "faceit":
        return "FACEIT"
      case "vlr":
        return "VLR.gg"
      case "tracker":
        return "Tracker.gg"
      default:
        return platform
    }
  }

  const getPlatformDescription = (platform: string) => {
    switch (platform) {
      case "hltv":
        return "Estatísticas e notícias de CS:GO"
      case "strafe":
        return "Acompanhamento de partidas de esports"
      case "esportsEarnings":
        return "Ganhos e torneios de jogadores profissionais"
      case "faceit":
        return "Plataforma competitiva de CS:GO e outros jogos"
      case "vlr":
        return "Estatísticas e notícias de Valorant"
      case "tracker":
        return "Estatísticas de jogadores em diversos jogos"
      default:
        return ""
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Perfis de Esports</h2>
      <p className="text-gray-600 mb-6">
        Compartilhe seus perfis em plataformas de esports para que possamos validar seu envolvimento com a comunidade e
        oferecer experiências exclusivas.
      </p>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Progresso</h3>
            <p className="text-sm text-gray-600">
              {validatedCount} de {Object.keys(profiles).length} perfis validados
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">
              {Math.round((validatedCount / Object.keys(profiles).length) * 100)}%
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-[#00a859] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(validatedCount / Object.keys(profiles).length) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <ProfileField
            name="hltv"
            label="HLTV.org"
            description={getPlatformDescription("hltv")}
            placeholder="https://www.hltv.org/profile/..."
            value={profiles.hltv}
            onChange={(e) => handleChange("hltv", e.target.value)}
            validation={validations.hltv}
            onValidate={() => validateProfile("hltv")}
            isMobile={isMobile}
          />

          <ProfileField
            name="faceit"
            label="FACEIT"
            description={getPlatformDescription("faceit")}
            placeholder="https://www.faceit.com/en/players/..."
            value={profiles.faceit}
            onChange={(e) => handleChange("faceit", e.target.value)}
            validation={validations.faceit}
            onValidate={() => validateProfile("faceit")}
            isMobile={isMobile}
          />

          <ProfileField
            name="vlr"
            label="VLR.gg"
            description={getPlatformDescription("vlr")}
            placeholder="https://www.vlr.gg/player/..."
            value={profiles.vlr}
            onChange={(e) => handleChange("vlr", e.target.value)}
            validation={validations.vlr}
            onValidate={() => validateProfile("vlr")}
            isMobile={isMobile}
          />

          <ProfileField
            name="tracker"
            label="Tracker.gg"
            description={getPlatformDescription("tracker")}
            placeholder="https://tracker.gg/valorant/profile/..."
            value={profiles.tracker}
            onChange={(e) => handleChange("tracker", e.target.value)}
            validation={validations.tracker}
            onValidate={() => validateProfile("tracker")}
            isMobile={isMobile}
          />

          <ProfileField
            name="strafe"
            label="Strafe.gg"
            description={getPlatformDescription("strafe")}
            placeholder="https://strafe.gg/profile/..."
            value={profiles.strafe}
            onChange={(e) => handleChange("strafe", e.target.value)}
            validation={validations.strafe}
            onValidate={() => validateProfile("strafe")}
            isMobile={isMobile}
          />

          <ProfileField
            name="esportsEarnings"
            label="Esports Earnings"
            description={getPlatformDescription("esportsEarnings")}
            placeholder="https://www.esportsearnings.com/players/..."
            value={profiles.esportsEarnings}
            onChange={(e) => handleChange("esportsEarnings", e.target.value)}
            validation={validations.esportsEarnings}
            onValidate={() => validateProfile("esportsEarnings")}
            isMobile={isMobile}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800">Dica</h4>
              <p className="text-sm text-blue-700">
                Não é necessário validar todos os perfis. Valide apenas os que você utiliza ativamente. Quanto mais
                perfis validados, mais personalizada será sua experiência.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!atLeastOneValidated}
          className="w-full bg-[#00a859] hover:bg-[#008a49] text-white"
        >
          Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        {!atLeastOneValidated && (
          <p className="text-sm text-center mt-2 text-amber-600">Valide pelo menos um perfil para continuar.</p>
        )}
      </form>
    </div>
  )
}

interface ProfileFieldProps {
  name: string;
  label: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: Validation;
  onValidate: () => void;
  isMobile: boolean;
}

function ProfileField({ name, label, description, placeholder, value, onChange, validation, onValidate, isMobile }: ProfileFieldProps) {
  return (
    <div className="space-y-2 p-4 border rounded-lg hover:border-[#00a859] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor={name} className="block text-sm font-medium">
            {label}
          </label>
          {!isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {validation?.isValid && (
          <div className="flex items-center text-green-600 text-sm">
            <Check className="h-4 w-4 mr-1" /> Validado
          </div>
        )}
      </div>

      {isMobile && <p className="text-xs text-gray-500">{description}</p>}

      <div className="flex space-x-2">
        <Input id={name} placeholder={placeholder} value={value} onChange={onChange} />
        <Button
          type="button"
          variant="outline"
          disabled={!value || validation?.isValidating}
          onClick={onValidate}
          className={validation?.isValid ? "bg-green-50" : ""}
        >
          {validation?.isValidating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : validation?.isValid ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            "Validar"
          )}
        </Button>
      </div>

      {validation && (
        <div className="mt-2">
          {validation.isValid ? (
            <div>
              <div className="text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> {validation.message}
              </div>
              {validation.relevanceScore && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1">Relevância para FURIA Esports:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#00a859] h-2 rounded-full"
                      style={{ width: `${validation.relevanceScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Baixa</span>
                    <span>Alta</span>
                  </div>
                </div>
              )}
              {validation.platformData && (
                <div className="mt-2 text-xs text-gray-600">
                  <p>Última atividade: {new Date(validation.platformData.lastActive).toLocaleDateString()}</p>
                  <p>Partidas jogadas: {validation.platformData.gamesPlayed}</p>
                </div>
              )}
              <a
                href={validation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 flex items-center mt-1 hover:underline"
              >
                Ver perfil <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          ) : !validation.isValidating && validation.message ? (
            <div className="text-sm text-red-600 flex items-center">
              <X className="h-4 w-4 mr-1" /> {validation.message}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
