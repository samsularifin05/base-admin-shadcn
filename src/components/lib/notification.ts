/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import toastMobile from 'react-hot-toast';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { calculateWindowSize } from './utils';

const screen = calculateWindowSize(window.innerWidth);
let isShow = false;

export const showConfirmation = (
  title: string,
  textBody?: string,
  iconInfo?: string,
  html?: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: title,
      text: textBody,
      html: html,
      icon: iconInfo as SweetAlertResult['value'], // Assume iconInfo is a valid SweetAlert icon type
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};

export const NotifSuccess = (
  text: any,
  position: ToastPosition = 'top-right'
) => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  };
  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === 'xs' || screen === 'md'
    ? toastMobile.success(text)
    : toast.success(text, options);
};

export const NotifError = (
  text: any,
  position: ToastPosition = 'top-right'
) => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  };

  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === 'xs' || screen === 'md'
    ? toastMobile.error(text)
    : toast.error(text, options);
};
export const NotifInfo = (text: any, position: ToastPosition = 'top-right') => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  };

  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === 'xs' || screen === 'md'
    ? toastMobile(text)
    : toast.info(text, options);
};

export const NotifWarning = (
  text: string,
  position: ToastPosition = 'top-right'
) => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  };
  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === 'xs' || screen === 'md'
    ? toastMobile(text)
    : toast.warning(text, options);
};
