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
    .min(6, 'Password must be at least 6 characters'), // Panjang password minimal 6 karakter

  // Validasi untuk array hadiah
  hadiah: yup.array().of(
    yup.object().shape({
      nama: yup.string().required('Nama hadiah is required'),
      nilai: yup
        .number() // Pastikan tipe nilai adalah number
        .required('Nilai hadiah is required')
        .positive('Nilai hadiah must be a positive number')
    })
  ),

  // Validasi untuk array produk
  produk: yup.array().of(
    yup.object().shape({
      nama: yup
        .string()
        .required('Nama produk is required') // Nama produk harus diisi
        .min(3, 'Nama produk must be at least 3 characters'), // Nama produk minimal 3 karakter
      jumlah: yup
        .number() // Pastikan tipe jumlah adalah number
        .required('Jumlah produk is required')
        .positive('Jumlah produk must be a positive number')
        .integer('Jumlah produk must be an integer')
    })
  )
});
