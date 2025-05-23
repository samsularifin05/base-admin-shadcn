/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  useForm,
  FieldValues,
  UseFormReturn,
  DefaultValues,
  Resolver,
  useFieldArray,
  ArrayPath,
  UseFieldArrayReturn
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

type FieldArrayReturn<FormValues extends FieldValues> = Record<
  string,
  UseFieldArrayReturn<FormValues, ArrayPath<FormValues>, 'id'>
>;

interface FormPanelProps<FormValues extends FieldValues> {
  formName: keyof FormStateReduxFom;
  onSubmit: (values: FormValues) => void;
  children: (props: {
    form: UseFormReturn<FormValues>;
    fieldArrays: FieldArrayReturn<FormValues>;
  }) => React.ReactNode;
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
    resolver: validate
      ? (yupResolver(validate) as unknown as Resolver<FormValues>)
      : undefined,
    defaultValues: initialValues || initialValuesWithForm,
    mode: 'onChange'
  });

  useEffect(() => {
    if (initialValuesWithForm) {
      form.reset(initialValuesWithForm);
    }
  }, [initialValuesWithForm, form]);

  const { errors } = form.formState;

  // Dynamically handle field arrays based on initialValues
  const fieldArrays: FieldArrayReturn<FormValues> = Object.keys(
    initialValues || {}
  ).reduce(
    (acc, fieldName) => {
      // Check if field is an array and ensure correct typing for ArrayPath
      if (
        Array.isArray(initialValues?.[fieldName]) &&
        initialValues?.[fieldName]?.length > 0
      ) {
        const fieldNameAsArrayPath = fieldName as ArrayPath<FormValues>;
        acc[fieldName] = useFieldArray<FormValues>({
          control: form.control,
          name: fieldNameAsArrayPath // Narrow down the type to ArrayPath
        });
      }
      return acc;
    },
    {} as FieldArrayReturn<FormValues> // Cast to the correct type for the accumulator
  );

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Fields errors:', errors);
    }
  }, [errors]);

  useEffect(() => {
    const subscription = form.watch(async (values) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children({ form, fieldArrays })}
      </form>
    </Form>
  );
};

export default FormPanel;
