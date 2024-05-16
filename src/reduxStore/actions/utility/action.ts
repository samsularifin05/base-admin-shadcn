import { Dispatch } from "react";
import { AppThunk } from "../../reducers";
import {
  AppActionTypes,
  DataTmp,
  LoadingData,
  SetLoadingAction,
  SimpanDataTmpAction
} from "./type";

export const simpanDataTmp = <T>(data: DataTmp<T>): AppThunk => {
  return async (dispatch: Dispatch<SimpanDataTmpAction<T>>) => {
    dispatch({
      type: AppActionTypes.DATA_TMP,
      payload: data
    });
  };
};

const setLoading = (data: LoadingData): SetLoadingAction => ({
  type: AppActionTypes.IS_LOADING,
  payload: data
});

const utilityActions = {
  simpanDataTmp,
  setLoading
};
export default utilityActions;
