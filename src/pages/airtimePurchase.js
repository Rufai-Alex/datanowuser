import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import etisalat from "../icons/9mobile.svg";
import glo from "../icons/glo.svg";
import airtel from "../icons/airtel.svg";
import mtn from "../icons/mtn.svg";
import loadingSmall from "../icons/loadingSmall.svg";
import axios from "axios";
import Nav from "../components/nav";
import PaymentType from "../components/paymentType";

import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../providers/formValues";

import { getOS } from "../helper/getOs";
import { AppDataContext } from "../providers/appData";
import { UserContext } from "../providers/userData";
import Alert from "../components/Alert";
import ConfirmationModel from "../components/confirmationModel";
import CurrencyFormat from "../helper/CurrencyFormat";

function AirtimePurchase() {
  const history = useHistory();
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
    console.log("forcused");
  };
  document.title = "Purchase Airtime-" + appData.business.name;
  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };
  const onPlanSelect = (network, atmPrice, walletPrice) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "network", value: network },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPrice", value: atmPrice },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPrice", value: walletPrice },
    });
  };

  useEffect(() => {
    if (!formData.ref) {
      formDispatch({
        type: "INPUTVALUES",
        data: { name: "ref", value: Math.random().toString(36).slice(2) },
      });
    }
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "network",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "password",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "phone_number",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "amount",
        value: "",
      },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPrice", value: "" },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPrice", value: "" },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "ConfirmationModal",
        value: {
          isOpen: false,
          type: "Data Subscription",
          description: "",
          receiver: "",
          amount: "",
          network: "",
        },
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
  function next(where) {
    history.push(where);
  }

  const onValidSubmit = (e) => {
    e.preventDefault();
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "ConfirmationModal",
        value: {
          isOpen: true,
          type: "Airtime Recharge",
          description: "Airtime Recharge",
          receiver: formData.phone_number,
          amount: formData.amount,
          network: formData.network,
        },
      },
    });
  };
  const handleSubmit = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "confirmationModal", value: { isOpen: false, text: "" } },
    });

    setSending(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    user.data && myHeaders.append("Authorization", "Bearer " + user.token);

    var urlencoded = new URLSearchParams();
    user.data &&
      !formData.atmPayment &&
      urlencoded.append("password", String(formData.password));
    !user.data &&
      formData.atmPayment &&
      urlencoded.append("email", String(formData.email));
    urlencoded.append("network", String(formData.network));
    urlencoded.append("phone_number", String(formData.phone_number));
    urlencoded.append("amount", String(formData.amount));
    urlencoded.append("payment_method", formData.atmPayment ? "ATM" : "WALLET");
    urlencoded.append("source", getOS());
    urlencoded.append("ref", formData.ref);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    fetch(localStorage.getItem("apiURL") + "airtime_purchase", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        if (data.status === "success" && formData.atmPayment) {
          window.location = data.data.payment_url;
          return;
        }

        console.log(data);
        if (data.status === "success") {
          if (formData.atmPayment) window.location = data.data.payment_url;
          else
            formDispatch({
              type: "INPUTVALUES",
              data: {
                name: "Alert",
                value: { isOpen: true, message: data.message },
              },
            });
          setSending(false);
        } else if (data.errors) {
          let errorString = "";
          const objectValues = Object.values(data.errors);
          objectValues.map((error) => {
            errorString = errorString + error + ", ";
          });

          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: errorString, type: "error" },
            },
          });
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
          setSending(false);
        } else if (data.message === "User Not Found") {
          history.push("/");
        } else {
          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: data.message, type: "error" },
            },
          });
          setSending(false);
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
        }
      })

      .catch((error) => {
        console.log("error", error);

        formDispatch({
          type: "INPUTVALUES",
          data: {
            name: "Alert",
            value: {
              isOpen: true,
              message: "unable to connect to server",
              type: "error",
            },
          },
        });
        setSending(false);
      });
  };

  return (
    <div className="flex">
      <div>
        <Nav />
      </div>
      <div className="flex-1 flex flex-col items-center mx-auto md:mt-12 ">
        {formData.Alert ? <Alert message={formData.Alert.message} /> : ""}
        {formData.ConfirmationModal ? (
          <div
          // className={`
          //   transform transition-all duration-500 ease-in-out
          //      ${
          //        formData.ConfirmationModal
          //          ? "  -translate-x-[1000px]"
          //          : "translate-x-0 "
          //      }`}
          >
            <ConfirmationModel onConfirmationClicked={handleSubmit} />
          </div>
        ) : (
          ""
        )}

        <div className="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8  relative mb-12 md:mb-0">
          <div className="px-4 py-8">
            <div className="flex justify-between items-center">
              <div className="flex justify-between item-center">
                <button
                  onClick={() => {
                    next("/home");
                  }}
                >
                  <img src={LeftAngle} alt="leftAngle" />
                </button>
                <h2 className="ml-8 font-medium text-sm md:text-xl">
                  Airtime Purchase
                </h2>
              </div>
              <img src={bell} alt="bell" className="md:hidden" />
            </div>
            <div className="">
              <h2 className="font-medium text-sm mt-9 md:text-lg">
                Select Network
              </h2>
              <div className="flex gap-4 mt-6 ">
                <button
                  onClick={() => {
                    onPlanSelect(
                      "MTN",
                      appData.airtime_plans.MTN.atm_price,
                      appData.airtime_plans.MTN.wallet_price,
                    );
                    console.log(formData.network);
                  }}
                >
                  <div className="flex flex-col justify-center items-center focus:border-red-500 focus:ring-1 focus:ring-red-500">
                    <div
                      className={
                        formData.network === "MTN"
                          ? "ring-primary-black ring-4 rounded-lg"
                          : ""
                      }
                    >
                      <img src={mtn} alt="mtn" className="md:h-28" />
                    </div>
                    <div className=" font-extrabold text-xs md:text-base mt-2.5">
                      MTN
                    </div>
                    <div className="flex flex-col justify-center items-center text-primary-gray text-xx  mt-2.5">
                      <span>
                        {" "}
                        {appData.airtime_plans.MTN.wallet_price < 100 && (
                          <p>{100 - appData.airtime_plans.MTN.wallet_price}%</p>
                        )}
                      </span>
                      <span>Discount</span>
                    </div>
                  </div>
                </button>
                <div
                  className="flex  flex-col justify-center items-center"
                  onClick={() => {
                    onPlanSelect(
                      "GLO",
                      appData.airtime_plans.GLO.atm_price,
                      appData.airtime_plans.GLO.wallet_price,
                    );
                    console.log(formData.network);
                  }}
                >
                  {" "}
                  <div
                    className={
                      formData.network === "GLO"
                        ? "ring-primary-black ring-4 rounded-lg"
                        : ""
                    }
                  >
                    <img src={glo} alt="glo" className="md:h-28" />
                  </div>
                  <div className=" font-extrabold text-xs mt-2.5 md:text-base">
                    GLO
                  </div>
                  <div className="flex flex-col justify-center items-center text-primary-gray text-xx md:text-sm  mt-2.5">
                    <span>
                      {" "}
                      {appData.airtime_plans.GLO.wallet_price < 100 && (
                        <p className="">
                          {100 - appData.airtime_plans.GLO.wallet_price}%
                        </p>
                      )}
                    </span>
                    <span>Discount</span>
                  </div>
                </div>
                <div
                  className="flex  flex-col justify-center items-center"
                  onClick={() => {
                    onPlanSelect(
                      "AIRTEL",
                      appData.airtime_plans.AIRTEL.atm_price,
                      appData.airtime_plans.AIRTEL.wallet_price,
                    );
                    console.log(formData.network);
                  }}
                >
                  <div
                    className={
                      formData.network === "AIRTEL"
                        ? "ring-primary-black ring-4 rounded-lg"
                        : ""
                    }
                  >
                    <img src={airtel} alt="airtel" className="md:h-28" />
                  </div>
                  <div className=" font-extrabold text-xs mt-2.5 md:text-base">
                    Airtel
                  </div>
                  <div className="flex flex-col justify-center items-center text-primary-gray text-xx mt-2.5">
                    <span>
                      {" "}
                      {appData.airtime_plans.AIRTEL.wallet_price < 100 && (
                        <p>
                          {100 - appData.airtime_plans.AIRTEL.wallet_price}%
                        </p>
                      )}
                    </span>
                    <span>Discount</span>
                  </div>
                </div>
                <div
                  className="flex  flex-col justify-center items-center"
                  onClick={() => {
                    onPlanSelect(
                      "ETISALAT",
                      appData.airtime_plans.ETISALAT.atm_price,
                      appData.airtime_plans.ETISALAT.wallet_price,
                    );
                    console.log(formData.network);
                  }}
                >
                  {" "}
                  <div
                    className={
                      formData.network === "ETISALAT"
                        ? "ring-primary-black ring-4 rounded-lg "
                        : ""
                    }
                  >
                    <img src={etisalat} alt="etisalat" className="md:h-28" />
                  </div>
                  <div className=" font-extrabold text-xs mt-2.5 md:text-base">
                    9mobile
                  </div>
                  <div className="flex flex-col justify-center items-center text-primary-gray text-xx  mt-2.5">
                    <span>
                      {" "}
                      {appData.airtime_plans.ETISALAT.wallet_price < 100 && (
                        <p>
                          {100 - appData.airtime_plans.ETISALAT.wallet_price}%
                        </p>
                      )}
                    </span>
                    <span>Discount</span>
                  </div>
                </div>
              </div>
            </div>{" "}
            <form onSubmit={onValidSubmit}>
              <div className="">
                <div className="mt-12">
                  <div className="w-full space-y-6">
                    <div className="w-full">
                      <div className=" relative ">
                        <label>
                          <div className="flex justify-between">
                            <div className="font-medium text-primary-black text-sm md:text-base">
                              {" "}
                              Phone Number
                            </div>
                            <div className="font-medium text-primary-gray text-sm md:text-base">
                              Balance: {`₦ ${user.data.wallet_balance}`}
                            </div>
                          </div>

                          <input
                            type="tel"
                            className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 md:py-3.5 md:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                            placeholder="08X XXX XXXX"
                            name="phone_number"
                            autoComplete="off"
                            value={formData.phone_number}
                            inputmode="numeric"
                            focused={focused.toString()}
                            pattern="^[0-9]{11,11}$"
                            required
                            onBlur={handleFocus}
                            onChange={(e) => {
                              formOnChange(e);
                            }}
                          />

                          <span>
                            Please enter a valid receiver phone number
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className=" relative ">
                        <label>
                          <p className="mt-4 font-medium text-primary-black text-sm md:text-base">
                            Amount to Recharge
                          </p>
                          <input
                            type="text"
                            inputmode="numeric"
                            focused={focused.toString()}
                            required
                            autoComplete="off"
                            pattern="^[0-9]{2,6}$"
                            className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 md:py-3.5 md:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange   focus:   mt-3"
                            placeholder="Min ₦50, Max ₦10,000"
                            name="amount"
                            onBlur={handleFocus}
                            onChange={(e) => {
                              formOnChange(e);
                            }}
                            value={formData.amount}
                          />

                          <span>Please Enter valid amount</span>
                        </label>
                      </div>
                    </div>
                    <div className="text-red-500 flex flex-col font-medium text-xs md:text-sm">
                      {formData.walletPrice < 100 && (
                        <p className="">
                          Wallet Discount: {100 - formData.walletPrice}%
                        </p>
                      )}
                      {formData.atmPrice < 100 && (
                        <p className="mt-2">
                          ATM Discount: {100 - formData.atmPrice}%
                        </p>
                      )}
                    </div>

                    <PaymentType />

                    <p className="mt-4 font-medium text-primary-black text-sm md:text-base">
                      Total Price:&nbsp;
                      <div className=" text-purple-800 inline">
                        ₦
                        {CurrencyFormat(
                          formData.atmPayment
                            ? (formData.atmPrice * formData.amount) / 100
                            : (formData.walletPrice * formData.amount) / 100,
                        )}
                      </div>
                    </p>

                    <div className="w-full">
                      {formData.atmPayment ? (
                        ""
                      ) : (
                        <div className=" relative ">
                          <label>
                            <p className="mt-4 font-medium text-primary-black text-sm md:text-base">
                              Password
                            </p>
                            <input
                              type="password"
                              className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 md:py-3.5 md:px-4  bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                              focused={focused.toString()}
                              required
                              name="password"
                              onChange={(e) => {
                                formOnChange(e);
                              }}
                              value={formData.password}
                            />
                            <span>Please enter your password </span>
                          </label>
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="block w-full rounded-md shadow-sm">
                        <button
                          className="py-2 px-4 md:py-4 md:px-8 bg-primary-orange hover:bg-primary-orange focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base  md:text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                          type="submit"
                          disabled={sending}
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
                            `Pay`
                          )}
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirtimePurchase;
