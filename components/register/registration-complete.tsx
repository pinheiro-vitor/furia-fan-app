"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Trophy, Calendar, ShoppingBag, Users } from "lucide-react"

interface SocialProfile {
  connected: boolean;
  [key: string]: any;
}

interface EsportsProfiles {
  [key: string]: string;
}

interface Documents {
  validated?: boolean;
  [key: string]: unknown;
}

interface BasicInfo {
  interests?: string[];
  events?: string;
  purchases?: string;
  [key: string]: any;
}

interface UserData {
  basicInfo?: Record<string, unknown>;
  documents?: { validated?: boolean };
  socialProfiles?: Array<{ connected: boolean }>;
  esportsProfiles?: Record<string, unknown>;
}

interface RegistrationCompleteProps {
  userData: UserData;
  onFinish: () => void;
}

export default function RegistrationComplete({ userData, onFinish }: RegistrationCompleteProps) {
  const calculateCompletionPercentage = (): number => {
    let total = 0;
    let completed = 0;

    // Basic info
    if (userData.basicInfo) {
      total += 25;
      completed += 25;
    }

    // Documents
    if (userData.documents) {
      total += 25;
      if (userData.documents.validated) {
        completed += 25;
      }
    }

    // Social profiles
    if (userData.socialProfiles) {
      total += 25;
      const connectedProfiles = userData.socialProfiles.filter((p: { connected: boolean }) => p.connected);
      if (connectedProfiles.length > 0) {
        completed += 25;
      }
    }

    // Esports profiles
    if (userData.esportsProfiles) {
      total += 25;
      const filledProfiles = Array.isArray(userData.esportsProfiles)
  ? userData.esportsProfiles.map((profile) => profile)
  : Object.values(userData.esportsProfiles || {}).map((profile) => profile);
      if (filledProfiles.length > 0) {
        completed += 25;
      }
    }

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }

  const completionPercentage = calculateCompletionPercentage();

  const getFanLevel = (percentage: number): string => {
    if (percentage >= 90) return "Fã Platina";
    if (percentage >= 70) return "Fã Ouro";
    if (percentage >= 50) return "Fã Prata";
    return "Fã Bronze";
    if (percentage >= 50) return "Fã Prata"
  }

  const fanLevel = getFanLevel(completionPercentage)

  const getRecommendations = (): string[] => {
    const interests = Array.isArray(userData.basicInfo?.interests) ? userData.basicInfo?.interests : [];

    if (interests.includes("csgo")) {
      return [
        "Acesso antecipado aos ingressos do Major de CS:GO",
        "Meet & Greet com os jogadores de CS:GO da FURIA",
        "Desconto de 15% na nova camisa oficial do time de CS:GO",
      ]
    } else if (interests.includes("valorant")) {
      return [
        "Convite para assistir treinos do time de Valorant",
        "Sessão de coaching com um jogador profissional de Valorant",
        "Acesso ao Discord exclusivo dos fãs de Valorant da FURIA",
      ]
    } else {
      return [
        "Desconto de 10% na loja oficial da FURIA",
        "Acesso a conteúdos exclusivos no canal de membros",
        "Convites para eventos especiais da FURIA",
      ]
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Cadastro Concluído!</h2>
        <p className="text-gray-600">
          Obrigado por compartilhar suas informações. Agora podemos oferecer experiências personalizadas baseadas no seu
          perfil de fã.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Seu Perfil de Fã</h3>
            <div className="bg-[#00a859] text-white px-3 py-1 rounded-full text-sm font-medium">{fanLevel}</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Perfil completo</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#00a859] h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Trophy className="h-5 w-5 text-[#00a859]" />
              </div>
              <div>
                <h4 className="font-medium">Interesses</h4>
                <p className="text-sm text-gray-600">
                  {Array.isArray(userData.basicInfo?.interests)
                      ? userData.basicInfo.interests.map((i: string) => i.toUpperCase()).join(", ")
                      : "Não informado"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-[#00a859]" />
              </div>
              <div>
                <h4 className="font-medium">Eventos</h4>
                <p className="text-sm text-gray-600">
                  {userData.basicInfo?.events ? "Participou de eventos" : "Nenhum evento informado"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <ShoppingBag className="h-5 w-5 text-[#00a859]" />
              </div>
              <div>
                <h4 className="font-medium">Compras</h4>
                <p className="text-sm text-gray-600">
                  {userData.basicInfo?.purchases ? "Comprou produtos FURIA" : "Nenhuma compra informada"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-[#00a859]" />
              </div>
              <div>
                <h4 className="font-medium">Redes Sociais</h4>
                <p className="text-sm text-gray-600">
                  {userData.socialProfiles?.filter((p: SocialProfile) => p.connected).length || 0} conectadas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recomendações Personalizadas</h3>
          <ul className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-[#00a859] mr-2 flex-shrink-0 mt-0.5" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button onClick={onFinish} className="w-full bg-[#00a859] hover:bg-[#008a49] text-white">
        Ir para o Dashboard
      </Button>
    </div>
  )
}
