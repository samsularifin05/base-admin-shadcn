import masterBankReducer from '../../pages/admin/masterData/masterBank/redux';
import { combineReducers } from 'redux';
import themeReducer from './reducerTheme';
import utilityReducer from './reducerUtility';
import formReducer from './formReducer';
const rootReducer = combineReducers({
  utility: utilityReducer,
  masterBank: masterBankReducer,
  theme: themeReducer,
  form: formReducer
});

export { rootReducer };
