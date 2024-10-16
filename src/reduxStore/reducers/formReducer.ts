import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState, initialState } from "../formState";

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
    resetDefaultForm: <T extends keyof FormState>(
      state: FormState,
      action: PayloadAction<keyof FormState | "all">
    ) => {
      const form = action.payload as T;
      state[form] = { ...initialState[form] };
    }
  }
});

export const { updateForm, resetDefaultForm } = formsSlice.actions;
export const formActions = {
  updateForm,
  resetDefaultForm
};
export default formsSlice.reducer;
