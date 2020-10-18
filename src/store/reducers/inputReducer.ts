import { Action } from "../actions/models/Action.interface";

const initialState = {
  data: null
};

export default function searchReducer(state = initialState, action: Action) {
  switch(action.type) {
    case 'INPUT_DATA':
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}