import { storage, userStorage } from "./storage"

export async function getCurrentUser() {
  return storage.getItem("currentUser")
}

export async function registerUser(userData: any) {
  try {
    const userId = userStorage.saveUser(userData)
    const user = userStorage.getUserById(userId)

    storage.setItem("currentUser", user)

    return {
      success: true,
      message: "User registered successfully",
      user,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to register user",
    }
  }
}

export async function loginUser(email: string, password: string) {
  // Versão simplificada para demonstração
  const users = storage.getItem("users") || []
  const user = users.find((u: any) => u.email === email)

  if (!user) {
    return { success: false, message: "User not found" }
  }

  // Em uma aplicação real, você compararia hashes de senha
  // Aqui estamos apenas simulando para fins de demonstração
  if (password === "123456") {
    storage.setItem("currentUser", user)
    return { success: true, user }
  }

  return { success: false, message: "Invalid password" }
}

export async function logoutUser() {
  storage.removeItem("currentUser")
  return { success: true }
}
