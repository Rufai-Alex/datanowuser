import React, { useContext, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../providers/userData";

const SignOut = (props) => {
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    userDispatch({ type: "SIGNOUT" });
    props.history.push("/");
  });

  return <Redirect to="/" />;
};

export default withRouter(SignOut);
