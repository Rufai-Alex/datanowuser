import React, { useState, useContext, useEffect, Suspense } from "react";
import Loading from "../src/components/Loading/Loading";
import "./App.css";
import { useReducer } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import AuthProvider, { AuthContext } from "./providers/auth";

import axios from "axios";
import { AppDataContext } from "./providers/appData";
import { UserContext } from "./providers/userData";
import TranserToUser from "./pages/transerToUser";
import SignOut from "./pages/signOut";

const AirtimePurchase = React.lazy(() => import("./pages/airtimePurchase"));
const Balance = React.lazy(() => import("./pages/balance"));
const CablePurchase = React.lazy(() => import("./pages/cablePurchase"));
const Contact = React.lazy(() => import("./pages/contact"));
const DataPurchase = React.lazy(() => import("./pages/dataPurchase"));
const Faq = React.lazy(() => import("./pages/faq"));
const Home = React.lazy(() => import("./pages/home"));
const LoginPage = React.lazy(() => import("./pages/loginPage"));
const Profile = React.lazy(() => import("./pages/profile"));
const SignUp = React.lazy(() => import("./pages/signUp"));
const Subcription = React.lazy(() => import("./pages/subcription"));
const Wallet = React.lazy(() => import("./pages/wallet"));
const AutoAgentFund = React.lazy(() => import("./pages/autoAgentFund"));
const MonifyFund = React.lazy(() => import("./pages/monifyFund"));
const AtmFund = React.lazy(() => import("./pages/atmFund"));
const ElectricityPayments = React.lazy(() =>
  import("./pages/electricityPayments"),
);

function App() {
  const { user, userDispatch } = useContext(UserContext);
  const { dispatch, appData } = useContext(AppDataContext);
  console.log(appData);

  const history = useHistory();

  localStorage.setItem("apiURL", "https://api.datanow.ng/api/user/882285/");
  console.log(localStorage.getItem("apiURL") + "data");

  // const fetchAppData = () => {
  //   fetch("https://api.datanow.ng/api/user/882285/data")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       appDatas(response);
  //       console.log(response);
  //     });
  // };

  const fetchAppData = () => {
    var dataURL = localStorage.getItem("apiURL") + "data";

    fetch(dataURL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        document.documentElement.style.setProperty(
          "--primary-color",
          response.data.business.primary_color,
        );
        document.documentElement.style.setProperty(
          "--secondary-color",
          response.data.business.secondary_color,
        );
        dispatch({
          type: "STORE_APP_DATA",
          appData: {
            is_mobile: appData.is_mobile,
            timestamp: new Date().getTime(),
            ...response.data,
          },
        });
        console.log(appData);
      });
  };

  useEffect(() => {
    !appData.settings
      ? fetchAppData()
      : !appData.timestamp
      ? fetchAppData()
      : new Date().getTime() - appData.timestamp > 7200000 && fetchAppData();
  }, []);

  console.log(user.data);

  console.log(appData);

  if (!appData.settings) return <div></div>;
  else {
    return (
      <div className="font-Montserrat">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              <LoginPage />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/subcription">
              <Subcription />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/data">
              <DataPurchase />
            </Route>
            <Route path="/airtime">
              <AirtimePurchase />
            </Route>
            <Route path="/cable">
              <CablePurchase />
            </Route>
            <Route path="/electricity">
              <ElectricityPayments />
            </Route>
            <Route path="/code">
              <Balance />
            </Route>
            <Route path="/faq">
              <Faq />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/signout">
              <SignOut />
            </Route>
            <Route path="/outoAgent">
              <AutoAgentFund />
            </Route>
            <Route path="/monify">
              <MonifyFund />
            </Route>
            <Route path="/atm">
              <AtmFund />
            </Route>
            <Route path="/transferToUser">
              <TranserToUser />
            </Route>
          </Switch>
        </Suspense>
      </div>
    );
  }
}
export default App;
