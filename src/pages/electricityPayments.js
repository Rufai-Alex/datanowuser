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
import Nav from "../components/nav";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { FormContext } from "../providers/formValues";
import { useContext } from "react";
import { AppDataContext } from "../providers/appData";

function ElectricityPayments() {
  const { user, setShowModal, showModal } = useContext(AuthContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const selectpaymentMethod = (paymentMethod) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "paymentMethod", value: paymentMethod },
    });
  };
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

  const history = useHistory();
  const back = () => {
    history.push("/home");
  };

  return (
    <div className="flex flex-col items-center  max-w-sm mx-auto">
      <div class="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
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
                  IE
                </div>
              </button>
              <div className="flex  flex-col justify-center items-center">
                <img src={kedo} alt="kedo" />
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  KEDO
                </div>
              </div>
              <div className="flex  flex-col justify-center items-center">
                <img src={aedc} alt="aedc" />
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  AEDC
                </div>
              </div>
              <div className="flex  flex-col justify-center items-center">
                <img src={phdc} alt="phdc" />
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  PHDC
                </div>
              </div>
              <div className="flex  flex-col justify-center items-center">
                <img src={jedc} alt="jedc" />
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  JEDC
                </div>
              </div>
              <div className="flex  flex-col justify-center items-center">
                <img src={ibedc} alt="ibedc" />
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  IBEDC
                </div>
              </div>
              <div className="flex  flex-col justify-center items-center">
                <img src={ekedc} alt="ekedc" />
                <div className=" font-extrabold text-xs mt-2.5 text-primary-black">
                  EKEDC
                </div>
              </div>
              <div className="flex  flex-col justify-center items-center">
                <img src={kedc} alt="kedc" />
                <div className=" font-extrabold text-xs mt-2.5  text-primary-black">
                  KEDC
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mt-12">
              <div className="w-full space-y-6">
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <div className="flex justify-between">
                        <span className="font-medium text-primary-black text-sm">
                          {" "}
                          Meter Type
                        </span>
                        <span className="font-medium text-primary-gray text-sm">
                          Balance: N5,000.90
                        </span>
                      </div>

                      <input
                        type="phone"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent mt-3.5"
                        placeholder="Select meter type"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <p className="mt-4 font-medium text-primary-black text-sm">
                        Meter Number
                      </p>
                      <input
                        type="text"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange   focus:border-transparent mt-3"
                        placeholder="0000 0000 0000"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <p className="mt-4 font-medium text-primary-black text-sm">
                        Phone Number
                      </p>
                      <input
                        type="text"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange   focus:border-transparent mt-3"
                        placeholder="000 0000 0000"
                      />
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
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange   focus:border-transparent mt-3"
                                placeholder="Minimum N50"
                              />
                            </label>
                          </div>
                        </div>
                      </p>
                    </label>
                  </div>
                </div>

                <h3 className="mt-4 font-medium text-primary-black text-sm">
                  Payment Method
                </h3>
                <div class="flex gap-4 item-center">
                  <button
                    type="button"
                    class={
                      "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-gray-300 text-center text-base font-medium shadow-md   rounded-lg " +
                      (formData.paymentMethod === "walletPayment"
                        ? "bg-primary-black text-white"
                        : "bg-white text-primary-black")
                    }
                    onClick={() => selectpaymentMethod("walletPayment")}
                  >
                    Wallet
                  </button>
                  <button
                    type="button"
                    class={
                      "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-gray-300 text-center text-base font-medium shadow-md   rounded-lg " +
                      (formData.paymentMethod === "atm"
                        ? "bg-primary-black text-white"
                        : "bg-white text-primary-black")
                    }
                    onClick={() => selectpaymentMethod("atm")}
                  >
                    ATM
                  </button>
                </div>

                <p className="mt-4 font-medium text-primary-black text-sm">
                  Total Price:
                </p>
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <p className="mt-4 font-medium text-primary-black text-sm">
                        Password
                      </p>
                      <input
                        type="password"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent mt-3.5"
                        placeholder="password"
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
