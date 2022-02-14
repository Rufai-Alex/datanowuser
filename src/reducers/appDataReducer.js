export const appDataReducer = (state, action) => {
  switch (action.type) {
    case "STORE_APP_DATA": {
      return action.appData;
    }
    default:
      return state;
  }
};
