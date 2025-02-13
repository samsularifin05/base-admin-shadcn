import * as yup from 'yup';

export const validLoginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email tidak sesuai'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  date: yup
    .mixed()
    .transform((value) => {
      // console.log(value);
      if (typeof value === 'object' && value !== null && value.startDate) {
        return {
          startDate: new Date(value.startDate).toISOString().split('T')[0],
          endDate: new Date(value.endDate).toISOString().split('T')[0]
        };
      }
      return value;
    })
    .test('is-valid-date', 'Tanggal harus dalam format YYYY-MM-DD', (value) => {
      if (typeof value === 'object' && value !== null) {
        console.log(value, 'MASUK');
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return typeof value === 'string' && regex.test(value);
      }
    })
    .optional()
});
