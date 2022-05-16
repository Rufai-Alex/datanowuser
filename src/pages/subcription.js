import bell from "../icons/Bell.svg";
import sort from "../icons/sort.svg";
import wrong from "../icons/wrong.svg";
import right from "../icons/right.svg";
import leftsAngle from "../icons/leftsAngle.svg";
import rightAngle from "../icons/rightAngle.svg";
import renew from "../icons/renew.svg";
import Nav from "../components/nav";
import loadingSmall from "../icons/loadingSmall.svg";
import close from "../icons/Close.svg";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";
import { FormContext } from "../providers/formValues";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "../helper/CurrencyFormat";
function Subcription(props) {
  const [showModal, setShowModal] = useState(false);
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions(1);
  }, []);
  const history = useHistory();
  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };
  const navigateToPage = (page) => {
    fetchTransactions(page);
  };

  const transactionSelect = (transaction) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "transaction", value: transaction },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: { name: "modalOpen", value: true },
    });
  };

  const handleSubmit = (e) => {
    e.persist();
    e.preventDefault();
    fetchTransactions(1);
  };

  // const fetchTransaction = (transaction) => {
  //   setLoading(true);

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //   myHeaders.append("Accept", "application/json");
  //   myHeaders.append("Authorization", "Bearer " + user.token);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     //redirect: "follow",
  //   };
  //   var url = "";

  //   switch (transaction.transaction_type * 1) {
  //     case 5:
  //       url = "data_subscriptions";
  //       break;
  //     case 6:
  //       url = "airtime_subscriptions";
  //       break;
  //     case 8:
  //       url = "cable_subscriptions";
  //       break;
  //     case 9:
  //       url = "electric_subscriptions";
  //       break;
  //   }

  //   fetch(
  //     localStorage.getItem("apiURL") + url + "/" + transaction.transaction_id,
  //     requestOptions,
  //   )
  //     .then((response) => (response = response.text()))
  //     .then((response) => {
  //       const data = JSON.parse(response);
  //       setLoading(false);
  //       if (data.status === "success") {
  //         console.log("success");
  //         formDispatch({
  //           type: "INPUTVALUES",
  //           data: {
  //             name: "transaction",
  //             value: {
  //               ...data.data,
  //               transaction_type: transaction.transaction_type,
  //             },
  //           },
  //         });

  //         formDispatch({
  //           type: "INPUTVALUES",
  //           data: { name: "modalOpen", value: true },
  //         });
  //       } else if (
  //         data.message === "Token Expired" ||
  //         data.message === "User Not Found"
  //       ) {
  //         history.push("/signout");
  //       } else if (data.errors) {
  //         let errorString = "";
  //         const objectValues = Object.values(data.errors);
  //         objectValues.map((error) => {
  //           errorString = errorString + error + ", ";
  //         });
  //         formDispatch({
  //           type: "SET_ERROR",
  //           data: errorString,
  //         });
  //       } else {
  //         formDispatch({
  //           type: "SET_ERROR",
  //           data: data.message,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       formDispatch({
  //         type: "SET_ERROR",
  //         data: "unable to connect to server",
  //       });
  //       setLoading(false);
  //     });
  // };
  const fetchTransactions = (page) => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var parameter = "";
    parameter += formData.search ? "&search=" + formData.search : "";
    parameter += formData.transactionType
      ? "&transaction_type=" + formData.transactionType
      : "";
    parameter += formData.pageSize ? "&size=" + formData.pageSize : "";
    parameter += formData.dateFrom ? "&date_from=" + formData.dateFrom : "";
    parameter += formData.dateTo ? "&date_to=" + formData.dateTo : "";
    parameter += "&page=" + page;
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(
      localStorage.getItem("apiURL") + "transactions?" + parameter,
      requestOptions,
    )
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        setLoading(false);
        console.log(data);
        if (data.status === "success") {
          const objectValues = Object.values(data.data.data);
          console.log(objectValues);
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "transactions", value: objectValues },
          });
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "current_page", value: data.data.current_page },
          });
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "per_page", value: data.data.per_page },
          });
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "last_page", value: data.data.last_page },
          });
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "total", value: data.data.total },
          });
          setLoading(false);
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
          history.push("/signout");
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
        setLoading(false);
      });
  };
  const transactionStatus = [
    "Delivered",
    "Paying",
    "Queued ",
    "Queued ",
    "Processing",
    "Reversed",
    "Failed",
    "Cancelled",
  ];
  const transactionTypes = [
    "ATM Wallet Funding", //0
    "Direct Bank Funding", //1
    "Purchase Reversal", //2
    "Transfer from User", //3
    "DataNow Admin Withdrawal", //4
    "Data Purchase", //5
    "Airtime Purchase", //6
    "Transfer to user", //7
    "Cable TV Subscription", //8
    "Electricity Bill Payment", //9
    "Commission Payment", //10
    "Auto Agent Funding", //11
    "Transfer from Admin", //12
    "Referral Bonus Payment", //13
  ];
  const getDataPlanName = (planId) => {
    var planName = "";
    appData.data_plans.MTN.map((plan) => {
      if (plan.id == planId) planName = plan.name;
    });
    if (planName === "")
      appData.data_plans.GLO.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.data_plans.AIRTEL.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.data_plans.ETISALAT.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });

    return planName;
  };

  const getElectricPlanName = (planId) => {
    var planName = "";
    appData.electric_plans.IKEDC.map((plan) => {
      if (plan.id == planId) planName = plan.name;
    });
    if (planName === "")
      appData.electric_plans.PHED.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.electric_plans.KEDCO.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.electric_plans.KAEDCO.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.electric_plans.JED.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.electric_plans.IBEDC.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.electric_plans.EKEDC.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.electric_plans.AEDC.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });

    return planName;
  };

  const getCablePlanName = (planId) => {
    var planName = "";
    if (planName === "")
      appData.cable_plans.STARTIMES.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.cable_plans.DSTV.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    if (planName === "")
      appData.cable_plans.GOTV.map((plan) => {
        if (plan.id == planId) planName = plan.name;
      });
    return planName;
  };

  const getPlanTv = (planId) => {
    var tv = "";
    appData.cable_plans.STARTIMES.map((plan) => {
      if (plan.id == planId) tv = "STARTIMES";
    });
    appData.cable_plans.DSTV.map((plan) => {
      if (plan.id == planId) tv = "DSTV";
    });
    appData.cable_plans.GOTV.map((plan) => {
      if (plan.id == planId) tv = "GOTV";
    });

    return tv;
  };

  const getPlanNetwork = (planId) => {
    var network = "";
    appData.data_plans.MTN.map((plan) => {
      if (plan.id == planId) network = "MTN";
    });
    appData.data_plans.GLO.map((plan) => {
      if (plan.id == planId) network = "GLO";
    });
    appData.data_plans.AIRTEL.map((plan) => {
      if (plan.id == planId) network = "AIRTEL";
    });
    appData.data_plans.ETISALAT.map((plan) => {
      if (plan.id == planId) network = "ETISALAT";
    });
    return network;
  };

  const getPlanDisco = (planId) => {
    var disco = "";
    appData.electric_plans.IKEDC.map((plan) => {
      if (plan.id === planId) disco = "IKEDC";
    });
    appData.electric_plans.PHED.map((plan) => {
      if (plan.id == planId) disco = "PHED";
    });
    appData.electric_plans.KEDCO.map((plan) => {
      if (plan.id == planId) disco = "KEDCO";
    });
    appData.electric_plans.KAEDCO.map((plan) => {
      if (plan.id == planId) disco = "KAEDCO";
    });
    appData.electric_plans.JED.map((plan) => {
      if (plan.id == planId) disco = "JED";
    });
    appData.electric_plans.IBEDC.map((plan) => {
      if (plan.id == planId) disco = "IBEDC";
    });
    appData.electric_plans.EKEDC.map((plan) => {
      if (plan.id == planId) disco = "EKEDC";
    });
    appData.electric_plans.AEDC.map((plan) => {
      if (plan.id == planId) disco = "AEDC";
    });
    return disco;
  };

  const Transaction = (props) => {
    return (
      <React.Fragment>
        <div className="flex w-full mt-2.5  ">
          <hr className="mt-0" />
          <div
            className="flex w-full mt-2.5 "
            style={{ fontSize: "12px", cursor: "pointer" }}
            onClick={() => {
              transactionSelect(props.transaction);
            }}
          >
            <ul className="flex w-full mt-2.5">
              <div className="flex justify-between ">
                {props.transaction.status * 1 === 0 && (
                  <img src={right} alt="right" />
                )}

                {(props.transaction.status * 1 === 1 ||
                  props.transaction.status * 1 === 2 ||
                  props.transaction.status * 1 === 3 ||
                  props.transaction.status * 1 === 4) && (
                  <i className="mdi mdi-autorenew mdi-24px  active mdi-spin text-warning"></i>
                )}
                {props.transaction.status * 1 === 5 && (
                  <i className="mdi mdi-wallet   mdi-24px text-primary"></i>
                )}
                {(props.transaction.status * 1 === 6 ||
                  props.transaction.status * 1 === 7) && (
                  <i className="mdi mdi-alert-circle-outline  mdi-24px text-danger"></i>
                )}
                <p className="mb-0 mt-0   ml-0 pl-0 ">
                  {transactionStatus[props.transaction.status]}
                </p>
              </div>
              <div className="flex w-full flex-col ml-1">
                <h4 className="font-medium text-sm">
                  {transactionTypes[props.transaction.transaction_type]}
                </h4>
                <p className="mb-0 mt-2 ">{props.transaction.description}</p>
                <p className="mb-0 mt-2 ">
                  {props.transaction.additional_description
                    ? props.transaction.additional_description
                    : props.transaction.device_number}
                </p>
              </div>
              <div className="flex w-full flex-col ml-1">
                <p
                  className={
                    props.transaction.transaction_type > 3
                      ? props.transaction.transaction_type < 10
                        ? "text-danger mt-0 mb-0"
                        : "text-success mt-0 mb-0"
                      : "text-success mt-0 mb-0"
                  }
                >
                  ₦{CurrencyFormat(props.transaction.amount)} /
                  {props.transaction.payment_method * 1 === 0
                    ? "WALLET"
                    : "ATM"}
                </p>
                <p className="mb-0 mt-2">
                  ₦{CurrencyFormat(props.transaction.amount_before)}/₦
                  {CurrencyFormat(props.transaction.amount_after)}
                </p>
                <p className="mb-0 mt-2">{props.transaction.created_at}</p>
              </div>
            </ul>
          </div>
        </div>{" "}
      </React.Fragment>
    );
  };
  return (
    <div className="flex flex-col max-w-md ">
      <div className=" h-h90 px-4 py-8 bg-white rounded-lg sm:px-6 md:px-8 lg:px-10 relative">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-lg">Subscriptions</h2>
          <img src={bell} alt="bell" className="h-5 pr-2" />
        </div>
        <form onSubmit={handleSubmit}>
          <h3 className="font-medium text-sm mt-9">Search </h3>
          <div className="flex flex-col mb-2 mt-3">
            <div className="flex relative ">
              <input
                className=" rounded-l-lg flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                placeholder="Search Subscriptions"
                name="search"
                value={formData.search}
                onChange={formOnChange}
              />

              <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-r border-b  border-slate-300 text-gray-500 shadow-sm text-sm">
                <img src={sort} alt="sort" />
              </span>
            </div>
          </div>
          <div className="flex gap-4 mb-2 mt-2.5">
            <div className=" relative ">
              <select
                value={formData.transactionType}
                name="transactionType"
                onChange={formOnChange}
                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out  m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                <option value="">All Transactions</option>
                {transactionTypes.map((transaction, index) => {
                  return <option value={index}>{transaction}</option>;
                })}
              </select>
            </div>
            <div className=" relative ">
              <select
                name="pageSize"
                value={formData.pageSize}
                onChange={formOnChange}
                className="form-select appearance-none block w-full px-3 py-1.5 text-base  font-normal text-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                <option value="">15 per page</option>
                <option value="30">30 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mb-2">
            <div className=" relative ">
              <input
                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                type="date"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={formOnChange}
              />
            </div>

            <div className=" relative ">
              <input
                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                type="date"
                name="dateTo"
                value={formData.dateTo}
                onChange={formOnChange}
              />
            </div>
          </div>
          <div className="flex w-full my-4">
            <button
              type="submit"
              className="py-2 px-4 bg-primary-orange hover:bg-yellow-200 focus:ring-primary-orange focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              {Loading ? (
                <div className="flex items-center justify-center">
                  <img
                    src={loadingSmall}
                    alt="loading ..."
                    className="w-7 h-7 "
                  />
                </div>
              ) : (
                `Apply`
              )}
            </button>
          </div>
        </form>
        {formData.transactions && (
          <div className="">
            <p className="">
              Showing (
              {formData.per_page * formData.current_page -
                formData.per_page +
                1}{" "}
              to{" "}
              {formData.current_page * formData.per_page -
                formData.per_page +
                formData.transactions.length}{" "}
              ) of {formData.total} Transactions
            </p>
            <div className="overflow-y-scroll h-auto">
              {formData.transactions.map((transaction) => {
                return (
                  <Transaction key={transaction.id} transaction={transaction} />
                  // <div className="flex w-full mt-2.5  ">
                  //   <ul className="w-full">
                  //     <li className="flex justify-between ">
                  //       <div className="">
                  //         <img src={right} alt="right" />
                  //       </div>
                  //       <div className="flex w-full flex-col ml-1">
                  //         <div className="flex justify-between w-full">
                  //           <h4 className="font-medium text-sm">
                  //             sdfggrhfg2gbgh
                  //           </h4>
                  //           <p className="font-bold text-sm text-red-500">
                  //             N 200
                  //           </p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx"> 08106653903</p>
                  //           <p className="font-medium text-xx">From Wallet</p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx">Data Purchase</p>
                  //           <p className="font-medium text-xx">
                  //             22-08-21 5:05pm
                  //           </p>
                  //         </div>
                  //       </div>
                  //     </li>
                  //     <li className="flex justify-between ">
                  //       <div className="">
                  //         <img src={right} alt="right" />
                  //       </div>
                  //       <div className="flex w-full flex-col ml-1">
                  //         <div className="flex justify-between w-full">
                  //           <h4 className="font-medium text-sm">
                  //             sdfggrhfg2gbgh
                  //           </h4>
                  //           <p className="font-bold text-sm text-red-500">
                  //             N 200
                  //           </p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx"> 08106653903</p>
                  //           <p className="font-medium text-xx">From Wallet</p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx">Data Purchase</p>
                  //           <p className="font-medium text-xx">
                  //             22-08-21 5:05pm
                  //           </p>
                  //         </div>
                  //       </div>
                  //     </li>
                  //     <li className="flex justify-between ">
                  //       <div className="">
                  //         <img src={right} alt="right" />
                  //       </div>
                  //       <div className="flex w-full flex-col ml-1">
                  //         <div className="flex justify-between w-full">
                  //           <h4 className="font-medium text-sm">
                  //             sdfggrhfg2gbgh
                  //           </h4>
                  //           <p className="font-bold text-sm text-red-500">
                  //             N 200
                  //           </p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx"> 08106653903</p>
                  //           <p className="font-medium text-xx">From Wallet</p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx">Data Purchase</p>
                  //           <p className="font-medium text-xx">
                  //             22-08-21 5:05pm
                  //           </p>
                  //         </div>
                  //       </div>
                  //     </li>
                  //     <li className="flex justify-between mt-2.5">
                  //       <div className="">
                  //         <img src={wrong} alt="right" />
                  //       </div>
                  //       <div className="flex w-full flex-col ml-1">
                  //         <div className="flex justify-between w-full">
                  //           <h4 className="font-medium text-sm">MTN 2GB SME</h4>
                  //           <p className="font-bold text-sm text-red-500">
                  //             N 200
                  //           </p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx"> 08106653903</p>
                  //           <p className="font-medium text-xx">From Wallet</p>
                  //         </div>
                  //         <div className="flex justify-between w-full">
                  //           <p className="font-medium text-xx">Data Purchase</p>
                  //           <p className="font-medium text-xx">
                  //             22-08-21 5:05pm
                  //           </p>
                  //         </div>
                  //       </div>
                  //     </li>
                  //   </ul>
                  // </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center  justify-center h-11 w-11  rounded-md bg-primary-black text-white">
          <img src={leftsAngle} alt="arrow" />
        </div>
        <div className="font-medium text-xx "> 1 0f 10</div>
        <button className="flex items-center justify-center h-11 w-11   rounded-md bg-primary-black text-white">
          <img src={rightAngle} alt="whatsapp" />
        </button>
      </div>
      <Nav />
    </div>
  );
}

export default Subcription;
