import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import dstv from "../icons/dstv.svg";
import startimes from "../icons/startimes.svg";
import gotv from "../icons/gotv.svg";
import Nav from "../components/nav";
import loadingSmall from "../icons/loadingSmall.svg";
import { getOS } from "../helper/getOs";

import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { FormContext } from "../providers/formValues";
import { useContext, useEffect, useState } from "react";
import { AppDataContext } from "../providers/appData";
import CablePlansModal from "../components/cablePalnsModals";
import { UserContext } from "../providers/userData";
import PaymentType from "../components/paymentType";
import Alert from "../components/Alert";
import ConfirmationModel from "../components/confirmationModel";

function CablePurchase() {
  const { setShowModal, showModal } = useContext(AuthContext);
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setloading] = useState(false);
  document.title = "Purchase Cable TV-" + appData.business.name;

  const handleFocus = (e) => {
    setFocused(true);
    console.log("forcused");
  };

  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };
  const selectpaymentMethod = (paymentMethod) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "paymentMethod", value: paymentMethod },
    });
  };
  const history = useHistory();
  const back = () => {
    history.push("/home");
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
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPrice", value: atmPrice },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPrice", value: walletPrice },
    });
  };
  const onValidSubmit = (e) => {
    e.preventDefault();
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "ConfirmationModal",
        value: {
          isOpen: true,
          type: "Purchase Cable TV",
          description: formData.plans_name,
          receiver: formData.receiverName,
          amount:
            formData.paymentMethod === "atm"
              ? formData.atmPrice
              : formData.walletPrice,
          network: formData.network,
        },
      },
    });
  };
  const verifyReceiver = (e) => {
    e.preventDefault();
    setSending(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var urlencoded = new URLSearchParams();
    urlencoded.append("smartcard_number", String(formData.smartcard_number));
    urlencoded.append("plan_id", String(formData.cablePlan_id));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    fetch(localStorage.getItem("apiURL") + "verify_smartcard", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        setSending(false);
        console.log(data);
        if (data.status === "success") {
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "receiverName", value: data.data.Customer_Name },
          });
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
          history.push("/");
        } else {
          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: data.message, type: "error" },
            },
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
  const handleSubmit = (e) => {
    setloading(true);
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
    urlencoded.append("plan_id", String(formData.cablePlan_id));
    urlencoded.append("smartcard_number", String(formData.smartcard_number));
    urlencoded.append("payment_method", formData.atmPayment ? "ATM" : "WALLET");
    urlencoded.append("source", getOS());
    urlencoded.append("ref", formData.ref);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    fetch(localStorage.getItem("apiURL") + "cable_purchase", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        if (data.status === "success" && formData.atmPayment) {
          window.location = data.data.payment_url;
          return;
        }

        setloading(false);
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
          setloading(false);
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

          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: errorString, type: "error" },
            },
          });
          setloading(false);
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
        } else {
          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: data.message, type: "error" },
            },
          });
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
        setloading(false);
      });
  };
  useEffect(() => {
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "receiverName",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "smartcard_number",
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
        name: "plans_name",
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
  console.log("====================================");
  console.log(formData);
  console.log("====================================");
  return (
    <div className="flex">
      <div className="">
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
        <div className="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative mb-12">
          <div className="px-4 py-8">
            <div className="flex justify-between items-center">
              <div className="flex justify-between item-center">
                <button onClick={back}>
                  <img src={LeftAngle} alt="leftAngle" />
                </button>

                <h2 className="ml-8 font-medium text-sm">Cable Payments</h2>
              </div>
              <img src={bell} alt="bell" />
            </div>
            <div className="">
              <h2 className="font-medium text-sm mt-9">
                Select Cable Provider
              </h2>
              <div className="flex gap-4 mt-6 flex-wrap">
                <button
                  className="flex  flex-col justify-center items-center "
                  onClick={() => {
                    onPlanSelect("DSTV");
                    console.log(formData.network);
                  }}
                >
                  <div className="flex  flex-col justify-center items-center focus:border-red-500 focus:ring-1 focus:ring-red-500">
                    <div
                      className={
                        formData.network === "DSTV"
                          ? "ring-primary-black ring-4 rounded-lg"
                          : ""
                      }
                    >
                      <img src={dstv} alt="dstv" />
                    </div>
                  </div>
                  <div className="text-primary-orange font-extrabold text-xs mt-2.5">
                    DStv
                  </div>
                </button>
                <button
                  className="flex  flex-col justify-center items-center"
                  onClick={() => {
                    onPlanSelect("STARTIMES", console.log(formData.network));
                  }}
                >
                  {" "}
                  <div className="flex  flex-col justify-center items-center focus:border-red-500 focus:ring-1 focus:ring-red-500">
                    <div
                      className={
                        formData.network === "STARTIMES"
                          ? "ring-primary-black ring-4 rounded-lg"
                          : ""
                      }
                    >
                      <img src={startimes} alt="startimes" />
                    </div>
                  </div>
                  <div className=" font-extrabold text-xs mt-2.5 text-primary-black">
                    Startimes
                  </div>
                </button>
                <button
                  className="flex  flex-col justify-center items-center"
                  onClick={() => {
                    onPlanSelect("GOTV");
                    console.log(formData.network);
                  }}
                >
                  <div
                    className={
                      formData.network === "GOTV"
                        ? "ring-primary-black ring-4 rounded-lg"
                        : ""
                    }
                  >
                    <img src={gotv} alt="gotv" />
                  </div>
                  <div className=" font-extrabold text-xs mt-2.5 text-primary-black">
                    Gotv
                  </div>
                </button>
              </div>
            </div>
            <div className="">
              <div className="mt-12">
                <div className="w-full space-y-6">
                  <form onSubmit={verifyReceiver}>
                    <div className="w-full">
                      <div className=" relative ">
                        <label>
                          <p className="mt-4 font-medium text-primary-black text-sm">
                            Provider Plans
                          </p>
                          <input
                            type="text"
                            autocomplete="off"
                            className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:   mt-3 "
                            placeholder="Select plan"
                            required
                            readOnly
                            disabled={!formData.network}
                            value={formData.plans_name}
                            onFocus={() => {
                              setShowModal(!showModal);

                              console.log(showModal);

                              console.log("I am here");
                            }}
                          />
                        </label>
                        {showModal ? <CablePlansModal /> : null}
                        {console.log(showModal)}
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <div className=" relative ">
                        <label>
                          <div className="w-full">
                            <div className=" relative ">
                              <label>
                                <div className="flex justify-between">
                                  <div className="font-medium text-primary-black text-sm">
                                    Smart Card Number
                                  </div>
                                  <div className="font-medium text-primary-gray text-sm">
                                    Balance: {`₦ ${user.data.wallet_balance}`}
                                  </div>
                                </div>
                                <div className="flex relative mt-2.5">
                                  <input
                                    type="text"
                                    name="smartcard_number"
                                    autocomplete="off"
                                    className=" rounded-l-lg flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   "
                                    placeholder="0000 0000 0000"
                                    value={formData.smartcard_number}
                                    inputmode="numeric"
                                    focused={focused.toString()}
                                    pattern="^[0-9]{10,20}$"
                                    required
                                    onBlur={handleFocus}
                                    onChange={(e) => {
                                      formOnChange(e);
                                    }}
                                  />
                                  <div className="rounded-r-md inline-flex bg-primary-orange items-center px-3 border-t text-white border-r border-b  border-slate-300 shadow-sm text-sm">
                                    <button className="" type="submit">
                                      {sending ? (
                                        <div className="flex items-center justify-center">
                                          <img
                                            src={loadingSmall}
                                            alt="loading ..."
                                            className="w-7 h-7 "
                                          />
                                        </div>
                                      ) : formData.receiverName ? (
                                        `Verified`
                                      ) : (
                                        `Verify`
                                      )}
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs text-right">
                                  {formData.receiverName}
                                </p>
                              </label>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <PaymentType />
                    <p className="mt-4 font-medium text-primary-black text-sm">
                      Total Price: ₦
                      {formData.paymentMethod === "atm"
                        ? formData.atmPrice
                        : formData.walletPrice}
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
                              autocomplete="off"
                              className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                              name="password"
                              required
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
                        <button
                          type="button"
                          className="py-2 px-4 bg-primary-orange  focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                          onClick={onValidSubmit}
                          disabled={loading}
                        >
                          {loading ? (
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CablePurchase;
