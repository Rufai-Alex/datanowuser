import React from "react";
import { Redirect } from "react-router-dom";

import Loading from "../Loading/Loading";

const ProtectedRoute = (
  Component,
  { isLoggedIn, loading, userType, isLoginPage, handleLogout }
) => {
  if (isLoggedIn && userType === "user") {
    if (!isLoginPage) {
      return <Component />;
    } else if (isLoginPage) {
      return <Redirect to="/dashboard" />;
    }
  } else if (isLoggedIn && userType !== "user") {
    handleLogout();
  } else {
    if (loading) {
      return <Loading />;
    } else if (isLoginPage && !loading) {
      return <Component />;
    } else {
      return <Redirect to="/login" />;
    }
  }
};

export const ProtectedExco = (
  Component,
  { isLoggedIn, loading, userType, isLoginPage, handleLogout }
) => {
  if (isLoggedIn && userType === "exco") {
    if (!isLoginPage) {
      return <Component />;
    } else if (isLoginPage) {
      return <Redirect to="/exco/dashboard" />;
    }
  } else if (isLoggedIn && userType !== "exco") {
    handleLogout();
  } else {
    if (loading) {
      return <Loading />;
    } else if (isLoginPage && !loading) {
      return <Component />;
    } else {
      return <Redirect to="/exco/login" />;
    }
  }
};
export default ProtectedRoute;
