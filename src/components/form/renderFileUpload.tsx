/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from '../ui';
import {
  IconCheck,
  IconCloudUpload,
  IconLoader,
  IconTrash
} from '@tabler/icons-react';

interface RenderFileUploadProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  control: Control<FormValues>;
  label?: string;
  placeholder?: string;
  accept?: string;
  tabIndex?: number;
  onChange?: (files: File[]) => void;
  loading?: boolean;
  isMultiple?: boolean;
}

const RenderFileUpload = <FormValues extends FieldValues>({
  name,
  control,
  label,
  tabIndex,
  placeholder,
  accept,
  onChange,
  loading = false,
  isMultiple = false
}: RenderFileUploadProps<FormValues>) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleRemoveFile = (index: number, field: any) => {
    const updatedFileNames = [...fileNames];
    const updatedFiles = [...files];

    // Remove the selected file
    updatedFileNames.splice(index, 1);
    updatedFiles.splice(index, 1);

    // Update state
    setFileNames(updatedFileNames);
    setFiles(updatedFiles);

    // Update form value
    if (onChange) {
      onChange(updatedFiles);
    }
    field.onChange(isMultiple ? updatedFiles : updatedFiles[0] || null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // onDrop,
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
      : undefined,
    multiple: isMultiple
  });

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        useEffect(() => {
          if (!field.value) {
            setFileNames([]);
            setFiles([]);
          } else if (isMultiple && Array.isArray(field.value)) {
            setFileNames(field.value.map((file: File) => file.name));
            setFiles(field.value);
          } else if (!isMultiple && (field.value as File)) {
            setFileNames([field.value.name]);
            setFiles([field.value]);
          }
        }, [field.value]);

        return (
          <FormItem className="space-y-1">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed ${fileNames.length > 0 ? 'h-auto' : 'h-40'} flex rounded-lg p-5${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  <input
                    tabIndex={tabIndex}
                    {...getInputProps({
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const fileList = e.target.files;
                        if (fileList) {
                          const acceptedFiles = Array.from(fileList);

                          setFileNames((prev) =>
                            isMultiple
                              ? [
                                  ...prev,
                                  ...acceptedFiles.map((file) => file.name)
                                ]
                              : [acceptedFiles[0].name]
                          );
                          setFiles((prev) =>
                            isMultiple
                              ? [...prev, ...acceptedFiles]
                              : acceptedFiles
                          );

                          // Trigger onChange callbacks
                          if (onChange) {
                            onChange(
                              isMultiple ? acceptedFiles : [acceptedFiles[0]]
                            );
                          }
                          field.onChange(
                            isMultiple
                              ? [...files, ...acceptedFiles]
                              : acceptedFiles[0]
                          );
                        }
                      }
                    })}
                  />
                  <div className="flex items-center w-full p-4">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <IconLoader className="animate-spin" size={20} />
                        <span className="text-sm text-gray-600">
                          Uploading...
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-center">
                          <IconCloudUpload />
                        </div>
                        <div className="flex mt-2 text-sm text-gray-600">
                          {fileNames.length > 0 ? (
                            <div className="w-full space-y-2">
                              {fileNames.map((name, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between w-full gap-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm"
                                >
                                  <span className="w-full text-left text-gray-700 truncate">
                                    {name.slice(0, 30)}...
                                  </span>
                                  <div className="flex items-center flex-shrink-0 gap-2">
                                    <IconCheck
                                      size={20}
                                      className="text-green-500"
                                    />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent event from bubbling to the file input
                                        handleRemoveFile(index, field);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <IconTrash size={20} />
                                    </button>
                                  </div>
                                </div>
                              ))}
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
                      </div>
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
