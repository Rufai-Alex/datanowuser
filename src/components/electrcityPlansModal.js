import React, { useContext, useEffect, useState } from "react";

import close from "../icons/Close.svg";
import { FormContext } from "../providers/formValues";
import { AuthContext } from "../providers/auth";
import { AppDataContext } from "../providers/appData";
import { useHistory, Link } from "react-router-dom";

function CablePlansModal() {
  const { formData, formDispatch } = useContext(FormContext);
  const { user, setShowModal, showModal } = useContext(AuthContext);
  const { appData, dispatch } = useContext(AppDataContext);
  let myNetwork;

  switch (formData.network) {
    case "AEDC":
      myNetwork = appData.electric_plans.AEDC;
      break;
    case "EKEDC":
      myNetwork = appData.electric_plans.EKEDC;
      break;
    case "IBEDC":
      myNetwork = appData.electric_plans.IBEDC;
      break;
    case "IKEDC":
      myNetwork = appData.electric_plans.IKEDC;
      break;
    case "JED":
      myNetwork = appData.electric_plans.JED;
      break;
    case "KAEDCO":
      myNetwork = appData.electric_plans.KAEDCO;
      break;
    case "KEDCO":
      myNetwork = appData.electric_plans.IBEDC;
      break;

    case "PHED":
      myNetwork = appData.electric_plans.PHED;
      break;
    default:
      myNetwork = "please select a network";
  }
  console.log(myNetwork);
  const inputPlansId = (
    plans_id,
    plans_name,
    walletPrice,
    atmPrice,
    commission,
  ) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "plans_id", value: plans_id },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "plans_name", value: plans_name },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPrice", value: walletPrice },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPrice", value: atmPrice },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "commission", value: commission },
    });
    setShowModal(false);
  };
  console.log(formData);
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute w-full  mx-auto max-w-sm top-44 inset-x-0 ">
          {}
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex py-4 rounded-t-lg">
              <button
                className=" bg-transparent border-0 text-right  outline-none focus:outline-none ml-8 h-6 w-5"
                onClick={() => setShowModal(false)}
              >
                <img src={close} alt="close" />
              </button>
              <h3 className="text-lg font-extrabold text-black text-center mx-auto">
                CABLE PLAN
              </h3>
            </div>
            {/*body*/}
            <div className="relative flex flex-col text-black  mb-5">
              <table className="table p-4 bg-white shadow rounded-lg ">
                <tbody className="bg-secondary-blue">
                  {console.log(formData.network)}

                  {myNetwork.map((network) => (
                    <tr
                      className="text-secondary-black  border-b-8 border-white"
                      key={network.id}
                      onClick={() => {
                        inputPlansId(
                          network.id,
                          network.name,
                          network.wallet_price,
                          network.atm_price,
                          network.commission,
                        );
                      }}
                    >
                      <td className=" font-medium text-sm p-2">
                        {network.name}
                      </td>
                      <td className=" p-4 ">
                        <div className=" font-medium text-xx text-primary-gray">
                          Wallet
                        </div>
                        <div className="mt-1">
                          {" "}
                          {`₦${network.wallet_price}`}
                        </div>
                      </td>{" "}
                      <td className=" p-1 ">
                        <div className=" font-medium text-xx text-primary-gray">
                          ATM
                        </div>
                        <div className="mt-1"> {`₦${network.atm_price}`}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default CablePlansModal;
