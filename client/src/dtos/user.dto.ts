export interface IUpdateUserDetailsDTO {
  name?: string;
  email?: string;
  location?: string;
  phoneNumber?: string;
}

export interface IPasswordChangeDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
