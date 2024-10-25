import {
  FormLoginDto,
  IFormMasterUserRequestDto,
  intitalFormLogin,
  intitalFormMasterUser
} from "@/pages";

export interface FormStateReduxFom {
  LoginForm: FormLoginDto;
  FormMasterUser: IFormMasterUserRequestDto;
}

export const initialState: FormStateReduxFom = {
  LoginForm: intitalFormLogin,
  FormMasterUser: intitalFormMasterUser
};
