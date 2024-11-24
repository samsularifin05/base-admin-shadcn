import { AppDispatch, AppThunk, utilityActions } from '@/reduxStore';
import { apiInstance, NotifInfo, NotifSuccess, urlApi } from '@/components';
import { ResponseMasterBankDto } from '../model';
import { setMasterBank } from '../redux';

export const getMasterBank = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(utilityActions.setLoading({ table: true }));
    try {
      const response = await apiInstance.get<ResponseMasterBankDto[]>(
        urlApi.masterData.masterBank
      );
      dispatch(
        setMasterBank({
          data: response.data || [],
          meta: {
            total: response.data.length,
            page: 1,
            limit: 10
          }
        })
      );
    } catch (error) {
      dispatch(
        setMasterBank({
          data: [],
          meta: {
            total: 0,
            page: 0,
            limit: 10
          }
        })
      );
    } finally {
      dispatch(utilityActions.stopLoading());
    }
  };
};

export const saveMasterBank = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch(utilityActions.setLoading({ table: true }));
    try {
      const state = getState();
      const formValues = state.form.MasterBank;
      await apiInstance.post(urlApi.masterData.masterBank, formValues);
      dispatch(getMasterBank());
      NotifSuccess('Master Bank Berhasil Ditambahkan');
      dispatch(utilityActions.stopLoading());
      dispatch(utilityActions.hideModal());
    } catch (error) {
      NotifInfo(error);
      dispatch(utilityActions.stopLoading());
    }
  };
};

export const deleteMasterBankById = (id: string | number): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(utilityActions.setLoading({ table: true }));
    try {
      await apiInstance.delete(urlApi.masterData.masterBank + '/' + id);
      dispatch(getMasterBank());
      NotifSuccess('Master Bank berhasil di hapus');
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      NotifInfo(error);
      dispatch(utilityActions.stopLoading());
    }
  };
};

export const updateMasterBankById = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch(utilityActions.setLoading({ table: true }));
    try {
      const state = getState();
      const formValues = state.form.MasterBank;
      await apiInstance.put(
        urlApi.masterData.masterBank + '/' + formValues._id,
        formValues
      );
      dispatch(getMasterBank());
      NotifSuccess('Master Bank berhasil di update');
      dispatch(utilityActions.stopLoading());
      dispatch(utilityActions.hideModal());
    } catch (error) {
      NotifInfo(error);
      dispatch(utilityActions.stopLoading());
    }
  };
};
