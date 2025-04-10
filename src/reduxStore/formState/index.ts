import { FormLoginDto, intitalFormLogin } from '@/pages';

export interface FormStateReduxFom {
  LoginForm: FormLoginDto;
}

export const initialState: FormStateReduxFom = {
  LoginForm: intitalFormLogin
};
