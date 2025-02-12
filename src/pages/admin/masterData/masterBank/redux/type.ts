import { ResponseMasterBankDto } from '../model';
export interface GetMasterBankDto {
  data: ResponseMasterBankDto[];
  meta: { total: number; page: number; limit: number };
}

export interface MasterBank {
  getMasterBank: GetMasterBankDto;
}

export const initialState: MasterBank = {
  getMasterBank: {
    data: [],
    meta: { total: 0, page: 0, limit: 0 }
  }
};
