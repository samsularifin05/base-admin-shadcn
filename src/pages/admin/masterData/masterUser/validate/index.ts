import * as yup from "yup";

export const validateMasterUser = yup.object().shape({
  username: yup.string().required("Username is required"),
  nama_lengkap: yup.string().required("Nama Lengkap is required"),
  no_hp: yup.string().required("No Hp is required")
});
