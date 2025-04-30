export enum NotificationType {
  EVENT_INVITATION = "EVENT_INVITATION",
  LEVEL_UP = "LEVEL_UP",
  REWARD_AVAILABLE = "REWARD_AVAILABLE",
  MATCH_REMINDER = "MATCH_REMINDER",
  EXCLUSIVE_CONTENT = "EXCLUSIVE_CONTENT",
  PROFILE_VERIFIED = "PROFILE_VERIFIED",
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}
