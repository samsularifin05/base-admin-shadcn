import { combineReducers } from "redux";
import themeReducer from "./reducerTheme";
import utilityReducer from "./reducerUtility";
import formReducer from "./formReducer";
const rootReducer = combineReducers({
  utility: utilityReducer,
  theme: themeReducer,
  form: formReducer,
});

export { rootReducer };
