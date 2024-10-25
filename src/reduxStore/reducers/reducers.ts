import { combineReducers } from "redux";
import themeReducer from "./reducerTheme";
import utilityReducer from "./reducerUtility";
import formReducer from "./formReducer";
import masterUserReducer from "./masterUserReducer";
const rootReducer = combineReducers({
  utility: utilityReducer,
  theme: themeReducer,
  form: formReducer,
  dataMaster: combineReducers({
    masterUser: masterUserReducer
  })
});

export { rootReducer };
