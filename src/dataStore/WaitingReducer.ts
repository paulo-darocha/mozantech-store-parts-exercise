export const WAITING = "waiting";

interface WaitingAction {
  type: string,
  payload: boolean
}

export const WaitingReducer = (
  reduxStore = true, action: WaitingAction
) => {
  switch (action.type) {
    case WAITING:
      return action.payload;

    default:
      return reduxStore;
  }
};