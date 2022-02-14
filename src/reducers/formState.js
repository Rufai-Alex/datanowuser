export const formState = (state, action) => {
  switch (action.type) {
    case "INPUTVALUES": {
      return { ...state, [action.data.name]: action.data.value };
    }
    default:
      return state;
  }
};
