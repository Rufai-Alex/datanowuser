import React, { useContext, useEffect, useState } from "react";
import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import { useHistory } from "react-router-dom";
import { AppDataContext } from "../providers/appData";
import { UserContext } from "../providers/userData";
import { FormContext } from "../providers/formValues";
import loadingSmall from "../icons/loadingSmall.svg";
import Alert from "../components/Alert";

function TranserToUser() {
  const { user } = useContext(UserContext);
  const { appData } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [sending, setSending] = useState(false);
  const [processing, setProcessing] = useState(false);
  document.title = "Transfer Funds-" + appData.business.name;

  const history = useHistory();
  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };

  const back = () => {
    history.push("/home");
  };
  const verifyReceiver = (e) => {
    e.preventDefault();
    setSending(true);
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "receiverName", value: "" },
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var urlencoded = new URLSearchParams();
    urlencoded.append("receiver", String(formData.receiver));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    fetch(localStorage.getItem("apiURL") + "verify_user", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);

        setSending(false);
        console.log(data);
        if (data.status === "success") {
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "receiverName", value: data.data.name },
          });
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
          history.push("/signout");
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
          type: "SET_ERROR",
          data: "unable to connect to server",
        });
        setSending(false);
      });
  };

  const handleSubmit = (e) => {
    e.persist();
    e.preventDefault();

    setProcessing(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var urlencoded = new URLSearchParams();
    urlencoded.append("receiver", String(formData.receiver));
    urlencoded.append("description", String(formData.description));
    urlencoded.append("amount", String(formData.amount));
    urlencoded.append("password", String(formData.password));
    urlencoded.append("ref", formData.ref);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    fetch(localStorage.getItem("apiURL") + "wallet_transfer", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        setProcessing(false);
        console.log(data);
        if (data.status === "success") {
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

          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: errorString, type: "error" },
            },
          });
          setProcessing(false);
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
          setProcessing(false);
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
        setProcessing(false);
      });
  };
  useEffect(() => {
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "receiver",
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
        name: "description",
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
    <div className="flex flex-col items-center  max-w-md h-full m-auto">
      {formData.Alert ? <Alert message={formData.Alert.message} /> : ""}

      <div className="flex bg-white  h-h90 flex-col w-full  rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <button onClick={back}>
                <img src={LeftAngle} alt="leftAngle" />
              </button>

              <h2 className="ml-8 font-medium text-sm">Transfer to User</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>

          <div className="flex flex-col mt-7">
            <form onSubmit={verifyReceiver}>
              <div className="w-full">
                <div className=" relative ">
                  <label>
                    <div className="flex justify-between items-center">
                      <div className="mt-4 font-medium text-primary-black text-sm">
                        Recivers Phone Number
                      </div>
                      <div className="mt-4 font-medium text-primary-gray text-xs">
                        Balance:{`₦ ${user.data.wallet_balance}`}
                      </div>
                    </div>

                    <div className="flex relative mt-2.5">
                      <input
                        type="text"
                        name="receiver"
                        className=" rounded-l-lg flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   "
                        placeholder="0000 0000 0000"
                        value={formData.receiver}
                        inputMode="numeric"
                        pattern="^[0-9]{11,11}$"
                        required
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
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <div className=" relative ">
                  <label>
                    <p className="mt-4 font-medium text-primary-black text-sm">
                      Amount to Transfer
                    </p>
                    <input
                      type="text"
                      className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                      placeholder="Amount min ₦50"
                      name="amount"
                      inputMode="numeric"
                      pattern="[5-9]\d{1,}"
                      required
                      value={formData.amount}
                      onChange={(e) => {
                        formOnChange(e);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className=" relative ">
                  <label>
                    <p className="mt-4 font-medium text-primary-black text-sm">
                      Description
                    </p>
                    <input
                      type="text"
                      className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                      name="description"
                      value={formData.description}
                      onChange={(e) => {
                        formOnChange(e);
                      }}
                      placeholder="Max 50 characters"
                    />
                  </label>
                </div>
              </div>
              <div className="w-full">
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
                      value={formData.password}
                      required
                      onChange={(e) => {
                        formOnChange(e);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-primary-orange  focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                  >
                    {processing ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={loadingSmall}
                          alt="loading ..."
                          className="w-7 h-7 "
                        />
                      </div>
                    ) : (
                      ` Transfer`
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

export default TranserToUser;
