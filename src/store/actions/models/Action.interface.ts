import { ActionType } from "./ActionTypes.type";

export interface Action {
  payload: any;
  type?: ActionType;
}
