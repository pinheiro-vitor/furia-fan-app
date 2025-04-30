import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Em uma aplicação real, você verificaria as credenciais no banco de dados
    // e usaria hashing para senhas

    // Simular autenticação bem-sucedida
    // Na versão de demonstração, qualquer combinação válida de email/senha é aceita
    if (email.includes("@") && password.length >= 6) {
      // Criar um token JWT simulado (em produção, use uma biblioteca JWT real)
      const token = `demo_token_${Buffer.from(email).toString("base64")}_${Date.now()}`;

      // Definir cookie de autenticação
      (await cookies()).set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: "/",
      })

      return NextResponse.json({
        success: true,
        user: {
          email,
          name: email.split("@")[0], // Nome de usuário simulado
        },
      })
    }

    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
  } catch (error) {
    console.error("Erro na autenticação:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function DELETE() {
  // Logout - remover cookie de autenticação
  (await cookies()).delete("auth_token")

  return NextResponse.json({ success: true })
}
