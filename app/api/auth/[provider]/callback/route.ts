import { NextResponse } from "next/server"
import { cookies } from "next/headers"

interface UserData {
  id: string;
  provider: string;
  name: string;
  email: string;
  profileUrl: string;
  providerData: any;
}

// Esta API simula o callback OAuth de diferentes provedores
export async function GET(request: Request, { params }: { params: { provider: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const provider = params.provider

    // Em uma implementação real, você trocaria o código por um token de acesso
    // e usaria esse token para obter informações do usuário

    // Simular um usuário autenticado
    const userData: UserData = {
  id: `${provider}_user_${Date.now()}`,
  provider,
  name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
  email: `user_${Date.now()}@${provider}.example.com`,
  profileUrl: `https://${provider}.com/user_${Date.now()}`,
  providerData: getProviderSpecificData(provider),
};

    // Definir cookie de autenticação social
    (await cookies()).set(`${provider}_auth`, JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    })

    // Redirecionar para a página de registro com os dados do usuário
    // Em uma implementação real, você redirecionaria para uma página específica
    return NextResponse.redirect(new URL("/register?social_auth=success", request.url))
  } catch (error) {
    console.error(`Erro no callback ${params.provider}:`, error)
    return NextResponse.redirect(new URL("/register?social_auth=error", request.url))
  }
}

// Função auxiliar para gerar dados específicos por provedor
function getProviderSpecificData(provider: string) {
  switch (provider) {
    case "twitter":
      return {
        username: `twitter_user_${Date.now()}`,
        followers: Math.floor(Math.random() * 1000) + 50,
        following: Math.floor(Math.random() * 500) + 20,
        tweets: Math.floor(Math.random() * 2000) + 100,
      }
    case "discord":
      return {
        username: `discord_user_${Date.now()}`,
        discriminator: `#${Math.floor(Math.random() * 9999)
          .toString()
          .padStart(4, "0")}`,
        servers: Math.floor(Math.random() * 20) + 3,
      }
    case "twitch":
      return {
        username: `twitch_user_${Date.now()}`,
        followers: Math.floor(Math.random() * 500) + 10,
        subscriptions: Math.floor(Math.random() * 10),
        isPartner: Math.random() > 0.8,
      }
    default:
      return {
        username: `${provider}_user_${Date.now()}`,
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      }
  }
}
