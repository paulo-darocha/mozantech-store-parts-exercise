import { combineReducers, createStore } from "redux";
import { PartsReducer } from "./PartsReducer";
import { PartTypesReducer } from "./PartTypesReducer";
import { WaitingReducer } from "./WaitingReducer";

const rootReducer = combineReducers({
  parts: PartsReducer,
  partTypes: PartTypesReducer,
  waiting: WaitingReducer
});
export type DataType =  ReturnType<typeof rootReducer>;


const dataStore = () => {
  return createStore(rootReducer, {});
};
export default dataStore;