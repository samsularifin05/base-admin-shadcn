import * as yup from 'yup';

export const validateMasterBank = yup.object().shape({
  _id: yup.string().nullable(),
  nomor_akun: yup.string().required('Nomor Akun is required'),
  kode_bank: yup.string().required('Kode Bank is required'),
  nama_bank: yup.string().required('Nama Bank is required')
});
