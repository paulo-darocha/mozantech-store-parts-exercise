import IPart from "../models/IPart";

export const LOAD_PARTS = "loadParts";


interface PartAction {
  type: string,
  payload: Array<IPart> | null
}

export const PartsReducer = (
  reduxStore: any, action: PartAction
) => {
  switch (action.type) {
    case LOAD_PARTS:
      return action.payload;

    default:
      return reduxStore || {};
  }
};