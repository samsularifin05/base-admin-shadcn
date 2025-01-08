import * as yup from 'yup';

export const validLoginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email tidak sesuai'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});
