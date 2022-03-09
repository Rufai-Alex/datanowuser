export const userReducer = (state, action) => {
  switch (action.type) {
    case "STORE_USER_DATA": {
      return action.user;
    }

    case "UPDATE_USER": {
      return { ...state, data: action.action.data };
    }

    case "UPDATE_USER_NOTIFICATION": {
      return { ...state, notification: action.action };
    }

    case "SIGNOUT": {
      return [];
    }
    default:
      return state;
  }
};
