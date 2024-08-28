// FormResetContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useCallback
} from "react";

interface FormResetContextProps {
  reset: () => void;
  setResetRef: (reset: () => void) => void;
}

const FormResetContext = createContext<FormResetContextProps | undefined>(
  undefined
);

export const FormResetProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const resetRef = useRef<() => void>(() => {});

  // Set reset function in the ref
  const setResetRef = useCallback((reset: () => void) => {
    resetRef.current = reset;
  }, []);

  const reset = useCallback(() => {
    if (resetRef.current) {
      resetRef.current();
    }
  }, []);

  return (
    <FormResetContext.Provider value={{ reset, setResetRef }}>
      {children}
    </FormResetContext.Provider>
  );
};

// Custom hook to use FormReset context
// eslint-disable-next-line react-refresh/only-export-components
export const useFormReset = (): FormResetContextProps => {
  const context = useContext(FormResetContext);
  if (context === undefined) {
    throw new Error("useFormReset must be used within a FormResetProvider");
  }
  return context;
};
