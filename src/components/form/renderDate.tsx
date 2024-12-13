/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

interface TypedDateProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  dateFormat?: string; // Format tanggal yang diinginkan
  value?: DateValueType; // Properti yang sesuai dengan react-tailwindcss-datepicker
  onChange?: (value: DateValueType) => void;
  useRange?: boolean; // Dukungan untuk range tanggal
}

const ReanderDate = <FormValues extends Record<string, any>>({
  name,
  label,
  placeholder,
  control,
  readOnly,
  className,
  dateFormat = 'YYYY-MM-DD',
  value,
  onChange,
  useRange = false // Default adalah single date
}: TypedDateProps<FormValues>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className={`relative ${className}`}>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <div className="relative">
                <Datepicker
                  primaryColor={'blue'}
                  value={value || field.value} // Pastikan nilai sesuai dengan tipe DateValueType
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    if (onChange) onChange(newValue);
                  }}
                  disabled={readOnly}
                  useRange={useRange}
                  asSingle={!useRange}
                  displayFormat={dateFormat}
                  inputClassName="peer w-full bg-white px-2 py-2 border border-input rounded outline-none focus:ring-1 focus:ring-primary"
                  placeholder={
                    placeholder ||
                    (useRange ? 'Pilih Rentang Tanggal' : 'Pilih Tanggal')
                  }
                />
              </div>
            </FormControl>
            <FormMessage className="" />
          </FormItem>
        );
      }}
    />
  );
};

export default ReanderDate;
