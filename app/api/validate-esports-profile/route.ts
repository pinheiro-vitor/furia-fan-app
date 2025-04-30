import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { platform, profileUrl } = await request.json()

    if (!platform || !profileUrl) {
      return NextResponse.json({ error: "Plataforma e URL do perfil são obrigatórios" }, { status: 400 })
    }

    // Simular um tempo de processamento
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Personalizar resposta com base na plataforma
    let relevanceScore, message

    // Simular diferentes níveis de relevância com base na plataforma
    switch (platform) {
      case "hltv":
        relevanceScore = Math.floor(Math.random() * 15) + 80 // 80-95
        message = "Perfil validado com sucesso! Alto engajamento com CS:GO detectado."
        break
      case "vlr":
        relevanceScore = Math.floor(Math.random() * 20) + 75 // 75-95
        message = "Perfil validado com sucesso! Forte presença na comunidade de Valorant."
        break
      case "tracker":
        relevanceScore = Math.floor(Math.random() * 25) + 70 // 70-95
        message = "Perfil validado com sucesso! Estatísticas relevantes encontradas."
        break
      default:
        relevanceScore = Math.floor(Math.random() * 30) + 60 // 60-90
        message = "Perfil validado com sucesso! Conteúdo relevante encontrado."
    }

    return NextResponse.json({
      success: true,
      message: message,
      relevanceScore: relevanceScore,
      platformData: {
        platform,
        profileUrl,
        lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Atividade nos últimos 30 dias
        gamesPlayed: Math.floor(Math.random() * 500) + 100,
      },
    })
  } catch (error) {
    console.error("Erro ao validar perfil de esports:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
