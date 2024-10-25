import { type ClassValue, clsx } from "clsx";
// import { DeepPartial } from "redux";
import { twMerge } from "tailwind-merge";
import { getItem } from "./localStroage";
import { IResponseLoginDto } from "@/interface";

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

export function getLastDigit(roleId: string): "user" | "admin" {
  const lastChar = roleId?.charAt(roleId?.length - 1);
  return lastChar === "1" ? "user" : "admin";
}

export const getRole = (): "user" | "admin" => {
  const datauser = getItem<IResponseLoginDto>("datauser");
  const userRole = getLastDigit(datauser.role_id);

  return userRole;
};

export const formatToIndonesianDate = (dateString: string) => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  });

  return formatter.format(date);
};
