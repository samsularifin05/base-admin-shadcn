export interface RequestMasterBankDto {
  _id: string;
  kode_bank: string;
  nama_bank: string;
}

export const initialMasterBank: RequestMasterBankDto = {
  _id: '',
  kode_bank: '',
  nama_bank: ''
};
