import { FormStateReduxFom } from '@/reduxStore';
import React, { createContext, useContext } from 'react';

// Tipe formName harus salah satu key dari FormStateReduxFom
type FormNameType = keyof FormStateReduxFom; // misal 'LoginForm' | 'RegisterForm'

// Buat context dengan default undefined, supaya bisa cek kalau gak ada provider
const FormNameContext = createContext<FormNameType | undefined>(undefined);

export const useFormName = (): FormNameType => {
  const context = useContext(FormNameContext);
  if (!context)
    throw new Error('useFormName must be used within a FormNameProvider');
  return context;
};

type FormNameProviderProps = {
  formName: FormNameType;
  children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

const FormNameProvider: React.FC<FormNameProviderProps> = ({
  formName,
  children,
  ...formProps
}) => (
  <FormNameContext.Provider value={formName}>
    <form {...formProps}>{children}</form>
  </FormNameContext.Provider>
);

export default FormNameProvider;
