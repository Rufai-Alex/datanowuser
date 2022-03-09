import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/auth";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FormContextProvider from "./providers/formValues";
import AppDataContextProvider from "./providers/appData";
import UserContextProvider from "./providers/userData";

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <AppDataContextProvider>
        <FormContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </FormContextProvider>
      </AppDataContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
