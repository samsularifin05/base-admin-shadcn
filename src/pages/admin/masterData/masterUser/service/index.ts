import {
  AppDispatch,
  AppThunk,
  MasterUserAction,
  utilityActions,
  utilityController
} from "@/reduxStore";
import { sampleDataMasterUser } from "../exampleData";
import { MetaInterFace } from "@/interface";
import { toast } from "react-toastify";

export const serviceMasterUser = () => {
  const utility = utilityController();
  const save = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();

      console.log(state.form.FormMasterUser);

      dispatch(utility.resetForm("FormMasterUser"));

      dispatch(utilityActions.hideModal());

      toast.success("Data Berhasil Di Simpan");
    };
  };
  return {
    save
  };
};
export const getMasterUser = (row?: MetaInterFace): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const page = row?.page || 1;
    const limit = row?.limit || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = sampleDataMasterUser.slice(startIndex, endIndex);

    dispatch(
      MasterUserAction.setMasterUser({
        data: paginatedData,
        meta: {
          page: page,
          limit: limit,
          total: sampleDataMasterUser.length
        }
      })
    );
  };
};
