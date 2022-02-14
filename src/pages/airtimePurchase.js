import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import etisalat from "../icons/9mobile.svg";
import glo from "../icons/glo.svg";
import airtel from "../icons/airtel.svg";
import mtn from "../icons/mtn.svg";
import axios from "axios";
import Nav from "../components/nav";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import { FormContext } from "../providers/formValues";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { airtimePurchaseSchema } from "../components/validation";
import { getOS } from "../helper/getOs";
import { AppDataContext } from "../providers/appData";

function AirtimePurchase() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
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
    // const dataWallet = new URLSearchParams();
    // dataWallet = {
    //   source: getOS(),
    //   phone_number: formData.phone_number,
    //   email: user.data.email,
    //   name: user.data.firstname,
    //   amount: formData.amount,
    //   network: formData.network,
    //   password: formData.password,
    //   ref: formData.ref,
    // };
    // const dataAtm = {
    //   source: getOS(),
    //   phone_number: formData.phone_number,
    //   amount: formData.amount,
    //   network: formData.network,
    //   email: user.data.email,
    //   name: user.data.firstname,
    //   ref: formData.ref,
    // };
    const data = new URLSearchParams();

    formData.paymentMethod === "walletPayment" &&
      data.append("password", String(formData.password));
    data.append("email", String(user.data.email));
    data.append("network", String(formData.network));
    data.append("phone_number", String(formData.phone_number));
    data.append("amount", String(formData.amount));
    data.append("source", getOS());
    data.append("ref", formData.ref);

    console.log(JSON.parse(localStorage.getItem("token")));
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   Accept: "application/json",
    //   Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    // };

    console.log();
    const url =
      formData.paymentMethod === "walletPayment"
        ? localStorage.getItem("apiURL") + "wallet_airtime_purchase"
        : localStorage.getItem("apiURL") + "atm_airtime_purchase";
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        if (response.OK) {
        } else {
          return response.json().then((data) => {
            console.log(data);
          });
        }
      })
      .catch((response) => {
        console.log(response.message);
      });
  };
  // const onsubmit = (e) => {
  //   e.preventDefault();
  //   debugger;
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //   myHeaders.append("Accept", "application/json");

  //   myHeaders.append(
  //     "Authorization",
  //     "Bearer " + JSON.parse(localStorage.getItem("token")),
  //   );

  //   var urlencoded = new URLSearchParams();

  //   urlencoded.append("password", String(formData.password));

  //   urlencoded.append("email", String(user.data.email));
  //   urlencoded.append("network", String(formData.network));
  //   urlencoded.append("phone_number", String(formData.phone_number));
  //   urlencoded.append("amount", String(formData.amount));
  //   urlencoded.append("source", getOS());
  //   urlencoded.append("ref", formData.ref);
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //     //redirect: "follow",
  //   };
  //   fetch(
  //     localStorage.getItem("apiURL") + "wallet_airtime_purchase",
  //     requestOptions,
  //   )
  //     .then((response) => (response = response.text()))
  //     .then((response) => {
  //       const data = JSON.parse(response);
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div className="flex flex-col items-center  max-w-md ">
      <div class="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
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
                          type="number"
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
                  <div class="flex gap-4 item-center">
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
                  </div>
                  <div>
                    <span class="block w-full rounded-md shadow-sm">
                      <button
                        type="submit"
                        class="py-2 px-4 bg-primary-orange hover:bg-yellow-200 focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                      >
                        Pay
                      </button>
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
