import React, { useContext } from "react";
import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../providers/auth";

function AutoAgentFund() {
  const { user, appData } = useContext(AuthContext);

  const history = useHistory();
  const back = () => {
    history.push("/home");
  };
  return (
    <div className="flex flex-col items-center  max-w-md h-full">
      <div class="flex bg-white  h-h90 flex-col w-full  rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
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
              Transaction charge: <br />
              N51 - N9,900 = N26.75 fee N9,900 - Above = N70 fee
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default AutoAgentFund;
