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
    defaultValues: initialValues ? initialValues : initialValuesWithForm,
    mode: 'onChange'
  });

  useEffect(() => {
    const currentValues = form.getValues();
    if (
      JSON.stringify(currentValues) !== JSON.stringify(initialValuesWithForm)
    ) {
      form.reset(initialValuesWithForm);
    }
  }, [initialValuesWithForm, form]);

  useEffect(() => {
    const watchSubscription = form.watch(async (values) => {
      try {
        const validValues = await validate.validate(values);
        dispatch(formActions.setValue({ form: formName, values: validValues }));
      } catch (error) {
        console.log(error);
      }
    });

    return () => {
      watchSubscription.unsubscribe();
    };
  }, [form, dispatch, validate, formName]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children({ form })}</form>
    </Form>
  );
};

export default FormPanel;
