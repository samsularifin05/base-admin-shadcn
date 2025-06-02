// Tipe untuk FormLoginDto yang sudah diperbaharui
export interface FormLoginDto {
  email: string;
  password: string;
}

// Inisialisasi initialFormLogin dengan data sesuai tipe FormLoginDto
export const intitalFormLogin: FormLoginDto = {
  email: 'admin@gmail.com',
  password: 'admin1234'
};
