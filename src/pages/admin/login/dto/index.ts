export interface FormLoginDto {
  email: string;
  password: string;
  date?: {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
  };
}
export const intitalFormLogin: FormLoginDto = {
  email: '',
  password: '',
  date: {
    endDate: undefined,
    startDate: undefined
  }
};
