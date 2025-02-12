import {
  RequestMasterBankDto,
  initialMasterBank
} from '@/pages/admin/masterData/masterBank/index';
import { FormLoginDto, intitalFormLogin } from '@/pages';

export interface FormStateReduxFom {
  LoginForm: FormLoginDto;
  MasterBank: RequestMasterBankDto;
}

export const initialState: FormStateReduxFom = {
  LoginForm: intitalFormLogin,
  MasterBank: initialMasterBank
};
