import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/auth";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FormContextProvider from "./providers/formValues";
import AppDataContextProvider from "./providers/appData";

ReactDOM.render(
  <BrowserRouter>
    <AppDataContextProvider>
      <FormContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FormContextProvider>
    </AppDataContextProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
