/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui";
import Select from "react-select";
// import { OptionTypeBase, Props as SelectProps } from "react-select";

interface TypedSelectProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  options: { value: string; label: string }[];
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (value: { value: string; label: string } | null) => void;
  primaryColor?: string;
}

const RenderSelect = <FormValues extends Record<string, any>>({
  name,
  label,
  control,
  options,
  placeholder,
  onChange,
}: TypedSelectProps<FormValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Convert options to the format required by react-select
        const selectOptions = options.map((option) => ({
          value: option.value,
          label: option.label,
        }));

        return (
          <FormItem className="space-y-1">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                value={
                  selectOptions.find(
                    (option) => option.value === field.value,
                  ) || null
                }
                onChange={(selected) => {
                  if (selected) {
                    field.onChange(selected.value); // Update form state
                    if (onChange) {
                      onChange(selected);
                    }
                  } else {
                    field.onChange(null);
                  }
                }}
                options={selectOptions}
                placeholder={placeholder}
                // isDisabled={readOnly}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "100%",
                    borderColor: "",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "gray",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#35A576"
                      : provided.backgroundColor,
                    color: state.isSelected ? "white" : "black",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "16rem", // Adjust width as needed
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "16rem", // Adjust width as needed
                  }),
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RenderSelect;
