import { Resend } from "resend"

// Inicializar o cliente Resend com a API key
const resendApiKey = process.env.RESEND_API_KEY || ""
export const resend = new Resend(resendApiKey)

// Template de email de boas-vindas
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "FURIA Esports <noreply@furia.gg>",
      to: email,
      subject: "Bem-vindo à Família FURIA!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://furia.gg/logo.png" alt="FURIA Esports" style="max-width: 150px; margin-bottom: 20px;" />
          <h2>Olá, ${name}!</h2>
          <p>Bem-vindo à família FURIA! Estamos muito felizes em ter você como parte da nossa comunidade de fãs.</p>
          <p>Com seu perfil no Know Your Fan, você terá acesso a:</p>
          <ul>
            <li>Experiências exclusivas com jogadores</li>
            <li>Acesso prioritário a ingressos para eventos</li>
            <li>Descontos em produtos oficiais</li>
            <li>Conteúdo personalizado baseado nos seus interesses</li>
          </ul>
          <a href="https://knowyourfan.furia.gg/dashboard" style="display: inline-block; background-color: #00a859; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Acessar meu Dashboard</a>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Você está recebendo este email porque se cadastrou no aplicativo Know Your Fan da FURIA Esports.
            Para alterar suas preferências de notificação, <a href="https://knowyourfan.furia.gg/settings/notifications">clique aqui</a>.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Erro ao enviar email de boas-vindas:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Erro ao enviar email de boas-vindas:", error)
    return { success: false, error }
  }
}

// Template de email de notificação de evento
export const sendEventNotificationEmail = async (
  email: string,
  name: string,
  eventName: string,
  eventDate: string,
  eventLink: string,
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "FURIA Esports <noreply@furia.gg>",
      to: email,
      subject: `Evento FURIA: ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://furia.gg/logo.png" alt="FURIA Esports" style="max-width: 150px; margin-bottom: 20px;" />
          <h2>Olá, ${name}!</h2>
          <p>Temos um evento incrível chegando que achamos que você vai adorar!</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">${eventName}</h3>
            <p><strong>Data:</strong> ${eventDate}</p>
            <p>Não perca esta oportunidade exclusiva para os fãs da FURIA!</p>
          </div>
          <a href="${eventLink}" style="display: inline-block; background-color: #00a859; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Ver Detalhes do Evento</a>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Você está recebendo este email porque se cadastrou no aplicativo Know Your Fan da FURIA Esports.
            Para alterar suas preferências de notificação, <a href="https://knowyourfan.furia.gg/settings/notifications">clique aqui</a>.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Erro ao enviar email de notificação de evento:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Erro ao enviar email de notificação de evento:", error)
    return { success: false, error }
  }
}
