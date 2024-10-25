import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormStateReduxFom, initialState } from "../formState";

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: <T extends keyof FormStateReduxFom>(
      state: FormStateReduxFom,
      action: PayloadAction<{ form: T; values: Partial<FormStateReduxFom[T]> }>
    ) => {
      const { form, values } = action.payload;

      const validValues = Object.keys(values).reduce((acc, key) => {
        if (key in state[form]) {
          acc[key as keyof FormStateReduxFom[T]] =
            values[key as keyof FormStateReduxFom[T]];
        }
        return acc;
      }, {} as Partial<FormStateReduxFom[T]>);

      state[form] = { ...state[form], ...validValues };
    },
    resetDefaultForm: <T extends keyof FormStateReduxFom>(
      state: FormStateReduxFom,
      action: PayloadAction<keyof FormStateReduxFom | "all">
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
