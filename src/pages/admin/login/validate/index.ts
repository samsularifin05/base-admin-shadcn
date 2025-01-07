import * as yup from 'yup';

export const validLoginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email tidak sesuai'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  curriculumnVitae: yup.mixed().nullable().required('LoA harus diisi'),
  tanggalPastiKeberangkatan: yup
    .string()
    .required('Tanggal perkiraan mulai tubel wajib diisi')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Tanggal harus dalam format YYYY-MM-DD')
});
