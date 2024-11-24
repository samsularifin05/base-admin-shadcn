import * as yup from 'yup';

export const validateMasterBank = yup.object().shape({
  _id: yup.string().nullable(),
  kode_bank: yup.string().required('Kode Bank is required'),
  nama_bank: yup.string().required('Nama Bank is required')
});
