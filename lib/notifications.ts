import { prisma } from "@/lib/db"
import { Resend } from "resend"

// Inicializar Resend para envio de emails
const resendApiKey = process.env.RESEND_API_KEY || ""
const resend = new Resend(resendApiKey)

// Tipos de notificação
export enum NotificationType {
  EVENT_INVITATION = "EVENT_INVITATION",
  LEVEL_UP = "LEVEL_UP",
  REWARD_AVAILABLE = "REWARD_AVAILABLE",
  MATCH_REMINDER = "MATCH_REMINDER",
  EXCLUSIVE_CONTENT = "EXCLUSIVE_CONTENT",
  PROFILE_VERIFIED = "PROFILE_VERIFIED",
}

// Criar notificação
export async function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  data?: any,
) {
  try {
    // Criar notificação no banco de dados
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data: data || {},
        read: false,
      },
    })

    // Obter preferências de notificação do usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { notificationPreferences: true },
    }) as { email: string; notificationPreferences?: { emailNotifications?: boolean; [key: string]: any } } | null

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    // Verificar se o usuário deseja receber este tipo de notificação por email
    const shouldSendEmail =
      user.notificationPreferences?.emailNotifications && user.notificationPreferences[`email${type}`]

    // Enviar email se necessário
    if (shouldSendEmail) {
      await sendNotificationEmail(user.email, title, message, type)
    }

    // Aqui você pode adicionar integração com serviços de push notification
    // como Firebase Cloud Messaging, OneSignal, etc.

    return { success: true, notification }
  } catch (error) {
    console.error("Erro ao criar notificação:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Enviar notificação por email
async function sendNotificationEmail(email: string, title: string, message: string, type: NotificationType) {
  try {
    await resend.emails.send({
      from: "FURIA Esports <noreply@furia.gg>",
      to: email,
      subject: title,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://furia.gg/logo.png" alt="FURIA Esports" style="max-width: 150px; margin-bottom: 20px;" />
          <h2>${title}</h2>
          <p>${message}</p>
          <a href="https://knowyourfan.furia.gg/notifications" style="display: inline-block; background-color: #00a859; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Ver Notificação</a>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Você está recebendo este email porque se cadastrou no aplicativo Know Your Fan da FURIA Esports.
            Para alterar suas preferências de notificação, <a href="https://knowyourfan.furia.gg/settings/notifications">clique aqui</a>.
          </p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Marcar notificação como lida
export async function markNotificationAsRead(notificationId: string) {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    })

    return { success: true }
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Obter notificações do usuário
export async function getUserNotifications(userId: string, limit = 20, offset = 0) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }) as any[]

    const unreadCount = await prisma.notification.count({
      where: { userId, read: false },
    }) as number

    return { success: true, notifications, unreadCount }
  } catch (error) {
    console.error("Erro ao obter notificações:", error)
    return { success: false, error: (error as Error).message }
  }
}
