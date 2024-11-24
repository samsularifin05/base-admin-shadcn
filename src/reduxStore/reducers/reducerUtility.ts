import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  table?: boolean;
  button?: boolean;
  screen?: boolean;
}

interface ModalState<T> {
  isModalShow: boolean;
  isEdit: boolean;
  data: T | T[];
  namaForm: string;
}

interface UtilityState<T> {
  getLoading: LoadingState;
  getModal: ModalState<T | T[]>;
  hideModal: ModalState<T>;
  setLoadingTabel: boolean;
  getShowButtonDelete: boolean;
  getDataEdit: T[];
  getDataTmp: T | T[] | null;
}

const initialState = <T>(): UtilityState<T> => ({
  getLoading: {
    table: false,
    button: false,
    screen: false,
  },
  getModal: {
    isModalShow: false,
    isEdit: false,
    data: [],
    namaForm: "",
  },
  hideModal: {
    isModalShow: false,
    isEdit: false,
    data: [],
    namaForm: "",
  },
  setLoadingTabel: false,
  getShowButtonDelete: false,
  getDataEdit: [],
  getDataTmp: [],
});

const utilitySlice = createSlice({
  name: "utility",
  initialState: initialState,
  reducers: {
    showButtonDelete(state, action: PayloadAction<boolean>) {
      state.getShowButtonDelete = action.payload;
    },
    setLoadingTabel(state, action: PayloadAction<boolean>) {
      state.setLoadingTabel = action.payload;
    },
    getDataEdit<T>(state: UtilityState<T>, action: PayloadAction<T[]>) {
      state.getDataEdit = action.payload;
    },
    setLoading(state, action: PayloadAction<LoadingState>) {
      state.getLoading = action.payload;
    },

    stopLoading(state) {
      state.getLoading = {
        screen: false,
        button: false,
        table: false,
      };
    },
    hideModal(state) {
      state.getModal = {
        isModalShow: false,
        isEdit: false,
        data: [],
        namaForm: "",
      };
    },
    showModal<T>(
      state: UtilityState<T>,
      action: PayloadAction<ModalState<T | T[]>>,
    ) {
      // console.log(action.payload);
      state.getModal = action.payload;
    },
    simpanDataTmp<T>(state: UtilityState<T>, action: PayloadAction<T | T[]>) {
      state.getDataTmp = action.payload;
    },
  },
});

const {
  showButtonDelete,
  setLoadingTabel,
  getDataEdit,
  setLoading,
  hideModal,
  showModal,
  simpanDataTmp,
  stopLoading,
} = utilitySlice.actions;

export const utilityActions = {
  showButtonDelete,
  setLoadingTabel,
  getDataEdit,
  setLoading,
  hideModal,
  showModal,
  simpanDataTmp,
  stopLoading,
};

export default utilitySlice.reducer;
