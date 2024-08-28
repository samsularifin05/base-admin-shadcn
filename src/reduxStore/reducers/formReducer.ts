import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormLoginDto, intitalFormLogin } from "@/pages";

// Define the state interface
export interface FormState {
  LoginForm: FormLoginDto;
}

// Define the initial state
export const initialState: FormState = {
  LoginForm: intitalFormLogin
};

// Create the slice
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
    resetDefaultForm: (
      state: FormState,
      action: PayloadAction<keyof FormState | "all">
    ) => {
      const form = action.payload;

      if (form === "all") {
        // Reset all forms to their initial state
        Object.keys(state).forEach((key) => {
          const formKey = key as keyof FormState;
          state[formKey] = { ...initialState[formKey] };
        });
      } else {
        // Reset a specific form to its initial state
        state[form] = { ...initialState[form] };
      }
    }
  }
});

export const { updateForm, resetDefaultForm } = formsSlice.actions;
export default formsSlice.reducer;
