export interface FormLoginDto {
  email: string;
  password: string;
  tanggalPastiKeberangkatan: string;
  curriculumnVitae: File | null;
}
export const intitalFormLogin: FormLoginDto = {
  email: 'sam@gmail.com',
  password: '',
  curriculumnVitae: null,
  tanggalPastiKeberangkatan: ''
};
