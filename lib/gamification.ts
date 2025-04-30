import { prisma } from "@/lib/db"

// Pontos por ação
const POINTS = {
  REGISTER_COMPLETE: 100,
  DOCUMENT_VALIDATED: 50,
  SOCIAL_CONNECTED: 20,
  SOCIAL_ANALYZED: 30,
  ESPORTS_PROFILE_VALIDATED: 25,
  ATTEND_EVENT: 100,
  PURCHASE_PRODUCT: 50,
  SHARE_CONTENT: 10,
  REFER_FRIEND: 75,
}

// Níveis de fã
const FAN_LEVELS = [
  { name: "Fã Bronze", minPoints: 0, maxPoints: 199 },
  { name: "Fã Prata", minPoints: 200, maxPoints: 499 },
  { name: "Fã Ouro", minPoints: 500, maxPoints: 999 },
  { name: "Fã Platina", minPoints: 1000, maxPoints: 1999 },
  { name: "Fã Diamante", minPoints: 2000, maxPoints: Number.POSITIVE_INFINITY },
]

// Adicionar pontos a um usuário
export async function addPoints(userId: string, action: keyof typeof POINTS, quantity = 1) {
  try {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { points: true },
    }) as { points: { points: number }[] } | null

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    const pointsToAdd = POINTS[action] * quantity

    // Adicionar pontos
    await prisma.userPoints.create({
      data: {
        userId,
        action,
        points: pointsToAdd,
        description: `Pontos por ${action.toLowerCase().replace(/_/g, " ")}`,
      },
    })

    // Atualizar total de pontos
    const totalPoints = user.points.reduce((sum: number, p: { points: number }) => sum + p.points, 0) + pointsToAdd

    // Verificar se o usuário subiu de nível
    const currentLevel = getFanLevel(totalPoints - pointsToAdd)
    const newLevel = getFanLevel(totalPoints)

    if (currentLevel.name !== newLevel.name) {
      // Usuário subiu de nível
      await prisma.userAchievement.create({
        data: {
          userId,
          type: "LEVEL_UP",
          title: `Novo Nível: ${newLevel.name}`,
          description: `Parabéns! Você alcançou o nível ${newLevel.name}!`,
        },
      })
    }

    return { success: true, pointsAdded: pointsToAdd, totalPoints, newLevel }
  } catch (error) {
    console.error("Erro ao adicionar pontos:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Obter nível do fã com base nos pontos
export function getFanLevel(points: number) {
  return FAN_LEVELS.find((level) => points >= level.minPoints && points <= level.maxPoints) || FAN_LEVELS[0]
}

// Obter conquistas do usuário
export async function getUserAchievements(userId: string) {
  try {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }) as any[]

    return { success: true, achievements }
  } catch (error) {
    console.error("Erro ao obter conquistas:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Obter histórico de pontos do usuário
export async function getUserPointsHistory(userId: string) {
  try {
    const pointsHistory = await prisma.userPoints.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }) as { points: number }[]

    const totalPoints = pointsHistory.reduce((sum: number, p: { points: number }) => sum + p.points, 0)
    const fanLevel = getFanLevel(totalPoints)

    return { success: true, pointsHistory, totalPoints, fanLevel }
  } catch (error) {
    console.error("Erro ao obter histórico de pontos:", error)
    return { success: false, error: (error as Error).message }
  }
}
