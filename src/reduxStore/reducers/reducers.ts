import {
  legacy_createStore as createStore,
  combineReducers,
  Action,
  applyMiddleware
} from "redux";
import utilityReducer from "./utility";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import RootAction, { RootState } from "../actions";
import { reducer as formReducer } from "redux-form";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

export type GenericState<T> = RootState<T>;

export const rootReducer = combineReducers({
  form: formReducer,
  utility: utilityReducer,
  utility2: utilityReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<
  GenericState<string>,
  unknown,
  RootAction
>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  GenericState<string>,
  unknown,
  Action<string>
>;

export const useAppSelector: TypedUseSelectorHook<GenericState<string>> =
  useSelector;

export default store;
