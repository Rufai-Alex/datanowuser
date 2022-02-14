import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import dstv from "../icons/dstv.svg";
import startimes from "../icons/startimes.svg";
import gotv from "../icons/gotv.svg";
import Nav from "../components/nav";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { FormContext } from "../providers/formValues";
import { useContext, useEffect } from "react";
import { AppDataContext } from "../providers/appData";
import CablePlansModal from "../components/cablePalnsModals";

function CablePurchase() {
  const { user, setShowModal, showModal } = useContext(AuthContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);

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
  document.title = "Purchase Cable TV-" + appData.business.name;
  return (
    <div className="flex flex-col items-center  max-w-sm mx-auto ">
      <div class="flex  flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
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
            <h2 className="font-medium text-sm mt-9">Select Cable Provider</h2>
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
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <div className="flex justify-between">
                        <span className="font-medium text-primary-black text-sm">
                          Smart Card Number
                        </span>
                        <span className="font-medium text-primary-gray text-sm">
                          Balance: {`₦ ${user.data.wallet_balance}`}
                        </span>
                      </div>

                      <div class="flex relative mt-2.5">
                        <input
                          type="text"
                          class=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent "
                          placeholder="0000 0000 0000"
                        />
                        <span class="rounded-r-md inline-flex bg-primary-orange items-center px-3 border-t text-white border-r border-b  border-gray-300 shadow-sm text-sm">
                          <button class="">Verify</button>
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <label>
                      <p className="mt-4 font-medium text-primary-black text-sm">
                        Provider Plans
                      </p>
                      <input
                        type="text"
                        autocomplete="off"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mt-3 "
                        placeholder="Select plan"
                        value={formData.plans_name}
                        onFocus={() => {
                          setShowModal(!showModal);

                          console.log(showModal);

                          console.log("I am here");
                        }}
                      ></input>
                    </label>
                    {showModal ? <CablePlansModal /> : null}
                    {console.log(showModal)}
                  </div>
                </div>
                <h3 className="mt-4 font-medium text-primary-black text-sm">
                  Payment Method
                </h3>
                <div class="flex gap-4 item-center">
                  <button
                    type="button"
                    className={
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
                    className={
                      "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-gray-300 text-center text-base font-medium shadow-md   rounded-lg " +
                      (formData.paymentMethod === "atmPayment"
                        ? "bg-primary-black text-white"
                        : "bg-white text-primary-black")
                    }
                    onClick={() => selectpaymentMethod("atmPayment")}
                  >
                    ATM
                  </button>
                </div>{" "}
                <p className="mt-4 font-medium text-primary-black text-sm">
                  Total Price: ₦
                  {formData.paymentMethod === "atm"
                    ? formData.atmPrice
                    : formData.walletPrice}
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
                        name="password"
                        onChange={(e) => {
                          formOnChange(e);
                        }}
                        value={formData.password}
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

export default CablePurchase;
