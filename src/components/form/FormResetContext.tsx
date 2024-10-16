/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
// FormResetContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useCallback
} from "react";
import { Path, UseFormSetValue } from "react-hook-form";

interface FormResetContextProps {
  reset: () => void;
  setResetRef: (reset: () => void) => void;
  setValue: <TFieldValues>(name: Path<TFieldValues>, value: any) => void;
  setSetValueRef: (setValue: UseFormSetValue<any>) => void;
}

const FormResetContext = createContext<FormResetContextProps | undefined>(
  undefined
);

export const FormResetProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const resetRef = useRef<() => void>(() => {});
  const setValueRef = useRef<UseFormSetValue<any> | null>(null);

  const setResetRef = useCallback((reset: () => void) => {
    resetRef.current = reset;
  }, []);

  const setSetValueRef = useCallback((setValue: UseFormSetValue<any>) => {
    setValueRef.current = setValue;
  }, []);

  const reset = useCallback(() => {
    if (resetRef.current) {
      resetRef.current();
    }
  }, []);

  const setValue = useCallback((name: string, value: any) => {
    if (setValueRef.current) {
      setValueRef.current(name, value);
    } else {
      console.warn("setValue function is not available.");
    }
  }, []);

  return (
    <FormResetContext.Provider
      value={{ reset, setResetRef, setSetValueRef, setValue }}
    >
      {children}
    </FormResetContext.Provider>
  );
};

export const useFormReset = (): FormResetContextProps => {
  const context = useContext(FormResetContext);
  if (context === undefined) {
    throw new Error("useFormReset must be used within a FormResetProvider");
  }
  return context;
};
