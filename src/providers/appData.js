import React, { createContext, useReducer, useEffect } from "react";
import { appDataReducer } from "../reducers/appDataReducer";

export const AppDataContext = createContext();

const AppDataContextProvider = (props) => {
  const [appData, dispatch] = useReducer(appDataReducer, [], () => {
    const localData = localStorage.getItem("appData");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(appData));
  }, [appData]);

  return (
    <AppDataContext.Provider value={{ appData, dispatch }}>
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataContextProvider;
