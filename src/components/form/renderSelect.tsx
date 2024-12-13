/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useState } from 'react';
export type OptionAsyn<FormValues> = {
  value: NonNullable<PathValue<FormValues, Path<FormValues>>>;
  label: NonNullable<PathValue<FormValues, Path<FormValues>>>;
};
export type Option = {
  value: string;
  label: string;
};

interface TypedSelectProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  options: { value: string; label: string }[];
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (value: string | null) => void; // Accept null for clearable
  primaryColor?: string;
  pagination?: boolean;
  promiseOptions?: (inputValue: string) => Promise<OptionAsyn<FormValues>[]>;
}

const RenderSelect = <FormValues extends Record<string, any>>({
  name,
  label,
  control,
  options,
  placeholder,
  className,
  onChange,
  pagination,
  promiseOptions
}: TypedSelectProps<FormValues>) => {
  const [loading, setLoading] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectOptions = pagination
          ? options
              .filter(
                (list) =>
                  list.value !== '' &&
                  list.value !== null &&
                  list.value === field.value
              )
              .map((option) => ({
                value: option.value,
                label: option.label
              }))
          : options.map((option) => ({
              value: option.value,
              label: option.label
            }));

        return (
          <FormItem className={`space-y-1 ${className}`}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {pagination ? (
                <AsyncSelect
                  cacheOptions={false}
                  defaultOptions={options
                    .filter(
                      (cek) =>
                        cek.value !== null &&
                        cek.value !== '' &&
                        cek.label !== ''
                    )
                    .map((option) => ({
                      value: option.value as NonNullable<
                        PathValue<FormValues, Path<FormValues>>
                      >,
                      label: option.label as NonNullable<
                        PathValue<FormValues, Path<FormValues>>
                      >
                    }))}
                  value={
                    field.value
                      ? { value: field.value, label: field.value }
                      : null
                  }
                  onChange={(selected) => {
                    if (selected) {
                      field.onChange(selected.value); // Update form state
                      if (onChange) {
                        onChange(selected.value);
                      }
                    } else {
                      field.onChange(null); // Clear selection
                      if (onChange) {
                        onChange(null);
                      }
                    }
                  }}
                  isLoading={loading}
                  placeholder={placeholder}
                  isClearable // Enable clearable feature
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: '100%',
                      borderColor: '',
                      boxShadow: 'none',
                      height: '42px',
                      '&:hover': {
                        borderColor: 'gray'
                      }
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? '#3994EE'
                        : provided.backgroundColor,
                      color: state.isSelected ? 'white' : 'black'
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '16rem' // Adjust width as needed
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '16rem' // Adjust width as needed
                    })
                  }}
                  loadOptions={(inputValue, callback) => {
                    if (promiseOptions) {
                      setLoading(true);
                      promiseOptions(inputValue)
                        .then((options) => {
                          if (options.length === 0) {
                            // Reset value if no options are returned
                            field.onChange(null);
                            callback([]); // Handle any errors by returning an empty array
                            setLoading(false);
                            return false;
                          }
                          callback(
                            options.filter(
                              (cek) => cek.value !== '' && cek.label !== ''
                            )
                          );
                          setLoading(false);
                        })
                        .catch(() => {
                          setLoading(false);
                          callback([]); // Handle any errors by returning an empty array
                        });
                    }
                  }}
                />
              ) : (
                <Select
                  className={className}
                  value={
                    selectOptions.find(
                      (option) => option.value === field.value
                    ) || null
                  }
                  onChange={(selected) => {
                    if (selected) {
                      field.onChange(selected.value); // Update form state
                      if (onChange) {
                        onChange(selected.value);
                      }
                    } else {
                      field.onChange(null); // Clear selection
                      if (onChange) {
                        onChange(null);
                      }
                    }
                  }}
                  options={selectOptions}
                  placeholder={`${placeholder ? placeholder : `Select ${label}`}`}
                  isClearable // Enable clearable feature
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: '100%',
                      borderColor: '',
                      boxShadow: 'none',
                      height: '42px',
                      '&:hover': {
                        borderColor: 'gray'
                      }
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? '#3994EE'
                        : provided.backgroundColor,
                      color: state.isSelected ? 'white' : 'black'
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '16rem' // Adjust width as needed
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '16rem' // Adjust width as needed
                    })
                  }}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RenderSelect;
