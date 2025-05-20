/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { useEffect, useState } from 'react';

interface TypedDateProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  position?: 'down' | 'up';
  dateFormat?: string; // Format tanggal yang diinginkan
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
  position = 'down',
  onChange,
  useRange = false // Default adalah single date
}: TypedDateProps<FormValues>) => {
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });
  const { getValues } = useFormContext<FormValues>();

  useEffect(() => {
    const fieldValue = getValues(name); // Access form values using getValues from context
    setDate(
      useRange ? fieldValue : { startDate: fieldValue, endDate: fieldValue }
    );
  }, [getValues, name, useRange]);
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const currentValue = useRange
          ? date
          : {
              startDate: date?.startDate || null,
              endDate: date?.endDate || null
            };

        useEffect(() => {
          if (field.value) {
            setDate(field.value);
          }
        }, [field.value]);
        return (
          <FormItem className={`relative ${className}`}>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <div className="relative">
                <Datepicker
                  primaryColor={'blue'}
                  value={currentValue} // Pastikan nilai sesuai dengan tipe DateValueType
                  onChange={(newValue) => {
                    const formattedNewValue = newValue || {
                      startDate: null,
                      endDate: null
                    };

                    // Update local state
                    setDate(formattedNewValue);

                    // Update field value (react-hook-form state)
                    field.onChange(formattedNewValue);

                    // Trigger custom onChange if provided
                    if (onChange) onChange(formattedNewValue);
                  }}
                  disabled={readOnly}
                  useRange={useRange}
                  popoverDirection={position || 'down'}
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
