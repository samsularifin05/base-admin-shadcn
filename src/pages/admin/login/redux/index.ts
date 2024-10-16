/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
// import { FormLoginDto } from "../dto";
import {
  AppDispatch,
  AppThunk,
  themesActions,
  utilityController
} from "@/reduxStore";
import { toast } from "react-toastify";

export const serviceLogin = () => {
  const utility = utilityController();
  const navigate = useNavigate();
  const login = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const data = state.form.LoginForm;

      if (data.email === "admin@admin.com" && data.password === "admin1234") {
        navigate("/admin/dashboard");
        dispatch(themesActions.setIsLogin(true));
        dispatch(utility.resetForm());
      } else {
        toast.info("Username password salah");
      }
    };
  };

  return {
    login
  };
};
