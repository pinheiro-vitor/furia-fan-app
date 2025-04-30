// Serviço para análise de perfis sociais
export const SocialService = {
  // Analisar perfil social
  analyzeSocialProfile: async (platform: string, profileUrl: string, username: string) => {
    try {
      const response = await fetch("/api/analyze-social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform, profileUrl, username }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha na análise do perfil social")
      }

      return data
    } catch (error) {
      console.error("Erro na análise do perfil social:", error)
      throw error
    }
  },
}
