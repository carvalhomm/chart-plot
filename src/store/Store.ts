import { combineReducers, createStore } from 'redux';
import searchReducer from './reducers/inputReducer';

const reducers = combineReducers({
  inputData: searchReducer,
});

const storeConfig = createStore(reducers);

export default storeConfig;
