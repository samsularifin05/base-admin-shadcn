/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { PasswordInput } from '@/components/custom/password-input';
import { Input } from '../ui/input';
import { useFormName } from './formNameProvider';
import { AppDispatch, formActions } from '@/reduxStore';
import { useDispatch } from 'react-redux';

interface TypedFieldProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  placeholder?: string;
  hiddenText?: boolean;
  isTextarea?: boolean;
  readOnly?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  note?: string;
  rows?: number;
  tabIndex?: number;
  maxLength?: number;
  value?: string | number;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: JSX.Element | string;
  iconPosition?: 'left' | 'right';
  onClickIcon?: () => void;
}

const RenderField = <FormValues extends Record<string, any>>({
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
  const {
    field,
    fieldState: { error }
  } = useController({ name, control });
  const dispatch = useDispatch<AppDispatch>();

  const formName = useFormName();

  useEffect(() => {
    dispatch(
      formActions.setValue({
        form: formName,
        values: { [name]: field.value }
      })
    );
  }, [dispatch, field.value, formName, name]);

  useEffect(() => {
    if (value !== undefined && value !== field.value) {
      field.onChange(value);
    }
  }, [field, value]);

  const labelContent = (
    <label htmlFor={name} className="block font-medium">
      {label}
      {note && <sub className="ml-2 italic text-red-600">* {note}</sub>}
    </label>
  );

  const renderInput = () => {
    if (type === 'checkbox') {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...field}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            className="accent-primary"
          />
          <span>{label}</span>
        </label>
      );
    }

    if (type === 'file') {
      return (
        <input
          type="file"
          id={name}
          readOnly={readOnly}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              field.onChange(e.target.files[0]);
              onChange?.(e);
            }
          }}
          className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 ${className}`}
        />
      );
    }

    if (hiddenText) {
      return (
        <PasswordInput
          {...field}
          id={name}
          placeholder={placeholder || '********'}
          readOnly={readOnly}
          onChange={(e) => {
            field.onChange(e.target.value);
            onChange?.(e);
          }}
          className={`w-full border rounded-md px-3 py-2 ${className}`}
        />
      );
    }

    if (isTextarea) {
      return (
        <textarea
          {...field}
          id={name}
          rows={rows}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full border rounded-md px-3 py-2 resize-none ${className}`}
        />
      );
    }

    return (
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <button
            type="button"
            onClick={onClickIcon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {icon}
          </button>
        )}
        <Input
          {...field}
          id={name}
          type={type}
          readOnly={readOnly}
          tabIndex={tabIndex}
          placeholder={placeholder}
          value={field.value ?? ''}
          maxLength={maxLength}
          onChange={(e) => {
            const val =
              type === 'number' ? Number(e.target.value) : e.target.value;
            field.onChange(val);
            onChange?.(e);
          }}
          className={`w-full ${
            icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''
          } ${className}`}
        />
        {icon && iconPosition === 'right' && (
          <button
            type="button"
            onClick={onClickIcon}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {icon}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {type !== 'checkbox' && type !== 'hidden' && labelContent}
      {renderInput()}
      {error?.message && (
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default RenderField;
