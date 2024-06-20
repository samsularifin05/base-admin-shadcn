import { type ClassValue, clsx } from "clsx";
// import { DeepPartial } from "redux";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export function mapFormValuesToDto<T>(formValues: T): DeepPartial<T> {
  const mappedDto = { ...formValues };
  return mappedDto;
}
