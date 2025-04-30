// Serviço para validação de perfis de esports
export const EsportsService = {
  // Validar perfil de esports
  validateEsportsProfile: async (platform: string, profileUrl: string) => {
    try {
      const response = await fetch("/api/validate-esports-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform, profileUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha na validação do perfil de esports")
      }

      return data
    } catch (error) {
      console.error("Erro na validação do perfil de esports:", error)
      throw error
    }
  },
}
