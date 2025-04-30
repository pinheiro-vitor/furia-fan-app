// Serviço de autenticação para o frontend
import { storage } from "./storage"

export const AuthService = {
  // Login com email e senha
  login: async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha na autenticação")
      }

      // Armazenar usuário no localStorage para persistência
      storage.setItem("currentUser", data.user)

      return data
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    }
  },

  // Logout
  logout: async () => {
    try {
      await fetch("/api/auth", {
        method: "DELETE",
      })

      // Limpar usuário do localStorage
      storage.removeItem("currentUser")

      return { success: true }
    } catch (error) {
      console.error("Erro no logout:", error)
      throw error
    }
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: () => {
    const user = storage.getItem("currentUser")
    return !!user
  },

  // Obter usuário atual
  getCurrentUser: () => {
    return storage.getItem("currentUser")
  },

  // Conectar com provedor OAuth
  connectWithProvider: async (provider: string) => {
    try {
      // Em uma implementação real, você redirecionaria para a página de autorização
      // Aqui, estamos simulando o processo para fins de demonstração

      const response = await fetch(`/api/auth/${provider}?redirect=${encodeURIComponent(window.location.origin)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Falha na conexão com ${provider}`)
      }

      // Simular o processo OAuth
      // Em uma implementação real, o usuário seria redirecionado para o provedor
      console.log(`Simulando conexão OAuth com ${provider}...`)

      // Simular um atraso para o processo de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular dados do usuário retornados pelo provedor
      const userData = {
        id: `${provider}_user_${Date.now()}`,
        provider,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        username: `${provider}_user_${Math.floor(Math.random() * 10000)}`,
        profileUrl: `https://${provider}.com/user_${Date.now()}`,
      }

      // Armazenar dados do provedor
      const connectedProviders = storage.getItem("connectedProviders") || {}
      connectedProviders[provider] = userData
      storage.setItem("connectedProviders", connectedProviders)

      return { success: true, userData }
    } catch (error) {
      console.error(`Erro na conexão com ${provider}:`, error)
      throw error
    }
  },

  // Obter provedores conectados
  getConnectedProviders: () => {
    return storage.getItem("connectedProviders") || {}
  },
}
