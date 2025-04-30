import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { platform, profileUrl, username } = await request.json()

    if (!platform || !profileUrl) {
      return NextResponse.json({ error: "Plataforma e URL do perfil são obrigatórios" }, { status: 400 })
    }

    // Simular um tempo de processamento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Gerar dados simulados baseados na plataforma
    const interactionCount = Math.floor(Math.random() * 20) + 5
    const sentiments = ["Positivo", "Neutro", "Muito Positivo"]
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

    // Personalizar dados com base na plataforma
    let topics, mainGame

    switch (platform) {
      case "twitter":
        topics = ["Campeonatos", "Jogadores", "Highlights"]
        mainGame = "CS:GO"
        break
      case "twitch":
        topics = ["Streams", "Eventos ao vivo", "Jogadas"]
        mainGame = "Valorant"
        break
      case "instagram":
        topics = ["Fotos de eventos", "Bastidores", "Lifestyle"]
        mainGame = "League of Legends"
        break
      default:
        topics = ["Campeonatos", "Jogadores", "Conteúdo geral"]
        mainGame = "CS:GO"
    }

    return NextResponse.json({
      success: true,
      analysis: {
        interactions: interactionCount,
        sentiment: sentiment,
        topics: topics,
        mainGame: mainGame,
        summary: `O perfil de ${username || "usuário"} na plataforma ${platform} demonstra engajamento com conteúdo da FURIA Esports, especialmente relacionado a ${mainGame}. O sentimento geral é ${sentiment.toLowerCase()}, com foco em ${topics.join(", ").toLowerCase()}.`,
      },
    })
  } catch (error) {
    console.error("Erro ao analisar perfil social:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
