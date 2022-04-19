import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";
import { FormContext } from "../providers/formValues";
import loadingSmall from "../icons/loadingSmall.svg";
import CurrencyFormat from "../helper/CurrencyFormat";

import Alert from "../components/Alert";

function AtmFund() {
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [sending, setSending] = useState(false);
  document.title = "Fund Wallet with ATM-" + appData.business.name;

  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });

    let charge = (e.target.value * 1.4) / 100;
    let vat = (charge * 7) / 100;

    let balance = e.target.value - charge - vat;
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "charge", value: charge + vat },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "balance", value: balance },
    });
  };

  useEffect(() => {
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "balance",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "charge",
        value: "",
      },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "Alert",
        value: { isOpen: false, message: "" },
      },
    });
    document.documentElement.style.setProperty(
      "--primary-color",
      appData.business.primary_color,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      appData.business.secondary_color,
    );
  }, []);
  const handleSubmit = (e) => {
    e.persist();
    e.preventDefault();
    setSending(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var urlencoded = new URLSearchParams();
    urlencoded.append("amount", String(formData.amount));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    fetch(localStorage.getItem("apiURL") + "fund_wallet", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        if (data.status === "success") {
          window.location = data.data.payment_url;
          return;
        }
        setSending(false);
        console.log(data);
        if (data.status === "success") {
          window.location = data.data.payment_url;
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
          history.push("/");
        } else {
          formDispatch({
            type: "SET_ERROR",
            data: data.message,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        formDispatch({
          type: "SET_ERROR",
          data: "unable to connect to server",
        });
        setSending(false);
      });
  };
  const history = useHistory();
  const back = () => {
    history.push("/home");
  };
  console.log(formData);
  return (
    <div className="flex flex-col items-center  max-w-md h-full">
      {formData.Alert ? <Alert message={formData.Alert.message} /> : ""}
      <div className="flex bg-white  h-h90 flex-col w-full  rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <button onClick={back}>
                <img src={LeftAngle} alt="leftAngle" />
              </button>

              <h2 className="ml-8 font-medium text-sm">Fund via ATMt</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
          <div className="divide-y-2 divide-primary-gray">
            <div className="flex flex-col mt-8 space-y-3.5 pb-9">
              <div className="flex justify-between ">
                {" "}
                <p className="font-medium text-sm text-primary-gray">Status:</p>
                <p className="font-semibold text-sm text-red-500 ">
                  {appData.master_settings.fund_status_atm * 1 === 0 ? (
                    <p className="font-semibold text-sm text-green-500 ">
                      Working
                    </p>
                  ) : (
                    <p className="font-semibold text-sm text-red-500 ">
                      Downtime
                    </p>
                  )}
                </p>
              </div>
              <div className="flex justify-between ">
                {" "}
                <p className="font-medium text-sm text-primary-gray">
                  Delivery time: :
                </p>
                <p className="font-semibold text-sm text-primary-black ">
                  1 - 3 Minutes
                </p>
              </div>
              <div className="flex justify-between ">
                {" "}
                <p className="font-medium text-sm text-primary-gray">
                  Supports:
                </p>
                <p className="font-semibold text-sm text-primary-black ">
                  VISA, MASTERCARD, VERVE
                </p>
              </div>
            </div>
            <div className="pt-4 text-red-500 text-sm">
              Transaction Fee: 1.4%
            </div>
          </div>
          <div className="flex flex-col mt-7">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <div className=" relative ">
                  <label>
                    <p className="mt-4 font-medium text-primary-black text-sm">
                      Amount to Recharge
                    </p>
                    <input
                      name="amount"
                      type="text"
                      required
                      inputMode="numeric"
                      pattern="[5-9]\d{2,}"
                      autoComplete="off"
                      className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                      placeholder={
                        "Enter amount-Min ₦ " +
                        appData.settings.minimum_atm_funding
                      }
                      value={formData.amount}
                      onChange={(e) => {
                        formOnChange(e);
                      }}
                    />
                    <p className="font-medium text-xs text-primary-black mt-4">
                      TRANSACTION FEE:{" "}
                      {formData.balance && (
                        <b className="text-red-500">
                          ₦{CurrencyFormat(formData.charge)}
                        </b>
                      )}
                    </p>
                    <p className="font-medium text-xs text-primary-black mt-4">
                      {formData.balance && (
                        <b>
                          ₦{CurrencyFormat(formData.balance)} WILL BE PAID INTO
                          YOUR WALLET
                        </b>
                      )}
                    </p>
                  </label>
                </div>
              </div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-primary-orange  focus:ring-primary-orange  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                  >
                    {sending ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={loadingSmall}
                          alt="loading ..."
                          className="w-7 h-7 "
                        />
                      </div>
                    ) : (
                      ` Pay`
                    )}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default AtmFund;
