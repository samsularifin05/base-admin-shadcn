import { Action } from "redux";
import { AppActionUtility, UtilityState } from "./utility";
import { FormStateMap } from "redux-form";

type RootAction = Action | AppActionUtility<string>;

export default RootAction;

export interface RootState<T> {
  utility: UtilityState<T>;
  form: FormStateMap;
}

export * from "./utility";
