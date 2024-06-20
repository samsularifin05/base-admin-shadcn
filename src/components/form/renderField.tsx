/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { PasswordInput } from "../custom";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui";
import { Input } from "../ui/input";

interface TypedFieldProps<FormValues> {
  name: keyof FormValues;
  label: string;
  control: any;
  placeholder: string;
  hiddenText?: boolean;
}

const ReanderField = <FormValues extends Record<string, any>>({
  name,
  label,
  placeholder,
  control,
  hiddenText
}: TypedFieldProps<FormValues>) => (
  <>
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {hiddenText ? (
              <PasswordInput placeholder="********" {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export default ReanderField;
