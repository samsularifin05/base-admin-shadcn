/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from '../ui';
import { IconCheck, IconCloudUpload } from '@tabler/icons-react';

interface RenderFileUploadProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  control: Control<FormValues>;
  label: string;
  tabIndex?: number;
}

const RenderFileUpload = <FormValues extends FieldValues>({
  name,
  control,
  label,
  tabIndex
}: RenderFileUploadProps<FormValues>) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFileName(acceptedFiles[0].name);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        useEffect(() => {
          if (field.value !== undefined) {
            field.onChange(field.value || '');
          }
        }, [field]);

        return (
          <FormItem className="space-y-1">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {/* Tambahkan wrapper di sini */}
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
                          setFileName(files[0].name); // Set nama file
                          field.onChange(files[0]); // Update nilai form
                        }
                      }
                    })}
                  />
                  <div className="flex flex-col items-center">
                    <IconCloudUpload />
                    <p className="mt-2 text-sm text-gray-600">
                      {fileName ? (
                        <div className="flex items-center gap-2">
                          File Upload {fileName} <IconCheck size={20} />{' '}
                        </div>
                      ) : (
                        'Drag here or click to upload'
                      )}
                    </p>
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
