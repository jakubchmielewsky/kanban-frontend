export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  _id: string;
  email: string;
}

export interface ResetPasswordData {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
