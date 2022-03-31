import React, { useContext, useState } from "react";
import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";
import { FormContext } from "../providers/formValues";
import { getOS } from "../helper/getOs";
function AutoAgentFund() {
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);

  const onValidSubmit = (e) => {
    e.persist();
    e.preventDefault();
    // loaderDispatch({
    //   type: "SET_LOADER",
    //   data: { text: "Reserving your transaction...", isLoading: true },
    // });
    // formDispatch({
    //   type: "INPUTVALUES",
    //   data: { name: "confirmationModal", value: { isOpen: false, text: "" } },
    // });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    user.data && myHeaders.append("Authorization", "Bearer " + user.token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("account_name", String(formData.account_name));
    urlencoded.append("amount", String(formData.amount));
    urlencoded.append("source", getOS());
    urlencoded.append("ref", formData.ref);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    fetch(localStorage.getItem("apiURL") + "autoagent", requestOptions)
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
          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "responseModal",
              value: { isOpen: true, text: data.message },
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
            type: "SET_ERROR",
            data: errorString,
          });
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "ref", value: Math.random().toString(36).slice(2) },
          });
        } else {
          formDispatch({
            type: "SET_ERROR",
            data: data.message,
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
          type: "SET_ERROR",
          data: "unable to connect to server",
        });
        // loaderDispatch({
        //   type: "SET_LOADER",
        //   data: { text: "", isLoading: false },
        // });
      });
  };

  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };

  const [ussd, setUssd] = useState(false);
  const history = useHistory();

  const back = () => {
    history.push("/home");
  };
  return (
    <div className="flex flex-col items-center  max-w-md m-auto">
      <div className="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <button onClick={back}>
                <img src={LeftAngle} alt="leftAngle" />
              </button>

              <h2 className="ml-8 font-medium text-sm">Fund via Auto Agent</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
          <div className="divide-y-2 divide-primary-gray">
            <div className="flex flex-col mt-8 space-y-3.5 pb-9">
              <div className="flex justify-between ">
                {" "}
                <p className="font-medium text-sm text-primary-gray">Status:</p>
                <p className="font-semibold text-sm text-red-500 ">
                  {appData.master_settings.fund_status_auto * 1 === 0 ? (
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
                  1 - 30 Minutes
                </p>
              </div>
              <div className="flex justify-between ">
                {" "}
                <p className="font-medium text-sm text-primary-gray">
                  Supports:
                </p>
                <p className="font-semibold text-sm text-primary-black ">
                  Mobile Banking and USSD
                </p>
              </div>
            </div>
            <div className="pt-4 text-red-500 text-sm">
              Transaction charge: <br /> (₦51 to ₦9,999 = ₦26.75 fee) (Above
              ₦9,999 = ₦70 fee)
            </div>
          </div>
          <>
            {" "}
            <h3 className="mt-4 font-medium text-primary-black text-sm">
              SELECT YOUR PAYMENT METHOD
            </h3>
            <div className="flex gap-4 item-center mt-4">
              <button
                type="button"
                className={
                  "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-slate-300 text-center text-base font-medium shadow-md   rounded-lg " +
                  (!ussd
                    ? "bg-primary-black text-white"
                    : "bg-white text-primary-black")
                }
                onClick={() => setUssd(false)}
              >
                BANK APP
              </button>
              <button
                type="button"
                className={
                  "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-slate-300 text-center text-base font-medium shadow-md   rounded-lg " +
                  (ussd
                    ? "bg-primary-black text-white"
                    : "bg-white text-primary-black")
                }
                onClick={() => setUssd(true)}
              >
                USSD
              </button>
            </div>
          </>

          {ussd ? (
            <form className="flex flex-col ">
              <div className=" font-medium text-sm text-primary-gray ">
                <div>
                  <ol className="mt-4 flex flex-col space-y-2 list-outside list-decimal mx-4">
                    <li className="mb-1  mt-0 ">
                      Fill in the name of account you will be transferring from
                      and amount in the forms below.
                    </li>
                    <li className="mb-1  mt-0 text-dark">
                      Click on the Initiate Transfer button and only proceed to
                      sending the fund if you get a success message.
                    </li>
                    <li className="mb-1  mt-0 text-dark">
                      Make the transfer into the account below instantly after
                      clicking on Initiate Transfer Button
                    </li>
                    <li className="mb-1  mt-0 text-dark">
                      Wallet will only be credited if transfer is received
                      within 1 hour
                    </li>
                    <p
                      className="text-left mt-2  text-dark"
                      style={{ fontSize: 13 }}
                    >
                      <b>
                        <i className="mdi mdi-bank-transfer"></i> BANK: Access
                        Bank
                      </b>
                    </p>

                    <p
                      className="text-left mt-2  text-dark"
                      style={{ fontSize: 13 }}
                    >
                      <b>
                        <i className="mdi mdi-wallet-outline"></i> ACCOUNT
                        NUMBER: 1481853002
                      </b>
                    </p>

                    <p
                      className="text-left mt-2  text-dark"
                      style={{ fontSize: 13 }}
                    >
                      <b>
                        <i className="mdi mdi-account-circle"></i> ACCOUNT NAME:
                        Systems Technologies Limited
                      </b>
                    </p>
                  </ol>
                  <hr />
                  {/* {formData.error && (
                    <Alert color="danger">{formData.error}</Alert> */}
                  {/* )} */}

                  <h6 className="mt-4 font-medium text-primary-black text-sm">
                    Full Account Name
                  </h6>
                  <input
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mt-3 "
                    name="account_name"
                    value={formData.account_name}
                    onChange={(e) => {
                      formOnChange(e);
                    }}
                    placeholder="Full account name"
                    type="text"
                    errorMessage="Enter valid name"
                    required
                    key="account_name"
                  />
                  <p className="mt-4 font-medium text-primary-black text-sm">
                    Amount
                  </p>
                  <input
                    name="amount"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mt-3 "
                    value={formData.amount}
                    onChange={(e) => {
                      formOnChange(e);
                    }}
                    placeholder="Amount to be transferred e.g 20000"
                    type="text"
                  />

                  <button
                    type="submit"
                    className="py-2 px-4 bg-primary-orange hover:bg-yellow-200 focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                  >
                    Initiate Transfer
                    {formData.amount && "of ₦" + formData.amount}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className=" font-medium text-sm text-primary-gray ">
              <h1 className="text-center mt-2  text-dark ">
                X2X{user.data.reference_code}
              </h1>
              <p
                className=" mt-2  text-dark text-center text-uppercase"
                style={{ fontSize: 12 }}
              >
                <b>reference code</b>
              </p>
              <ol className="mt-4 flex flex-col space-y-2 list-outside list-decimal mx-4">
                <li className="mb-1  mt-0 text-dark">
                  Make transfer into our bank Account using your Bank App.
                </li>
                <li className="mb-1  mt-0 text-dark">
                  Enter your{" "}
                  <b>REFERENCE CODE (X2X{user.data.reference_code})</b> in the
                  Remark/Description/Narration part of the transfer form on your
                  Bank App.
                </li>
                <li className="mb-1  mt-0 text-dark">
                  Complete and initiate the transfer into the account below
                </li>
                <p className="text-left mt-2  text-dark">
                  <b>
                    <i className="mdi mdi-bank-transfer"></i> BANK: Access Bank
                  </b>
                </p>

                <p
                  className="text-left mt-2  text-dark"
                  style={{ fontSize: 13 }}
                >
                  <b>
                    <i className="mdi mdi-wallet-outline"></i> ACCOUNT NUMBER:
                    1481853002
                  </b>
                </p>
              </ol>
              <p className="text-left mt-2  text-dark" style={{ fontSize: 13 }}>
                <b>
                  <i className="mdi mdi-account-circle"></i> ACCOUNT NAME:
                  Systems Technologies Limited
                </b>
              </p>
            </div>
          )}
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default AutoAgentFund;
