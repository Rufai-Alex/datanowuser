import React, { useContext, useEffect, useState } from "react";
import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import eisalat from "../icons/9mobile.svg";
import glo from "../icons/glo.svg";
import airtel from "../icons/airtel.svg";
import mtn from "../icons/mtn.svg";
import loadingSmall from "../icons/loadingSmall.svg";
import close from "../icons/Close.svg";
import Nav from "../components/nav";
import { getOS } from "../helper/getOs";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { FormContext } from "../providers/formValues";
import { AppDataContext } from "../providers/appData";
import PlansModels from "../components/plansModels";
import { UserContext } from "../providers/userData";
import PaymentType from "../components/paymentType";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataPurchaseSchema } from "../components/validation";

import { ErrorMessage } from "@hookform/error-message";
import Alert from "../components/Alert";
import ConfirmationModel from "../components/confirmationModel";

function DataPurchase() {
  const { setShowModal, showModal } = useContext(AuthContext);
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(false);
  document.title = "Purchase Data-" + appData.business.name;

  const handleFocus = (e) => {
    setFocused(true);
    console.log("forcused");
  };
  console.log(focused);
  // const [showModal, setShowModal] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();
  console.log(formData.network);
  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };

  // const selectpaymentMethod = (paymentMethod) => {
  //   formDispatch({
  //     type: "INPUTVALUES",
  //     data: { name: paymentMethod, value: paymentMethod },
  //   });
  // };
  const paymentwallet = (toggle) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPayment", value: false },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPayment", value: toggle },
    });
  };
  const paymentatm = (toggle) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPayment", value: toggle },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPayment", value: false },
    });
  };
  useEffect(() => {
    if (!formData.ref) {
      formDispatch({
        type: "INPUTVALUES",
        data: { name: "ref", value: Math.random().toString(36).slice(2) },
      });
    }
  }, []);
  const onPlanSelect = (network, atmPrice, walletPrice) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "network", value: network },
    });
  };
  var networkPrefix = {
    MTN: [
      "0803",
      "0703",
      "0903",
      "0806",
      "0706",
      "0813",
      "0810",
      "0814",
      "0816",
      "0906",
      "0704",
    ],
    GLO: ["0805", "0705", "0905", "0807", "0815", "0811", "0905", "0915"],
    AIRTEL: ["0802", "0902", "0701", "0808", "0708", "0812", "0901", "0907"],
    ETISALAT: ["0809", "0909", "0817", "0818", "0908"],
  };

  const history = useHistory();

  const back = () => {
    history.push("/home");
  };
  console.log(formData);
  var networkPrefix = {
    MTN: [
      "0803",
      "0703",
      "0903",
      "0806",
      "0706",
      "0813",
      "0810",
      "0814",
      "0816",
      "0906",
      "0704",
    ],
    GLO: ["0805", "0705", "0905", "0807", "0815", "0811", "0905", "0915"],
    AIRTEL: ["0802", "0902", "0701", "0808", "0708", "0812", "0901", "0907"],
    ETISALAT: ["0809", "0909", "0817", "0818", "0908"],
  };
  const onValidSubmit = (e) => {
    e.preventDefault();
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "ConfirmationModal",
        value: {
          isOpen: true,
          type: "Data Subscription",
          description: formData.plans_name,
          receiver: formData.phone_number,
          amount: formData.atmPayment
            ? formData.atmPrice
            : formData.walletPrice,
          network: formData.network,
        },
      },
    });
  };

  const process = () => {
    // loaderDispatch({
    //   type: "SET_LOADER",
    //   data: { text: "Processing your transaction...", isLoading: true },
    // });
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
    urlencoded.append("plan_id", String(formData.plans_id));
    urlencoded.append("phone_number", String(formData.phone_number));
    urlencoded.append("payment_method", formData.atmPayment ? "ATM" : "WALLET");
    urlencoded.append("source", getOS());
    urlencoded.append("ref", formData.ref);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };

    fetch(localStorage.getItem("apiURL") + "data_purchase", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        if (data.status === "success" && formData.atmPayment) {
          window.location = data.data.payment_url;
          return;
        }
        // loaderDispatch({
        //   type: "SET_LOADER",
        //   data: { text: "", isLoading: false },
        // });
        console.log(data);
        if (data.status === "success") {
          // formDispatch({
          //   type: "SET_FORM_DATA",
          //   data: {
          //     name: "responseModal",
          //     value: { isOpen: true, text: data.message },
          //   },
          // });
          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: data.message },
            },
          });
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
          history.push("/");
        } else if (data.errors) {
          let errorString = "";
          const objectValues = Object.values(data.errors);
          objectValues.map((error) => {
            errorString = errorString + error + ", ";
          });
          // formDispatch({
          //   type: "SET_ERROR",
          //   data: errorString,
          // });
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
        } else {
          // formDispatch({
          //   type: "SET_ERROR",
          //   data: data.message,
          // });
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
        // formDispatch({
        //   type: "SET_ERROR",
        //   data: "unable to connect to server",
        // });
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
        // loaderDispatch({
        //   type: "SET_LOADER",
        //   data: { text: "", isLoading: false },
        // });
        setSending(false);
      });
  };
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
      data: { name: "plans_id", value: "" },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "plans_name", value: "" },
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
  return (
    <div className="flex flex-col items-center  max-w-md m-auto relative">
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
          {" "}
          <ConfirmationModel onConfirmationClicked={process} />
        </div>
      ) : (
        ""
      )}
      <div className="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <button onClick={back}>
                <img src={LeftAngle} alt="leftAngle" />
              </button>
              <h2 className="ml-8 font-medium text-sm">Data Purchase</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>

          <div className="">
            <h2 className="font-medium text-xs mt-9">Select Network</h2>
            <div className="flex gap-4 mt-6">
              <button
                className="flex  flex-col justify-center items-center "
                onClick={() => {
                  onPlanSelect(
                    "MTN",
                    appData.airtime_plans.MTN.atm_price,
                    appData.airtime_plans.MTN.wallet_price,
                  );
                  console.log(formData.network);
                }}
              >
                <div
                  className={
                    formData.network === "MTN"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={mtn} alt="mtn" />
                </div>
                <div className="text-primary-orange font-extrabold text-xs mt-2.5">
                  MTN
                </div>
              </button>

              <button
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
              </button>
              <button
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
              </button>
              <button
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
                <div
                  className={
                    formData.network === "ETISALAT"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={eisalat} alt="etisalat" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5">9mobile</div>
              </button>
            </div>
          </div>
          <form onSubmit={onValidSubmit}>
            <div className="mt-12">
              <div className="w-full space-y-6">
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <div className="flex justify-between">
                        <div className="font-medium text-primary-black text-sm">
                          Phone Number
                        </div>
                        <div className="font-medium text-primary-gray text-sm">
                          Balance: {`₦ ${user.data.wallet_balance}`}
                        </div>
                      </div>
                      <input
                        type="tel"
                        className=" rounded-lg  flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                        placeholder="08X XXX XXXX"
                        inputmode="numeric"
                        focused={focused.toString()}
                        pattern="^[0-9]{11,11}$"
                        required
                        name="phone_number"
                        onBlur={handleFocus}
                        value={formData.phone_number}
                        onChange={(e) => {
                          formOnChange(e);
                        }}
                      />

                      <span>Please enter a valid receiver phone number</span>
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <p className="mt-4 font-medium text-primary-black text-sm">
                        Network Plans
                      </p>
                      <input
                        type="text"
                        autocomplete="off"
                        name="select_plan"
                        focused={focused.toString()}
                        readOnly
                        disabled={!formData.network}
                        required
                        className=" rounded-lg  flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:   mt-3 "
                        placeholder="Select plan"
                        value={formData.plans_name}
                        onClick={() => {
                          setShowModal(!showModal);

                          console.log(showModal);

                          console.log("I am here");
                        }}
                      ></input>

                      <span>Please pick a plan you want </span>
                    </label>
                    {/* ////////////////// */}
                    {showModal ? <PlansModels /> : null}
                    {console.log(showModal)}
                    {/* ////////////////// */}
                  </div>
                </div>

                <PaymentType />

                <p className="mt-4 font-medium text-primary-black text-sm">
                  Total Price: ₦
                  {(formData.atmPayment
                    ? formData.atmPrice
                    : formData.walletPrice) || " 00.00"}
                </p>

                <div className="w-full">
                  {formData.atmPayment ? (
                    ""
                  ) : (
                    <div className=" relative ">
                      <label>
                        <p className="mt-4 font-medium text-primary-black text-sm">
                          Password
                        </p>
                        <input
                          type="password"
                          className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
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
                      className="py-2 px-4 bg-primary-orange hover:bg-primary-orange focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                      type="submit"
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
          </form>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default DataPurchase;
