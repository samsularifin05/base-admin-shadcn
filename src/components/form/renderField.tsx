/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues, Path } from 'react-hook-form';
import { PasswordInput } from '../custom';
import {
  Checkbox,
  FormControl,
  FormField,
  // FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui';
import { Input } from '../ui/input';
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  TextareaHTMLAttributes,
  useEffect
} from 'react';

interface TypedFieldProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  placeholder?: string;
  hiddenText?: boolean;
  isTextarea?: boolean;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  className?: string;
  note?: string;
  rows?: number;
  tabIndex?: number;
  maxLength?: number;
  value?: string | number;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: JSX.Element | string; // Ikon yang akan ditampilkan
  iconPosition?: 'left' | 'right' | 'none'; // Posisi ikon: kiri atau kanan
  onClickIcon?: () => void;
}

const ReanderField = <FormValues extends Record<string, any>>({
  name,
  label,
  placeholder,
  control,
  readOnly,
  isTextarea = false,
  hiddenText,
  type = 'text',
  className = '',
  note = '',
  rows = 4,
  tabIndex,
  value,
  onChange,
  onClickIcon,
  icon,
  maxLength,
  iconPosition = 'right'
}: TypedFieldProps<FormValues>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        useEffect(() => {
          if (value !== undefined) {
            field.onChange(value || field.value || '');
          }
        }, [field, value]);
        return (
          <FormItem className="space-y-1">
            {type !== 'checkbox' && type !== 'hidden' && (
              <FormLabel className="gap-2">
                {label}
                {note && (
                  <sub className="ml-2 italic text-red-600">* {note}</sub>
                )}
              </FormLabel>
            )}
            <FormControl>
              {type === 'checkbox' ? (
                <FormLabel className="flex items-center cursor-pointer">
                  <Checkbox
                    {...field}
                    className={className}
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  <span
                    className="ml-2"
                    onClick={() => field.onChange(!field.value)}
                  >
                    {label}
                  </span>
                </FormLabel>
              ) : type === 'file' ? (
                <input
                  type="file"
                  readOnly={readOnly}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      field.onChange(e.target.files[0]);
                      if (onChange) onChange(e);
                    }
                  }}
                  className={`flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none ${className}`}
                />
              ) : hiddenText ? (
                <PasswordInput
                  placeholder="********"
                  {...field}
                  readOnly={readOnly}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (onChange) onChange(e); // Call onChange prop
                  }}
                  className={`block ${
                    readOnly
                      ? 'bg-gray-200 outline-gray-200'
                      : 'bg-background focus:border-primary focus:outline-none'
                  } w-full border rounded-md border-input   ${className}`}
                  // className={`block w-full border rounded-md border-input bg-background focus:border-primary focus:outline-none ${className}`}
                />
              ) : isTextarea ? (
                <textarea
                  {...(field as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                  rows={rows}
                  readOnly={readOnly}
                  placeholder={placeholder}
                  value={field.value ?? ''}
                  className={`block ${
                    readOnly
                      ? 'bg-gray-200 outline-gray-200'
                      : 'bg-background focus:border-primary focus:outline-none'
                  } w-full border rounded-md border-input  px-3 py-2  ${className}`}
                />
              ) : (
                <div className="relative flex items-center">
                  {/* Kontainer untuk grup input */}
                  {iconPosition === 'left' && (
                    <button
                      onClick={onClickIcon}
                      type="button"
                      className="absolute -translate-y-1/2 rounded-md right-1 top-1/2 text-muted-foreground"
                    >
                      {icon}
                    </button>
                  )}
                  <Input
                    {...field}
                    type={type}
                    readOnly={readOnly}
                    tabIndex={tabIndex}
                    placeholder={placeholder}
                    value={field.value || ''}
                    maxLength={maxLength}
                    onChange={(e) => {
                      const numericValue =
                        type === 'number'
                          ? Number(e.target.value)
                          : e.target.value;

                      field.onChange(numericValue);
                      if (onChange) onChange(e);
                    }}
                    className={`block ${
                      type !== 'date'
                        ? iconPosition === 'left'
                          ? 'pl-10'
                          : 'pr-10'
                        : ''
                    } ${
                      readOnly
                        ? 'bg-gray-200 outline-gray-200'
                        : 'bg-background focus:border-primary focus:outline-none'
                    } w-full border rounded-md border-input ${className}`}
                  />
                  {iconPosition === 'right' && (
                    <button
                      onClick={onClickIcon}
                      type="button"
                      className="absolute -translate-y-1/2 rounded-md right-1 top-1/2 text-muted-foreground"
                    >
                      {icon} {/* Menampilkan ikon di sebelah kanan */}
                    </button>
                  )}
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ReanderField;
