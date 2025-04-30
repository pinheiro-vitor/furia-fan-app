export interface User {
  id: string;
  name: string;
  email: string;
  profileUrl?: string;
  provider: string;
  providerData?: Record<string, unknown>;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
