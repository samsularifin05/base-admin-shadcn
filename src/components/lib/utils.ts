import { type ClassValue, clsx } from 'clsx';
// import { DeepPartial } from "redux";
import { twMerge } from 'tailwind-merge';
import { getItem } from './localStroage';
import { IResponseLoginDto, ResponseLoginDto } from '@/interface';
import CryptoJS from 'crypto-js';

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

export function getLastDigit(roleId: string): 'user' | 'admin' {
  const lastChar = roleId?.charAt(roleId?.length - 1);
  return lastChar === '1' ? 'user' : 'admin';
}

export const getRole = (): 'user' | 'admin' => {
  const datauser = getItem<IResponseLoginDto>('datauser');
  const userRole = getLastDigit(datauser.role_id);

  return userRole;
};

export const formatToIndonesianDate = (dateString: string) => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  });

  return formatter.format(date);
};

export const { VITE_APP_SECRETKEY, VITE_APP_KEY, VITE_APP_BE_URL } = import.meta
  .env;

export const timoutDelay = (time: number = 100): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const generateSignature = (timestampApp: string) => {
  const userData = getItem<ResponseLoginDto>('userdata');

  const signature = CryptoJS.SHA256(
    VITE_APP_KEY +
      VITE_APP_SECRETKEY +
      (userData?.access_token || '') +
      timestampApp
  ).toString();

  return signature;
};
export const generateSecret = () => {
  const seCret = CryptoJS.SHA256(VITE_APP_SECRETKEY).toString();

  return seCret;
};

export const calculateWindowSize = (windowWidth: number): string => {
  if (windowWidth >= 1200) {
    return 'lg';
  } else if (windowWidth >= 992) {
    return 'md';
  } else if (windowWidth >= 768) {
    return 'sm';
  } else {
    return 'xs';
  }
};
