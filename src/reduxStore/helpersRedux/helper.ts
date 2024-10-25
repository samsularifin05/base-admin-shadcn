/* eslint-disable react-hooks/rules-of-hooks */
import { useFormReset } from "@/components/form/FormResetContext";
import {
  AppDispatch,
  AppThunk,
  FormStateReduxFom,
  resetDefaultForm,
  utilityActions
} from "@/reduxStore";

export const utilityController = <T>() => {
  const { reset } = useFormReset();

  const resetForm = (form: keyof FormStateReduxFom): AppThunk => {
    return async (dispatch: AppDispatch) => {
      reset();
      dispatch(resetDefaultForm(form));
    };
  };
  const showModal = (namaForm: string, data?: T): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.showModal({
          isModalShow: true,
          isEdit: namaForm === "EDIT" ? true : false,
          data: data || [],
          namaForm: namaForm
        })
      );
    };
  };
  const hideModal = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.showModal({
          isModalShow: false,
          isEdit: false,
          data: [],
          namaForm: ""
        })
      );
    };
  };

  const simpanDataTmp = (namaForm: string, data?: T): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.simpanDataTmp({
          data: data,
          namaForm: namaForm
        })
      );
    };
  };

  return {
    simpanDataTmp,
    showModal,
    hideModal,
    resetForm
  };
};
