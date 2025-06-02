import * as yup from 'yup';

export const validLoginSchema = yup.object().shape({
  // Validasi email
  email: yup
    .string()
    .required('Email is required') // Email harus diisi
    .email('Email tidak sesuai'), // Validasi format email

  // Validasi password
  password: yup
    .string()
    .required('Password is required') // Password harus diisi
    .min(6, 'Password must be at least 6 characters') // Panjang password minimal 6 karakter
});
