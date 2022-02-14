import React, { createContext, useReducer } from "react";
import { formState } from "../reducers/formState";

export const FormContext = createContext();

const FormContextProvider = (props) => {
  const [formData, formDispatch] = useReducer(formState, {});

  return (
    <FormContext.Provider value={{ formData, formDispatch }}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
