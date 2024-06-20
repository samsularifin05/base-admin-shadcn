import { AppDispatch, AppThunk, utilityActions } from "@/reduxStore";

export const utilityController = <T>() => {
  const showModal = (namaForm: string, data?: T): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.showModal({
          isModalShow: true,
          isEdit: namaForm === "EDIT" ? true : false,
          data: data || [],
          namaForm: namaForm,
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
          namaForm: "",
        })
      );
    };
  };

  const simpanDataTmp = (namaForm: string, data?: T): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.simpanDataTmp({
          data: data,
          namaForm: namaForm,
        })
      );
    };
  };

  return {
    simpanDataTmp,
    showModal,
    hideModal,
  };
};
