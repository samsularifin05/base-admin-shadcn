import { FormStateReduxFom } from '@/reduxStore';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

export function useReduxForm<T extends FieldValues>(
  formName: keyof FormStateReduxFom,
  options: UseFormProps<T>
) {
  const methods = useForm<T>(options);
  return { ...methods, formName };
}
