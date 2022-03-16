import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import etisalat from "../icons/9mobile.svg";
import glo from "../icons/glo.svg";
import airtel from "../icons/airtel.svg";
import mtn from "../icons/mtn.svg";
import loadingSmall from "../icons/loadingSmall.svg";
import axios from "axios";
import Nav from "../components/nav";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../providers/formValues";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { airtimePurchaseSchema } from "../components/validation";
import { getOS } from "../helper/getOs";
import { AppDataContext } from "../providers/appData";
import { UserContext } from "../providers/userData";

function AirtimePurchase() {
  const history = useHistory();
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(airtimePurchaseSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
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
  const selectAmount = (amount) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "amount", value: amount },
    });
  };
  const selectpaymentMethod = (paymentMethod) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "paymentMethod", value: paymentMethod },
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
  function next(where) {
    history.push(where);
  }

  const onsubmit = (e) => {
    e.preventDefault();
    setSending(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    user.data && myHeaders.append("Authorization", "Bearer " + user.token);

    var urlencoded = new URLSearchParams();

    // formData.paymentMethod == "walletpayment" &&
    //   urlencoded.append("password", String(formData.password));

    // formData.paymentMethod == "atmpayment" &&
    //   urlencoded.append("email", String(user.data.email));

    // eslint-disable-next-line no-lone-blocks
    {
      formData.paymentMethod === "atmpayment"
        ? urlencoded.append("email", String(user.data.email))
        : urlencoded.append("password", String(formData.password));
    }
    urlencoded.append("network", String(formData.network));
    urlencoded.append("phone_number", String(formData.phone_number));
    urlencoded.append("amount", String(formData.amount));
    urlencoded.append("source", getOS());
    urlencoded.append("ref", formData.ref);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    console.log(requestOptions);
    console.log(formData.paymentMethod);

    fetch(
      localStorage.getItem("apiURL") + "wallet_airtime_purchase",
      requestOptions,
    )
      .then((response) => (response = response.text()))
      .then((response) => {
        console.log(response);
        const data = JSON.parse(response);
        console.log("====================================");
        console.log(response);
        console.log("====================================");

        console.log(data);
        if (data.status === "success") {
          setSending(false);
          if (formData.paymentMethod === "atmPayment")
            window.location = data.data.payment_url;
          else
            formDispatch({
              type: "SET_FORM_DATA",
              data: {
                name: "responseModal",
                value: { isOpen: true, text: data.message },
              },
            });
          alert(data.message);
        } else if (data.errors) {
          setSending(false);
          let errorString = "";
          const objectValues = Object.values(data.errors);
          objectValues.map((error) => {
            errorString = errorString + error + ", ";
          });
          alert(errorString);
          formDispatch({
            type: "SET_ERROR",
            data: errorString,
          });

          formDispatch({
            type: "SET_FORM_DATA",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
        } else if (data.message === "User Not Found") {
          setSending(false);
          history.push("/signout");
        } else {
          setSending(false);
          formDispatch({
            type: "SET_ERROR",
            data: data.message,
          });
          alert(data.message);
          formDispatch({
            type: "SET_FORM_DATA",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        setSending(false);
        formDispatch({
          type: "SET_ERROR",
          data: "unable to connect to server",
        });
        alert("error", error);
      });
  };
  const onsubmitAtm = (e) => {
    e.preventDefault();
    setSending(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    user.data && myHeaders.append("Authorization", "Bearer " + user.token);

    var urlencoded = new URLSearchParams();

    // formData.paymentMethod == "walletpayment" &&
    //   urlencoded.append("password", String(formData.password));

    // formData.paymentMethod == "atmpayment" &&
    //   urlencoded.append("email", String(user.data.email));

    // eslint-disable-next-line no-lone-blocks

    urlencoded.append("email", String(user.data.email));

    urlencoded.append("network", String(formData.network));
    urlencoded.append("phone_number", String(formData.phone_number));
    urlencoded.append("amount", String(formData.amount));
    urlencoded.append("source", getOS());
    urlencoded.append("ref", formData.ref);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    console.log(requestOptions);
    console.log(formData.paymentMethod);

    fetch(
      localStorage.getItem("apiURL") + "atm_airtime_purchase",
      requestOptions,
    )
      .then((response) => (response = response.text()))
      .then((response) => {
        console.log(response);
        const data = JSON.parse(response);
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        if (data.status === "success") {
          window.location = data.data.payment_url;
          setSending(false);
          return;
        }

        console.log(data);
        if (data.status === "success") {
          if (formData.paymentMethod === "atmPayment")
            window.location = data.data.payment_url;
          else
            formDispatch({
              type: "SET_FORM_DATA",
              data: {
                name: "responseModal",
                value: { isOpen: true, text: data.message },
              },
            });
        } else if (data.errors) {
          let errorString = "";
          const objectValues = Object.values(data.errors);
          objectValues.map((error) => {
            errorString = errorString + error + ", ";
          });
          formDispatch({
            type: "SET_ERROR",
            data: errorString,
          });
          formDispatch({
            type: "SET_FORM_DATA",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
        } else if (data.message === "User Not Found") {
          history.push("/signout");
        } else {
          formDispatch({
            type: "SET_ERROR",
            data: data.message,
          });
          formDispatch({
            type: "SET_FORM_DATA",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        formDispatch({
          type: "SET_ERROR",
          data: "unable to connect to server",
        });
      });
  };

  const alex = formData.paymentMethod === "atmPayment";
  console.log(alex);
  return (
    <div className="flex flex-col items-center  max-w-md ">
      <div className="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
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
              <h2 className="ml-8 font-medium text-sm">Airtime Purchase</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
          <div className="">
            <h2 className="font-medium text-sm mt-9">Select Network</h2>
            <div className="flex gap-4 mt-6">
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
                <div className="flex  flex-col justify-center items-center focus:border-red-500 focus:ring-1 focus:ring-red-500">
                  <div
                    className={
                      formData.network === "MTN"
                        ? "ring-primary-black ring-4 rounded-lg"
                        : ""
                    }
                  >
                    <img src={mtn} alt="mtn" className="" />
                  </div>
                  <div className="text-primary-orange font-extrabold text-xs mt-2.5">
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
                  <img src={glo} alt="glo" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5">GLO</div>
                <div className="flex flex-col justify-center items-center text-primary-gray text-xx  mt-2.5">
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
                  <img src={airtel} alt="airtel" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5">Airtel</div>
                <div className="flex flex-col justify-center items-center text-primary-gray text-xx mt-2.5">
                  <span>
                    {" "}
                    {appData.airtime_plans.AIRTEL.wallet_price < 100 && (
                      <p>{100 - appData.airtime_plans.AIRTEL.wallet_price}%</p>
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
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={etisalat} alt="etisalat" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5">9mobile</div>
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
          <form onSubmit={onsubmit}>
            <div className="">
              <div className="mt-12">
                <div className="w-full space-y-6">
                  <div className="w-full">
                    <div className=" relative ">
                      <label>
                        <div className="flex justify-between">
                          <span className="font-medium text-primary-black text-sm">
                            {" "}
                            Phone Number
                          </span>
                          <span className="font-medium text-primary-gray text-sm">
                            Balance: {`₦ ${user.data.wallet_balance}`}
                          </span>
                        </div>

                        <input
                          type="phone"
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent mt-3.5"
                          placeholder="08X XXX XXXX"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={(e) => {
                            formOnChange(e);
                          }}
                        />
                        <p className="text-red-500">
                          {" "}
                          {errors.phone_number?.message}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className=" relative ">
                      <label>
                        <p className="mt-4 font-medium text-primary-black text-sm">
                          Amount to Recharge
                        </p>
                        <input
                          type="text"
                          inputmode="numeric"
                          pattern="[0-9]*"
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange   focus:border-transparent mt-3"
                          placeholder="Min ₦50, Max ₦10,000"
                          name="amount"
                          onChange={(e) => {
                            formOnChange(e);
                          }}
                          value={formData.amount}
                        />
                        <p className="text-red-500">
                          {" "}
                          {errors.amount?.message}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="text-red-500 flex flex-col font-medium text-xs">
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

                  <h3 className="mt-4 font-medium text-primary-black text-sm">
                    Payment Method
                  </h3>
                  <div className="flex gap-4 item-center">
                    <button
                      type="button"
                      className={
                        "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-gray-300 text-center text-base font-medium shadow-md   rounded-lg " +
                        (formData.paymentMethod === "walletPayment"
                          ? "bg-primary-black text-white"
                          : "bg-white text-primary-black")
                      }
                      onClick={() => selectpaymentMethod("walletPayment")}
                    >
                      Wallet
                    </button>
                    <button
                      type="button"
                      className={
                        "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-gray-300 text-center text-base font-medium shadow-md   rounded-lg " +
                        (formData.paymentMethod === "atmPayment"
                          ? "bg-primary-black text-white"
                          : "bg-white text-primary-black")
                      }
                      onClick={() => selectpaymentMethod("atmPayment")}
                    >
                      ATM
                    </button>
                  </div>

                  <p className="mt-4 font-medium text-primary-black text-sm">
                    Total Price:&nbsp;
                    <span className=" text-purple-800">
                      {(formData.atmPayment
                        ? (formData.atmPrice * formData.amount) / 100
                        : (formData.walletPrice * formData.amount) / 100) ||
                        " 00.00"}
                    </span>
                  </p>

                  <div className="w-full">
                    {alex ? (
                      ""
                    ) : (
                      <div className=" relative ">
                        <label>
                          <p className="mt-4 font-medium text-primary-black text-sm">
                            Password
                          </p>
                          <input
                            type="password"
                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent mt-3.5"
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                            name="password"
                            onChange={(e) => {
                              formOnChange(e);
                            }}
                            value={formData.password}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="block w-full rounded-md shadow-sm">
                      {alex ? (
                        <button
                          onClick={onsubmitAtm}
                          className="py-2 px-4 bg-primary-orange  focus:ring-primary-orange  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                        >
                          {sending ? (
                            <div className="flex items-center justify-center">
                              <img
                                src={loadingSmall}
                                alt="biller icon"
                                className="w-7 h-7 "
                              />
                            </div>
                          ) : (
                            `Pay`
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={onsubmit}
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
                            `Pay`
                          )}
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default AirtimePurchase;
