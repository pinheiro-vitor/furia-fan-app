// Este arquivo é mantido apenas para compatibilidade com imports existentes
// Em uma versão real, aqui seria a configuração do Prisma Client

export const prisma = {
  // Implementação simulada para evitar erros
  user: {
    findUnique: async (...args: any[]) => null,
    findFirst: async (...args: any[]) => null,
    create: async (...args: any[]) => args[0]?.data,
    update: async (...args: any[]) => args[0]?.data,
    findMany: async (...args: any[]) => [],
    count: async (...args: any[]) => 0,
  },
  document: {
    findMany: async (...args: any[]) => [],
    create: async (...args: any[]) => args[0]?.data,
  },
  socialProfile: {
    findMany: async (...args: any[]) => [],
    create: async (...args: any[]) => args[0]?.data,
  },
  esportsProfile: {
    findMany: async (...args: any[]) => [],
    create: async (...args: any[]) => args[0]?.data,
  },
  notification: {
    findMany: async (...args: any[]) => [],
    create: async (...args: any[]) => args[0]?.data,
    update: async (...args: any[]) => args[0]?.data,
    count: async (...args: any[]) => 0,
  },
  userPoints: {
    create: async (...args: any[]) => args[0]?.data,
    findMany: async (...args: any[]) => [],
  },
  userAchievement: {
    create: async (...args: any[]) => args[0]?.data,
    findMany: async (...args: any[]) => [],
  },
}
