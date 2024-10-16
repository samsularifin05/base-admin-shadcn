import { FormLoginDto, intitalFormLogin } from "@/pages";

export interface FormState {
  LoginForm: FormLoginDto;
}

export const initialState: FormState = {
  LoginForm: intitalFormLogin
};
