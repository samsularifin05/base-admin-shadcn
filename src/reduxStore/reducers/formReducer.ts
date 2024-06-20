import { FormLoginDto, intitalFormLogin } from "@/pages/login/dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  LoginForm: FormLoginDto;
}

export const initialState: FormState = {
  LoginForm: intitalFormLogin
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: <T extends keyof FormState>(
      state: FormState,
      action: PayloadAction<{ form: T; values: Partial<FormState[T]> }>
    ) => {
      const { form, values } = action.payload;

      const validValues = Object.keys(values).reduce((acc, key) => {
        if (key in state[form]) {
          acc[key as keyof FormState[T]] = values[key as keyof FormState[T]];
        }
        return acc;
      }, {} as Partial<FormState[T]>);

      state[form] = { ...state[form], ...validValues };
    },
    resetForm: <T extends keyof FormState>(
      state: FormState,
      action: PayloadAction<keyof FormState>
    ) => {
      const form = action.payload as T;
      state[form] = { ...initialState[form] };
    }
  }
});

export const { updateForm, resetForm } = formsSlice.actions;
export default formsSlice.reducer;
