import { Serie } from "../../../models/Serie.interface";
import { Action } from "../models/Action.interface";

export const inputData = (value: Serie[]): Action => ({
  type: 'INPUT_DATA',
  payload: value
});
