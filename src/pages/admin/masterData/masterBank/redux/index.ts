import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetMasterBankDto, initialState } from './type';

const MasterBankReducer = createSlice({
  name: 'MasterBank',
  initialState,
  reducers: {
    setMasterBank(state, action: PayloadAction<GetMasterBankDto>) {
      state.getMasterBank = action.payload;
    }
  }
});

const { setMasterBank } = MasterBankReducer.actions;

export { setMasterBank };

export default MasterBankReducer.reducer;
