/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from '../ui';
import { IconCheck, IconCloudUpload, IconLoader } from '@tabler/icons-react';

interface RenderFileUploadProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  control: Control<FormValues>;
  label?: string;
  placeholder?: string;
  accept?: string;
  tabIndex?: number;
  onChange?: (file: File) => void;
  loading?: boolean;
}

const RenderFileUpload = <FormValues extends FieldValues>({
  name,
  control,
  label,
  tabIndex,
  placeholder,
  accept,
  onChange,
  loading = false
}: RenderFileUploadProps<FormValues>) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFileName(acceptedFiles[0].name);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept
      ? accept.split(',').reduce(
          (acc, type) => {
            const trimmed = type.trim();
            if (trimmed.startsWith('.')) {
              acc['application/octet-stream'] =
                acc['application/octet-stream'] || [];
              acc['application/octet-stream'].push(trimmed);
            } else {
              acc[trimmed] = [];
            }
            return acc;
          },
          {} as Record<string, string[]>
        )
      : undefined
  });

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        useEffect(() => {
          if (!field.value) {
            setFileName(null); // Reset fileName if field.value is null
          } else if (field.value as File) {
            setFileName(field.value.name);
          }
        }, [field.value]);
        return (
          <FormItem className="space-y-1">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed h-40 flex justify-center items-center rounded-lg p-4 text-center ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  <input
                    tabIndex={tabIndex}
                    {...getInputProps({
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        if (files?.[0]) {
                          setFileName(files[0].name);
                          if (onChange) onChange(files[0]);
                          field.onChange(files[0]); // Update form value
                        }
                      }
                    })}
                  />
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <IconLoader className="animate-spin" size={20} />
                        <span className="text-sm text-gray-600">
                          Uploading...
                        </span>
                      </div>
                    ) : (
                      <>
                        <IconCloudUpload />
                        <div className="mt-2 text-sm text-gray-600">
                          {fileName ? (
                            <div className="flex items-center gap-2">
                              File Upload {fileName} <IconCheck size={20} />
                            </div>
                          ) : (
                            placeholder || (
                              <p>
                                Drag and drop files here, or click to select
                                files
                              </p>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RenderFileUpload;
