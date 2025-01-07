import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  useForm,
  FieldValues,
  UseFormReturn,
  DefaultValues,
  Resolver
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '../';
import * as yup from 'yup';
import {
  AppDispatch,
  formActions,
  FormStateReduxFom,
  useAppSelector
} from '@/reduxStore';

interface FormPanelProps<FormValues extends FieldValues> {
  formName: keyof FormStateReduxFom;
  onSubmit: (values: FormValues) => void;
  children: (props: { form: UseFormReturn<FormValues> }) => React.ReactNode;
  validate: yup.ObjectSchema<FormValues>;
  initialValues?: DefaultValues<FormValues>;
}

const FormPanel = <FormValues extends FieldValues>({
  onSubmit,
  children,
  validate,
  formName,
  initialValues
}: FormPanelProps<FormValues>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValuesWithForm = useAppSelector(
    (state) => state.form[formName as keyof FormStateReduxFom]
  ) as unknown as DefaultValues<FormValues>;

  const form = useForm<FormValues>({
    resolver: yupResolver(validate) as unknown as Resolver<FormValues>,
    defaultValues: initialValues || initialValuesWithForm,
    mode: 'onChange'
  });

  useEffect(() => {
    if (initialValuesWithForm) {
      form.reset(initialValuesWithForm);
    }
  }, [initialValuesWithForm, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = JSON.stringify(values);
      const previousValues = JSON.stringify(initialValuesWithForm);

      if (currentValues !== previousValues) {
        dispatch(
          formActions.setValue({
            form: formName,
            values: values as FormValues
          })
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch, dispatch, formName, initialValuesWithForm, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children({ form })}</form>
    </Form>
  );
};

export default FormPanel;
