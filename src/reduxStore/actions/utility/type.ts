import { Action } from "redux";

export const AppActionTypes = {
  DATA_TMP: "DATA_TMP",
  IS_LOADING: "IS_LOADING"
} as const;

export interface SimpanDataTmpAction<T>
  extends Action<typeof AppActionTypes.DATA_TMP> {
  payload: DataTmp<T>;
}

export interface SetLoadingAction
  extends Action<typeof AppActionTypes.IS_LOADING> {
  payload: LoadingData;
}
export interface LoadingData {
  table?: boolean;
  button?: boolean;
  screen?: boolean;
}
export interface DataTmp<T> {
  data?: T;
  namaForm?: string;
}
export interface UtilityState<T> {
  getDataTmp: DataTmp<T>;
  getLoading: LoadingData;
}

export type AppActionUtility<T> = SimpanDataTmpAction<T> | SetLoadingAction;
