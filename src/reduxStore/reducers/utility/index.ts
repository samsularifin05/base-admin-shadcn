import { AppActionUtility, AppActionTypes, UtilityState } from "../../actions";

function initialState<T>(): UtilityState<T> {
  return {
    getDataTmp: {
      data: [] as T
    },
    getLoading: {
      table: false,
      button: false,
      screen: false
    }
  };
}

const utility = <T>(
  state: UtilityState<T> = initialState(),
  action: AppActionUtility<T>
): UtilityState<T> => {
  switch (action.type) {
    case AppActionTypes.IS_LOADING:
      return {
        ...state,
        getLoading: action.payload
      };
    case AppActionTypes.DATA_TMP:
      return {
        ...state,
        getDataTmp: action.payload
      };

    default:
      return state;
  }
};

export default utility;
