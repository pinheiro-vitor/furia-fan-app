"use server"

import { storage, userStorage, documentStorage, socialProfileStorage, esportsProfileStorage } from "@/lib/storage"
import { validateCPF } from "@/lib/utils"
// Adicionar importação do serviço de email
import { sendWelcomeEmail } from "@/lib/email"

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const cpf = (formData.get("cpf") as string).replace(/[^\d]/g, "")
    const phone = (formData.get("phone") as string).replace(/[^\d]/g, "")
    const birthdate = new Date(formData.get("birthdate") as string)
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zipCode = (formData.get("zipCode") as string).replace(/[^\d]/g, "")
    const interests = JSON.parse(formData.get("interests") as string)
    const events = formData.get("events") as string
    const purchases = formData.get("purchases") as string

    // Validar CPF
    if (!validateCPF(cpf)) {
      throw new Error("CPF inválido")
    }

    // Verificar se o usuário já existe
    const users = storage.getItem("users") || []
    const existingUser = users.find((user: { email: string; cpf: string }) => user.email === email || user.cpf === cpf)

    if (existingUser) {
      throw new Error("Usuário já cadastrado com este email ou CPF")
    }

    // Criar usuário
    const userId = userStorage.saveUser({
      name,
      email,
      cpf,
      phone,
      birthdate,
      address,
      city,
      state,
      zipCode,
      interests,
      events,
      purchases,
    })

    return { success: true, userId }
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function saveDocuments(userId: string, documentData: Record<string, unknown>) {
  try {
    // Salvar documentos
    documentStorage.saveDocuments(userId, documentData)
    return { success: true }
  } catch (error) {
    console.error("Erro ao salvar documentos:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function saveSocialProfiles(userId: string, profiles: Record<string, unknown>[]) {
  try {
    // Salvar perfis sociais
    socialProfileStorage.saveSocialProfiles(userId, profiles)
    return { success: true }
  } catch (error) {
    console.error("Erro ao salvar perfis sociais:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function saveEsportsProfiles(userId: string, profiles: Record<string, string>) {
  try {
    // Salvar perfis de esports
    esportsProfileStorage.saveEsportsProfiles(userId, profiles)
    return { success: true }
  } catch (error) {
    console.error("Erro ao salvar perfis de esports:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Atualizar a função completeRegistration para enviar o email de boas-vindas
export async function completeRegistration(userId: string) {
  try {
    // Aqui você pode adicionar lógica adicional para finalizar o registro
    const user = userStorage.getUserById(userId)
    storage.setItem("currentUser", user)

    // Enviar email de boas-vindas
    if (user && user.email && user.name) {
      await sendWelcomeEmail(user.email, user.name)
    }

    return { success: true }
  } catch (error) {
    console.error("Erro ao finalizar registro:", error)
    return { success: false, error: (error as Error).message }
  }
}
