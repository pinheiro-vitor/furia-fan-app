// Simulação de banco de dados usando localStorage
export const storage = {
  // Salvar dados
  setItem: <T = unknown>(key: string, value: T): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },

  // Obter dados
  getItem: <T = unknown>(key: string): T | null => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }
    return null
  },

  // Remover dados
  removeItem: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key)
    }
  },

  // Limpar todos os dados
  clear: (): void => {
    if (typeof window !== "undefined") {
      localStorage.clear()
    }
  },
}

// Funções auxiliares para manipulação de dados específicos
export const userStorage = {
  // Salvar usuário
  saveUser: (userData: Record<string, unknown>): string => {
    const users = Array.isArray(storage.getItem("users")) ? storage.getItem<Record<string, unknown>[]>("users")! : [];
    const userId = `user_${Date.now()}`

    const newUser = {
      id: userId,
      ...userData,
      createdAt: new Date().toISOString(),
    }

    if (Array.isArray(users)) {
      users.push(newUser)
      storage.setItem("users", users)
    }
    storage.setItem("users", users)

    return userId
  },

  // Obter usuário por ID
  getUserById: (userId: string): Record<string, unknown> | undefined => {
    const users = Array.isArray(storage.getItem("users")) ? storage.getItem<Record<string, unknown>[]>("users")! : [];
    return users.find((user) => typeof user === "object" && user !== null && "id" in user && user.id === userId) as Record<string, unknown> | undefined;
  },

  // Obter usuário por email
  getUserByEmail: (email: string): Record<string, unknown> | undefined => {
    const users = Array.isArray(storage.getItem("users")) ? storage.getItem<Record<string, unknown>[]>("users")! : [];
    return users.find((user) => typeof user === "object" && user !== null && "email" in user && user.email === email) as Record<string, unknown> | undefined;
  },

  // Atualizar usuário
  updateUser: (userId: string, userData: Record<string, unknown>): boolean => {
    const users = Array.isArray(storage.getItem("users")) ? storage.getItem<Record<string, unknown>[]>("users")! : [];
    const userIndex = users.findIndex((user) => typeof user === "object" && user !== null && "id" in user && user.id === userId);

    if (userIndex === -1) return false

    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    }

    storage.setItem("users", users)
    return true
  },
}

// Funções para documentos
export const documentStorage = {
  saveDocuments: (userId: string, documents: Record<string, string | boolean>): boolean => {
    const allDocuments = Array.isArray(storage.getItem("documents")) ? storage.getItem<Record<string, unknown>[]>("documents")! : [];

    const newDocuments = Object.entries(documents).map(([type, url]) => ({
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      userId,
      type,
      url,
      validated: documents.validated || false,
      createdAt: new Date().toISOString(),
    }))

    storage.setItem("documents", [...allDocuments, ...newDocuments])
    return true
  },

  getDocumentsByUserId: (userId: string): Record<string, unknown>[] => {
    const documents = Array.isArray(storage.getItem("documents")) ? storage.getItem<Record<string, unknown>[]>("documents")! : [];
    return Array.isArray(documents) ? documents.filter((doc) => typeof doc === "object" && doc !== null && "userId" in doc && doc.userId === userId) : [];
  },
}

// Funções para perfis sociais
export const socialProfileStorage = {
  saveSocialProfiles: (userId: string, profiles: Record<string, unknown>[]): boolean => {
    const allProfiles = Array.isArray(storage.getItem("socialProfiles")) ? storage.getItem<Record<string, unknown>[]>("socialProfiles")! : [];

    const connectedProfiles = profiles
      .filter((profile) => typeof profile === "object" && profile !== null && "connected" in profile && profile.connected)
      .map((profile) => ({
        id: `social_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userId,
        platform: profile.platform,
        username: profile.username || "",
        profileUrl: profile.profileUrl || "",
        analyzed: profile.analyzed || false,
        createdAt: new Date().toISOString(),
      }))

    storage.setItem("socialProfiles", [...allProfiles, ...connectedProfiles])
    return true
  },

  getProfilesByUserId: (userId: string): Record<string, unknown>[] => {
    const profiles = Array.isArray(storage.getItem("socialProfiles")) ? storage.getItem<Record<string, unknown>[]>("socialProfiles")! : [];
    return Array.isArray(profiles) ? profiles.filter((profile) => typeof profile === "object" && profile !== null && "userId" in profile && profile.userId === userId) : [];
  },
}

// Funções para perfis de esports
export const esportsProfileStorage = {
  saveEsportsProfiles: (userId: string, profiles: Record<string, string>): boolean => {
    const allProfiles = Array.isArray(storage.getItem("esportsProfiles")) ? storage.getItem<Record<string, unknown>[]>("esportsProfiles")! : [];

    const validatedProfiles = Object.entries(profiles).map(([platform, url]) => ({
      id: `esports_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      userId,
      platform,
      profileUrl: url,
      validated: true,
      createdAt: new Date().toISOString(),
    }))

    storage.setItem("esportsProfiles", [...allProfiles, ...validatedProfiles])
    return true
  },

  getProfilesByUserId: (userId: string): Record<string, unknown>[] => {
    const profiles = Array.isArray(storage.getItem("esportsProfiles")) ? storage.getItem<Record<string, unknown>[]>("esportsProfiles")! : [];
    return profiles.filter((profile) => typeof profile === "object" && profile !== null && "userId" in profile && profile.userId === userId);
  },
}

// Função para autenticação simplificada
export const authStorage = {
  login: (email: string, password: string): { success: boolean; user?: Record<string, unknown>; message?: string } => {
    const user = userStorage.getUserByEmail(email)

    if (!user) return { success: false, message: "Usuário não encontrado" }

    // Em uma aplicação real, você compararia hashes de senha
    // Aqui estamos apenas simulando para fins de demonstração
    if (password === "123456") {
      storage.setItem("currentUser", user)
      return { success: true, user }
    }

    return { success: false, message: "Senha incorreta" }
  },

  register: (userData: Record<string, unknown>): { success: boolean; user?: Record<string, unknown>; message?: string } => {
    const existingUser = userStorage.getUserByEmail(typeof userData.email === 'string' ? userData.email : String(userData.email))

    if (existingUser) {
      return { success: false, message: "Email já cadastrado" }
    }

    const userId = userStorage.saveUser(userData)
    const user = userStorage.getUserById(userId)

    storage.setItem("currentUser", user)
    return { success: true, user }
  },

  logout: (): void => {
    storage.removeItem("currentUser")
  },

  getCurrentUser: (): Record<string, unknown> | null => {
    return storage.getItem("currentUser")
  },
}
