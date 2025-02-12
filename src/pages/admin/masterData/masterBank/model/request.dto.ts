export interface RequestMasterBankDto {
  _id: string;
  nomor_akun: string;
  kode_bank: string;
  nama_bank: string;
}

export const initialMasterBank: RequestMasterBankDto = {
  _id: '',
  nomor_akun: '',
  kode_bank: '',
  nama_bank: ''
};
