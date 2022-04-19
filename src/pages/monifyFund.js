import React, { useContext } from "react";
import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Bank from "../icons/bank.svg";
import Wallet from "../icons/empty-wallet.svg";
import Profile from "../icons/profile-circle.svg";
import copy from "../icons/copy.svg";
import Nav from "../components/nav";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";

function MonifyFund() {
  // const { user, appData } = useContext(AuthContext);
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  document.title = "Fund Wallet with Bank-" + appData.business.name;

  const history = useHistory();
  const back = () => {
    history.push("/home");
  };
  return (
    <div className="flex flex-col items-center  max-w-md h-full">
      <div className="flex bg-white  h-h90 flex-col w-full  rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <button onClick={back}>
                <img src={LeftAngle} alt="leftAngle" />
              </button>

              <h2 className="ml-8 font-medium text-sm">Fund via Monnify</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
          <div className="divide-y-2 divide-primary-gray">
            <div className="flex flex-col mt-8 space-y-3.5 pb-9">
              <div className="flex justify-between ">
                {" "}
                <p className="font-medium text-sm text-primary-gray">Status:</p>
                <p className="font-semibold text-sm text-red-500 ">
                  {appData.master_settings.fund_status_bank * 1 === 0 ? (
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
                <p className="font-medium text-sm text-primary-black  text-right">
                  Mobile Banking and USSD,
                  <br /> Internet Banking, POS
                </p>
              </div>
            </div>
            <div className="pt-4 text-red-500 text-sm">
              Transaction charge: N53.75
            </div>
          </div>
          <p className="text-primary-gray text-xs mt-12">
            Transfer into your dedicated bank account for auto wallet funding.
          </p>
          <div className="flex flex-col mt-8">
            <div className="flex items-center justify-start space-x-2">
              <img src={Bank} alt="bank" />
              <p className="font-medium text-sm">Bank: WEMA BANK</p>
            </div>
            <div className="flex items-center justify-start space-x-2 mt-3">
              <img src={Wallet} alt="wallet" />
              <p className="font-medium text-sm">
                Account Number:{user.data.monnify_account_number}
              </p>
              <div className="flex gap-1 align-middle">
                <p className="text-xx  text-primary-gray">copy</p>
                <img src={copy} alt="copy" className="" />
              </div>
            </div>
            <div className="flex items-center justify-start space-x-2 mt-3">
              <img src={Profile} alt="profile" />
              <p className="font-medium text-sm">
                Account Name:{" "}
                {`${user.data.firstname} ${user.data.othername} ${user.data.lastname}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default MonifyFund;
