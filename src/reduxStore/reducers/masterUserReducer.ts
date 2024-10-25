import { MetaInterFace } from "@/interface";
import { IMasterUserResponseDto } from "@/pages";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MasterUserState {
  getMasterUser: {
    data: IMasterUserResponseDto[];
    meta: MetaInterFace;
  };
}

const initialState: MasterUserState = {
  getMasterUser: {
    data: [],
    meta: {
      limit: 0,
      page: 0,
      total: 0
    }
  }
};

interface actionPayload {
  data: IMasterUserResponseDto[];
  meta: MetaInterFace;
}
const MasterUserSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMasterUser(state, action: PayloadAction<actionPayload>) {
      state.getMasterUser = {
        data: action.payload.data,
        meta: action.payload.meta
      };
    }
  }
});

const { setMasterUser } = MasterUserSlice.actions;

export const MasterUserAction = {
  setMasterUser
};

export default MasterUserSlice.reducer;
