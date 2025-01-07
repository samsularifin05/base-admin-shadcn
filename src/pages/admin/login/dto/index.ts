export interface FormLoginDto {
  email: string;
  password: string;
  tanggalPastiKeberangkatan: string;
  curriculumnVitae: File | null;
}
export const intitalFormLogin: FormLoginDto = {
  email: '',
  password: '',
  curriculumnVitae: null,
  tanggalPastiKeberangkatan: ''
};
