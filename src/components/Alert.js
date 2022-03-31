import React, { useContext, useState, useEffect } from "react";
import error from "../icons/wrong.svg";
import success from "../icons/right.svg";
import contact from "../icons/headphone.svg";
import wallet from "../icons/wallet-add.svg";
import receipt from "../icons/receipt-item.svg";
import erwee from "../icons/info-circle.svg";
import retry from "../icons/refresh-2.svg";
import { AuthContext } from "../providers/auth";
import { AppDataContext } from "../providers/appData";
import { getOS } from "../helper/getOs";
import { FormContext } from "../providers/formValues";
import { useHistory } from "react-router-dom";

const Alert = ({ color, message }) => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(true);
  const { appData, dispatch } = useContext(AppDataContext);

  const { formData, formDispatch } = useContext(FormContext);

  useEffect(() => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "Alert", value: { isOpen: false, message: "", type: "" } },
    });
  }, []);
  const clearModal = () => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "alert", value: { isOpen: false, message: "", type: "" } },
    });
    history.push("/home");
  };

  return (
    <>
      {formData.Alert.isOpen &&
        (formData.Alert.type === "error" ? (
          <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
              <div className="relative w-full my-6 mx-auto max-w-sm ">
                {/*content*/}

                <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto">
                  <div class="w-full h-full text-center">
                    <div class="flex h-full flex-col justify-between">
                      <img src={error} alt="" className="h-32 " />
                      <p class="text-gray-800  text-xl font-bold mt-4">ERROR</p>
                      <p class="text-gray-700  text-xs py-2 px-6">{message}</p>
                      <div class="flex items-center justify-between gap-4 w-full mt-8">
                        <button
                          type="button"
                          class="py-8 px-4  bg-slate-200 hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200  w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  "
                        >
                          <a
                            target="_"
                            href={
                              getOS() === "WEB"
                                ? "https://web.whatsapp.com/send?phone=234" +
                                  appData.settings.contact_whatsapp_number +
                                  "&text=Hello!"
                                : "https://api.whatsapp.com/send?phone=234" +
                                  appData.settings.contact_whatsapp_number +
                                  "&text=Hello!"
                            }
                            className="flex justify-center items-center flex-col"
                          >
                            <img
                              src={contact}
                              alt=""
                              className="bg-slate-700 p-2 rounded-2xl "
                            />
                            Report this issue
                          </a>
                        </button>
                        <button
                          type="button"
                          class="py-10 px-4  bg-slate-200 hover:bg-gray-100 focus:bg-gray-100 focus:ring-offset-indigo-200  w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center items-center flex-col "
                          onClick={() =>
                            formDispatch({
                              type: "INPUTVALUES",
                              data: {
                                name: "Alert",
                                value: { isOpen: false, message: "", type: "" },
                              },
                            })
                          }
                        >
                          <img
                            src={retry}
                            alt=""
                            className="bg-slate-700 p-2 rounded-2xl "
                          />
                          Retry
                        </button>
                      </div>
                      <div className="flex items-center justify-center mt-4 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className={
                            " bg-primary-orange text-white w-full font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                          }
                          type="button"
                          onClick={() => clearModal()}
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : (
          <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
              <div className="relative w-full my-6 mx-auto max-w-sm ">
                {/*content*/}

                <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto">
                  <div class="w-full h-full text-center">
                    <div class="flex h-full flex-col justify-between">
                      <img src={success} alt="" className="h-32 " />
                      <p class="text-gray-800 text-xl font-bold mt-4">
                        {" "}
                        SUCCESS
                      </p>
                      <p class="text-gray-700  text-xs py-2 px-6">{message}</p>
                      <div class=" grid grid-cols-2 justify-between gap-4 w-full mt-8">
                        <button
                          type="button"
                          class="py-8 px-4  bg-slate-200 hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg   flex justify-center items-center flex-col   "
                        >
                          <img
                            src={wallet}
                            alt=""
                            className="bg-slate-700 p-2 rounded-2xl fill-white "
                          />
                          Add to Beneficiaries
                        </button>
                        <button
                          type="button"
                          class="py-10 px-4  bg-slate-200 hover:bg-gray-100 focus:bg-gray-100 focus:ring-offset-indigo-200  w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center items-center flex-col "
                        >
                          <img
                            src={receipt}
                            alt=""
                            className="bg-slate-700 p-2 rounded-2xl "
                          />
                          Print Receipt
                        </button>
                      </div>
                      <div className="flex items-center justify-center mt-4 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className={
                            " bg-primary-orange text-white w-full font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                          }
                          type="button"
                          onClick={() => clearModal()}
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ))}
    </>
  );
};

export default Alert;
