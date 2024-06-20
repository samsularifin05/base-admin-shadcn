/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  DefaultValues,
  Resolver
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch, FormState, updateForm } from "@/reduxStore";
import { Form } from "../ui";
import * as yup from "yup";

interface FormPanelProps<FormValues extends FieldValues> {
  formName: keyof FormState;
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
  children: (props: { form: UseFormReturn<FormValues> }) => React.ReactNode;
  validate: yup.ObjectSchema<FormValues>;
  intitalFormLogin: DefaultValues<FormValues>;
}

const FormPanel = <FormValues extends FieldValues>({
  onSubmit,
  children,
  validate,
  formName,
  intitalFormLogin
}: FormPanelProps<FormValues>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<FormValues>({
    resolver: yupResolver(validate) as unknown as Resolver<FormValues>,
    defaultValues: intitalFormLogin
  });
  useEffect(() => {
    const watchSubscription = form.watch(async (values) => {
      try {
        const validValues = await validate.validate(values);
        dispatch(updateForm({ form: formName, values: validValues }));
      } catch (error) {
        console.log();
      }
    });

    return () => {
      watchSubscription.unsubscribe(); // Ensure proper cleanup
    };
  }, [form, dispatch, validate, formName]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children({ form })}</form>
    </Form>
  );
};

export default FormPanel;
