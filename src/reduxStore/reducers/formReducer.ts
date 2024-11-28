import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStateReduxFom, initialState } from '../formState';

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setValue: <T extends keyof FormStateReduxFom>(
      state: FormStateReduxFom,
      action: PayloadAction<{ form: T; values: Partial<FormStateReduxFom[T]> }>
    ) => {
      const { form, values } = action.payload;

      // const validValues = Object.keys(values).reduce(
      //   (acc, key) => {
      //     if (key in state[form]) {
      //       acc[key as keyof FormStateReduxFom[T]] =
      //         values[key as keyof FormStateReduxFom[T]];
      //     }
      //     return acc;
      //   },
      //   {} as Partial<FormStateReduxFom[T]>
      // );

      const validValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          if (key in state[form]) {
            acc[key as keyof FormStateReduxFom[T]] =
              value as FormStateReduxFom[T][keyof FormStateReduxFom[T]];
          }
          return acc;
        },
        {} as Partial<FormStateReduxFom[T]>
      );

      state[form] = { ...state[form], ...validValues };
    },
    resetForm: <T extends keyof FormStateReduxFom>(
      state: FormStateReduxFom,
      action: PayloadAction<keyof FormStateReduxFom | 'all'>
    ) => {
      const form = action.payload as T;
      state[form] = { ...initialState[form] };
    }
  }
});

export const { setValue, resetForm } = formsSlice.actions;
export const formActions = {
  setValue,
  resetForm
};
export default formsSlice.reducer;
