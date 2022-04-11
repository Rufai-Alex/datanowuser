import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import aedc from "../icons/aedc.svg";
import ekedc from "../icons/ekedc.svg";
import ibedc from "../icons/ibedc.svg";
import jedc from "../icons/jedc.svg";
import kedc from "../icons/kedc.svg";
import kedo from "../icons/kedo.svg";
import phdc from "../icons/phdc.svg";
import ikajeElectic from "../icons/ikejaElectric.svg";
import loadingSmall from "../icons/loadingSmall.svg";
import Nav from "../components/nav";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { FormContext } from "../providers/formValues";
import { useContext, useEffect, useState } from "react";
import { AppDataContext } from "../providers/appData";
import ElecricityPlansModal from "../components/electrcityPlansModal";
import { UserContext } from "../providers/userData";
import PaymentType from "../components/paymentType";
import Alert from "../components/Alert";
import ConfirmationModel from "../components/confirmationModel";
import { getOS } from "../helper/getOs";
import CurrencyFormat from "../helper/CurrencyFormat";

function ElectricityPayments() {
  const { setShowModal, showModal } = useContext(AuthContext);
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [focused, setFocused] = useState(false);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const onPlanSelect = (network) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "network", value: network },
    });
  };

  const history = useHistory();
  const back = () => {
    history.push("/home");
  };
  const verifyReceiver = (e) => {
    setSending(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var urlencoded = new URLSearchParams();
    urlencoded.append("meter_number", String(formData.meter_number));
    urlencoded.append("plan_id", String(formData.electricPlan_id));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    fetch(localStorage.getItem("apiURL") + "verify_meter", requestOptions)
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
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "receiverAddress", value: data.data.Address },
          });
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
        setSending(false); //
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
          type: "Electric Bill Payment",
          description: formData.plans_name,
          receiver: formData.meter_number,
          amount: formData.amount
            ? formData.atmPayment
              ? formData.calcAmount
              : formData.amount - (formData.amount * formData.commission) / 100
            : 0,
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

    setLoading(true);
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
    urlencoded.append("plan_id", String(formData.electricPlan_id));
    urlencoded.append("meter_number", String(formData.meter_number));
    urlencoded.append("amount", String(formData.amount));
    urlencoded.append(
      "phone_number",
      String(
        formData.phone_number ? formData.phone_number : user.data.phone_number,
      ),
    );

    urlencoded.append("source", getOS());
    urlencoded.append("ref", formData.ref);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    fetch(
      formData.atmPayment
        ? localStorage.getItem("apiURL") + "atm_electric_purchase"
        : localStorage.getItem("apiURL") + "wallet_electric_purchase",
      requestOptions,
    )
      .then((response) => (response = response.text()))
      .then((response) => {
        console.log(response);
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
          setLoading(false);
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
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
          setLoading(false);
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
          setLoading(false);
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
        setLoading(false);
      });
  };
  useEffect(() => {
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
        name: "calcAmount",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "electricPlan_id",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "email",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "commission",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "meter_number",
        value: "",
      },
    });
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
          type: "",
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
    <div className="flex flex-col items-center  max-w-sm mx-auto">
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
      <div className="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <button onClick={back}>
                <img src={LeftAngle} alt="leftAngle" />
              </button>

              <h2 className="ml-8 font-medium text-sm">Electricity Payments</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
          <div className="">
            <h2 className="font-medium text-sm mt-9">Select Distributor</h2>
            <div className="flex gap-4 mt-6 flex-wrap">
              <button
                className="flex  flex-col justify-center items-center "
                onClick={() => {
                  onPlanSelect("IKEDC", console.log(formData.network));
                }}
              >
                <div
                  className={
                    formData.network === "IKEDC"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={ikajeElectic} alt="ikajeElectic" />
                </div>
                <div className="text-primary-orange font-extrabold text-xs mt-2.5">
                  IKEDC
                </div>
              </button>
              <button
                className="flex  flex-col justify-center items-center"
                onClick={() => {
                  onPlanSelect("KAEDCO", console.log(formData.network));
                }}
              >
                {" "}
                <div
                  className={
                    formData.network === "KAEDCO"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={kedo} alt="KAEDCO" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  KAEDCO
                </div>
              </button>
              <button
                className="flex  flex-col justify-center items-center"
                onClick={() => {
                  onPlanSelect("AEDC", console.log(formData.network));
                }}
              >
                <div
                  className={
                    formData.network === "AEDC"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={aedc} alt="aedc" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  AEDC
                </div>
              </button>
              <button
                className="flex  flex-col justify-center items-center"
                onClick={() => {
                  onPlanSelect("PHED", console.log(formData.network));
                }}
              >
                <div
                  className={
                    formData.network === "PHED"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={phdc} alt="PHED" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  PHED
                </div>
              </button>
              <button
                className="flex  flex-col justify-center items-center"
                onClick={() => {
                  onPlanSelect("JED", console.log(formData.network));
                }}
              >
                <div
                  className={
                    formData.network === "JED"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={jedc} alt="JED" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  JED
                </div>
              </button>
              <button
                className="flex  flex-col justify-center items-center"
                onClick={() => {
                  onPlanSelect("IBEDC", console.log(formData.network));
                }}
              >
                <div
                  className={
                    formData.network === "IBEDC"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={ibedc} alt="IBEDC" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  IBEDC
                </div>
              </button>
              <button
                className="flex  flex-col justify-center items-center"
                onClick={() => {
                  onPlanSelect("EKEDC", console.log(formData.network));
                }}
              >
                <div
                  className={
                    formData.network === "EKEDC"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={ekedc} alt="ekedc" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5 text-primary-black">
                  EKEDC
                </div>
              </button>
              <button
                className="flex  flex-col justify-center items-center"
                onClick={() => {
                  onPlanSelect("KEDCO", console.log(formData.network));
                }}
              >
                <div
                  className={
                    formData.network === "KEDCO"
                      ? "ring-primary-black ring-4 rounded-lg"
                      : ""
                  }
                >
                  <img src={kedc} alt="KEDCO" />
                </div>
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  KEDCO
                </div>
              </button>
            </div>
          </div>
          <div className="">
            <div className="mt-12">
              <div className="w-full space-y-6">
                <form onsubmit={verifyReceiver}>
                  <div className="w-full">
                    <div className=" relative ">
                      <label>
                        <div className="flex justify-between">
                          <span className="font-medium text-primary-black text-sm">
                            Meter Type
                          </span>
                          <span className="font-medium text-primary-gray text-sm">
                            Balance:{`₦ ${user.data.wallet_balance}`}
                          </span>
                        </div>

                        <input
                          type="phone"
                          className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                          placeholder="Select meter type"
                          value={formData.plans_name}
                          onFocus={() => {
                            setShowModal(!showModal);

                            console.log(showModal);

                            console.log("I am here");
                          }}
                        ></input>
                        {showModal ? <ElecricityPlansModal /> : null}
                        {console.log(showModal)}
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className=" relative ">
                      <label>
                        <p className="mt-4 font-medium text-primary-black text-sm">
                          Meter Number
                        </p>
                        <div className="flex relative mt-2.5">
                          <input
                            type="text"
                            name="meter_number"
                            className=" rounded-l-lg flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   "
                            placeholder="0000 0000 0000"
                            value={formData.meter_number}
                            required
                            inputMode="numeric"
                            focused={focused.toString()}
                            pattern="^[0-9]{11,11}$"
                            onBlur={handleFocus}
                            onChange={(e) => {
                              formOnChange(e);
                            }}
                          />
                          <span className="rounded-r-md inline-flex bg-primary-orange items-center px-3 border-t text-white border-r border-b  border-slate-300 shadow-sm text-sm">
                            <button className="">
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
                          </span>
                        </div>
                        <p className="text-xs text-right">
                          {formData.receiverName}
                        </p>
                      </label>
                    </div>
                  </div>
                </form>
                <form onSubmit={onValidSubmit}>
                  <div className="w-full">
                    <div className=" relative ">
                      <label>
                        <p className="mt-4 font-medium text-primary-black text-sm">
                          Phone Number
                        </p>
                        <input
                          type="text"
                          className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange   focus:   mt-3"
                          placeholder="000 0000 0000"
                          name="phone_number"
                          value={formData.phone_number}
                          required
                          inputMode="numeric"
                          focused={focused.toString()}
                          pattern="^[0-9]{11,11}$"
                          onBlur={handleFocus}
                          onChange={(e) => {
                            formOnChange(e);
                          }}
                        />
                        <span>Please enter a valid phone number</span>
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className=" relative ">
                      <label>
                        <p className="mt-4 font-medium text-primary-black text-sm">
                          <div className="w-full">
                            <div className=" relative ">
                              <label>
                                <p className="mt-4 font-medium text-primary-black text-sm">
                                  Amount to Recharge
                                </p>
                                <input
                                  type="text"
                                  className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange   focus:   mt-3"
                                  placeholder="Min ₦50, Max ₦100,000"
                                  name="amount"
                                  value={formData.amount}
                                  inputMode="numeric"
                                  focused={focused.toString()}
                                  pattern="^[0-9]{2,6}$"
                                  onBlur={handleFocus}
                                  onChange={(e) => {
                                    formOnChange(e);
                                  }}
                                />
                                <span>Please enter only valid amount</span>
                              </label>
                            </div>
                          </div>
                        </p>
                      </label>
                    </div>
                  </div>
                  <PaymentType />
                  <p className="mt-4 font-medium text-primary-black text-sm">
                    Total Price:
                    {CurrencyFormat(
                      formData.amount
                        ? formData.atmPayment
                          ? formData.calcAmount
                          : formData.amount -
                            (formData.amount * formData.commission) / 100
                        : 0,
                    )}
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
                      <button
                        type="submit"
                        className="py-2 px-4 bg-primary-orange  focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
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
      <Nav />
    </div>
  );
}

export default ElectricityPayments;
