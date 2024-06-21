import * as yup from "yup";

export const validateMasterUser = yup.object().shape({
  username: yup.string().required("Username is required")
});
