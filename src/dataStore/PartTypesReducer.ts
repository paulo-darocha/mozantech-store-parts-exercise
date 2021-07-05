export const LOAD_PART_TYPES = "loadPartTypes";

interface PartTypesAction {
  type: string,
  payload: Array<string> | null
}

export const PartTypesReducer = (
  reduxStore: any, action: PartTypesAction
) => {
  switch (action.type) {
    case LOAD_PART_TYPES:
      return action.payload;

    default:
      return reduxStore || {};
  }
};