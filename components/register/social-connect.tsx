"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Twitter, Check, Loader2, AlertCircle } from "lucide-react"
import { FaSteam, FaDiscord, FaTwitch, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

type SocialProfile = {
  platform: string
  connected: boolean
  username?: string
  profileUrl?: string
  analyzed?: boolean
  analysisData?: {
    interactions?: number;
    sentiment?: string;
    mainGame?: string;
    topics?: string[];
  };
}

interface SocialConnectProps {
  loading?: boolean;
  onComplete: (profiles: SocialProfile[]) => void;
  initialData?: SocialProfile[];
}

export default function SocialConnect({ onComplete, initialData }: SocialConnectProps) {
  const [socialProfiles, setSocialProfiles] = useState<SocialProfile[]>(
    initialData || [
      { platform: "twitter", connected: false },
      { platform: "steam", connected: false },
      { platform: "discord", connected: false },
      { platform: "twitch", connected: false },
      { platform: "youtube", connected: false },
      { platform: "instagram", connected: false },
      { platform: "tiktok", connected: false },
    ],
  )

  const [analyzing, setAnalyzing] = useState<string | null>(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  const connectSocial = async (platform: string) => {
    try {
      // Simular conexão OAuth
      toast({
        title: "Conectando...",
        description: `Conectando com ${getPlatformName(platform)}...`,
      })

      // Simular um atraso para o processo de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Atualizar o estado com os dados do usuário simulados
      const newProfiles = socialProfiles.map((profile) => {
        if (profile.platform === platform) {
          return {
            ...profile,
            connected: true,
            username: getDefaultUsername(platform),
            profileUrl: getDefaultProfileUrl(platform),
          }
        }
        return profile
      })

      setSocialProfiles(newProfiles)

      toast({
        title: "Conta conectada",
        description: `Sua conta de ${getPlatformName(platform)} foi conectada com sucesso!`,
      })
    } catch (error) {
      console.error(`Erro ao conectar com ${platform}:`, error)
      toast({
        title: "Erro na conexão",
        description: `Não foi possível conectar sua conta de ${getPlatformName(platform)}. Tente novamente.`,
        variant: "destructive",
      })
    }
  }

  const getDefaultUsername = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "@furia_fan123"
      case "steam":
        return "FURIA_Player"
      case "discord":
        return "FuriaFan#1234"
      case "twitch":
        return "furia_fan_tv"
      case "youtube":
        return "FuriaFanChannel"
      case "instagram":
        return "@furia_fan_oficial"
      case "tiktok":
        return "@furia_fan_tiktok"
      default:
        return "username"
    }
  }

  const getDefaultProfileUrl = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "https://twitter.com/furia_fan123"
      case "steam":
        return "https://steamcommunity.com/id/furia_player"
      case "discord":
        return "https://discord.com/users/123456789"
      case "twitch":
        return "https://twitch.tv/furia_fan_tv"
      case "youtube":
        return "https://youtube.com/c/FuriaFanChannel"
      case "instagram":
        return "https://instagram.com/furia_fan_oficial"
      case "tiktok":
        return "https://tiktok.com/@furia_fan_tiktok"
      default:
        return "#"
    }
  }

  const analyzeSocialProfile = async (platform: string) => {
    setAnalyzing(platform)

    try {
      // Simular análise de IA
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Gerar dados simulados baseados na plataforma
      const interactionCount = Math.floor(Math.random() * 20) + 5
      const sentiments = ["Positivo", "Neutro", "Muito Positivo"]
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
      const games = ["CS:GO", "Valorant", "League of Legends", "Rainbow Six"]
      const mainGame = games[Math.floor(Math.random() * games.length)]
      const topics = ["Campeonatos", "Jogadores", "Highlights"]

      // Atualizar o estado com os dados da análise
      const newProfiles = socialProfiles.map((p) => {
        if (p.platform === platform) {
          return {
            ...p,
            analyzed: true,
            analysisData: {
              interactions: interactionCount,
              sentiment: sentiment,
              mainGame: mainGame,
              topics: topics,
            },
          }
        }
        return p
      })

      setSocialProfiles(newProfiles)

      // Verificar se todos os perfis conectados foram analisados
      const allAnalyzed = newProfiles.filter((p) => p.connected).every((p) => p.analyzed)

      if (allAnalyzed && newProfiles.some((p) => p.connected)) {
        setAnalysisComplete(true)
      }

      toast({
        title: "Análise concluída",
        description: `Seu perfil de ${getPlatformName(platform)} foi analisado com sucesso!`,
      })
    } catch (error) {
      console.error(`Erro ao analisar perfil ${platform}:`, error)
      toast({
        title: "Erro na análise",
        description: `Não foi possível analisar seu perfil de ${getPlatformName(platform)}. Tente novamente.`,
        variant: "destructive",
      })
    } finally {
      setAnalyzing(null)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onComplete(socialProfiles)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "steam":
        return <FaSteam className="h-5 w-5" />
      case "discord":
        return <FaDiscord className="h-5 w-5" />
      case "twitch":
        return <FaTwitch className="h-5 w-5" />
      case "youtube":
        return <FaYoutube className="h-5 w-5" />
      case "instagram":
        return <FaInstagram className="h-5 w-5" />
      case "tiktok":
        return <FaTiktok className="h-5 w-5" />
      default:
        return null
    }
  }

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "Twitter"
      case "steam":
        return "Steam"
      case "discord":
        return "Discord"
      case "twitch":
        return "Twitch"
      case "youtube":
        return "YouTube"
      case "instagram":
        return "Instagram"
      case "tiktok":
        return "TikTok"
      default:
        return platform
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "bg-blue-500"
      case "steam":
        return "bg-gray-800"
      case "discord":
        return "bg-indigo-600"
      case "twitch":
        return "bg-purple-600"
      case "youtube":
        return "bg-red-600"
      case "instagram":
        return "bg-pink-600"
      case "tiktok":
        return "bg-black"
      default:
        return "bg-gray-500"
    }
  }

  const atLeastOneConnected = socialProfiles.some((profile) => profile.connected)
  const connectedCount = socialProfiles.filter((profile) => profile.connected).length

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Conectar Redes Sociais</h2>
      <p className="text-gray-600 mb-6">
        Conecte suas redes sociais para que possamos analisar seu engajamento com a FURIA e oferecer experiências
        personalizadas. Isso é opcional, mas recomendado.
      </p>

      <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800">Dica</h4>
            <p className="text-sm text-blue-700">
              Quanto mais redes sociais você conectar, mais personalizada será sua experiência. Conectar pelo menos 3
              redes sociais desbloqueia benefícios exclusivos!
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Progresso</h3>
            <p className="text-sm text-gray-600">
              {connectedCount} de {socialProfiles.length} redes conectadas
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">{Math.round((connectedCount / socialProfiles.length) * 100)}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-[#00a859] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(connectedCount / socialProfiles.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2"} gap-4 mb-6`}>
          {socialProfiles.map((profile: SocialProfile) => (
            <Card key={profile.platform} className={`overflow-hidden ${profile.connected ? "border-[#00a859]" : ""}`}>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full text-white ${getPlatformColor(profile.platform)}`}>
                      {getPlatformIcon(profile.platform)}
                    </div>
                    <div>
                      <h3 className="font-medium">{getPlatformName(profile.platform)}</h3>
                      {profile.connected && <p className="text-sm text-gray-500">{profile.username}</p>}
                    </div>
                  </div>

                  <div>
                    {!profile.connected ? (
                      <Button variant="outline" onClick={() => connectSocial(profile.platform)} type="button">
                        Conectar
                      </Button>
                    ) : !profile.analyzed ? (
                      <Button
                        variant="outline"
                        className="bg-[#00a859] text-white hover:bg-[#008a49]"
                        onClick={() => analyzeSocialProfile(profile.platform)}
                        disabled={analyzing === profile.platform}
                        type="button"
                      >
                        {analyzing === profile.platform ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analisando...
                          </>
                        ) : (
                          "Analisar Perfil"
                        )}
                      </Button>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-1" /> Analisado
                      </div>
                    )}
                  </div>
                </div>

                {profile.connected && profile.analyzed && profile.analysisData && (
                  <div className="bg-gray-50 p-4 border-t">
                    <h4 className="font-medium text-sm mb-2">Resultados da Análise:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {profile.analysisData.interactions} interações com conteúdo da FURIA</li>
                      <li>• Sentimento: {profile.analysisData.sentiment}</li>
                      <li>• Interesse principal: {profile.analysisData.mainGame}</li>
                      <li>• Tópicos: {(profile.analysisData?.topics ?? []).map((topic, i) => (
                        <span key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-2 mb-2 inline-block">
                          {topic}
                        </span>
                      ))}</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#00a859] hover:bg-[#008a49] text-white"
          disabled={!atLeastOneConnected || !analysisComplete}
        >
          {atLeastOneConnected ? (
            <>
              Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Conecte pelo menos uma rede social"
          )}
        </Button>

        {atLeastOneConnected && !analysisComplete && (
          <p className="text-sm text-center mt-2 text-amber-600">
            Por favor, analise todos os perfis conectados antes de continuar.
          </p>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          Não publicaremos nada em suas redes sociais sem sua permissão explícita. Seus dados serão usados apenas para
          personalizar sua experiência como fã da FURIA.
        </p>
      </form>
    </div>
  )
}
