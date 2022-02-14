import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { useContext } from "react";

function AtmFund() {
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
                  {appData.master_settings.fund_status_atm * 1 === 0 ? (
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
                  1 - 3 Minutes
                </p>
              </div>
              <div className="flex justify-between ">
                {" "}
                <p className="font-medium text-sm text-primary-gray">
                  Supports:
                </p>
                <p className="font-semibold text-sm text-primary-black ">
                  VISA, MASTERCARD, VERVE
                </p>
              </div>
            </div>
            <div className="pt-4 text-red-500 text-sm">
              Transaction Fee: 1.4%
            </div>
          </div>
          <div className="flex flex-col mt-7">
            <form action="">
              <div className="w-full">
                <div className=" relative ">
                  <label>
                    <p className="mt-4 font-medium text-primary-black text-sm">
                      Amount to Recharge
                    </p>
                    <input
                      type="number"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent mt-3.5"
                      placeholder={
                        "Enter amount-Min ₦ " +
                        appData.settings.minimum_atm_funding
                      }
                    />
                  </label>
                </div>
              </div>
              <div>
                <span class="block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    class="py-2 px-4 bg-primary-orange hover:bg-yellow-200 focus:ring-primary-orange focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-6"
                  >
                    Pay
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

export default AtmFund;
