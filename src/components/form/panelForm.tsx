/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  DefaultValues,
  Resolver,
  Path
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch, FormStateReduxFom, updateForm } from "@/reduxStore";
import { Form } from "../ui";
import * as yup from "yup";
import { useFormReset } from "./FormResetContext";

interface FormPanelProps<FormValues extends FieldValues> {
  formName: keyof FormStateReduxFom;
  onSubmit: (values: FormValues, reset: () => void) => void;
  children: (props: {
    form: UseFormReturn<FormValues>;
    reset: () => void;
    setValue: (name: Path<FormValues>, value: any) => void; // Added setValue here
  }) => React.ReactNode;
  validate?: yup.ObjectSchema<FormValues>;
  initialValues?: DefaultValues<FormValues>;
  className?: string;
}

const FormPanel = <FormValues extends FieldValues>({
  onSubmit,
  children,
  validate,
  formName,
  initialValues,
  className
}: FormPanelProps<FormValues>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { setResetRef, setSetValueRef } = useFormReset();
  const form = useForm<FormValues>({
    resolver: validate
      ? (yupResolver(validate) as unknown as Resolver<FormValues>)
      : undefined,
    defaultValues: initialValues
  });

  const resetRef = useRef<() => void>(() => form.reset());

  const handleReset = () => {
    form.reset();
  };

  useEffect(() => {
    resetRef.current = form.reset;
    setResetRef(form.reset);
    setSetValueRef(form.setValue);
  }, [form.reset, form.setValue, setResetRef, setSetValueRef]);

  useEffect(() => {
    if (validate) {
      const watchSubscription = form.watch(async (values) => {
        try {
          if (values) {
            dispatch(
              updateForm({
                form: formName,
                values: values as Partial<
                  FormStateReduxFom[keyof FormStateReduxFom]
                >
              })
            );
          }
        } catch (error) {
          console.log();
        }
      });

      return () => {
        watchSubscription.unsubscribe(); // Ensure proper cleanup
      };
    }
  }, [form, dispatch, validate, formName]);

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit((values) => onSubmit(values, handleReset))(e);
        }}
        className={className}
      >
        {children({
          form,
          reset: () => resetRef.current(),
          setValue: form.setValue
        })}
      </form>
    </Form>
  );
};

export default FormPanel;
