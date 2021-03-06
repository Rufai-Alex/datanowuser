import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import eisalat from "../icons/9mobile.svg";
import glo from "../icons/glo.svg";
import airtel from "../icons/airtel.svg";
import mtn from "../icons/mtn.svg";
import copyIcon from "../icons/copy.svg";
import Nav from "../components/nav";
import { ToastContainer, toast } from "react-toastify";

function Balance() {
  const [value, setValue] = useState("");
  const [copy, setCopy] = useState("");
  const myContainer = useRef(null);
  const history = useHistory();

  const Copy = (text) => {
    navigator.clipboard.writeText(text).then(() => toast("Copied"));
  };

  const back = () => {
    history.push("/home");
  };

  return (
    <div className="flex">
      <div className="">
        {" "}
        <Nav />
      </div>
      <div className="flex-1 flex flex-col items-center mx-auto md:mt-12 ">
        <div className="flex  flex-col h-h90 w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
          <div className="px-4 py-8">
            <div className="flex justify-between items-center">
              <div className="flex justify-between item-center">
                <button onClick={back}>
                  <img src={LeftAngle} alt="leftAngle" />
                </button>
                <h2 className="ml-8 font-medium text-sm">Balance Codes</h2>
              </div>
              <img src={bell} alt="bell" className="hidden" />
            </div>
            <div className="mt-9"></div>
            <div className="flex justify-between ">
              <img src={mtn} alt="mtn" className="md:h-28" />
              <div className="flex flex-col gap-4 ">
                <div className="flex gap-4 justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Normal Data: *131*4#
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*131*4#");
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    SME Data: *461*4#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*461*4#");
                      }}
                    />
                  </div>
                </div>
                <div className="flex  gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Airtime: *556#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*556#");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="  flex justify-between mt-11">
              <img src={glo} alt="glo" className="md:h-28" />
              <div className=" flex-col flex gap-4">
                <div className="flex  gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Normal Data: *127*0#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*127*0#");
                      }}
                    />
                  </div>
                </div>
                <div className="flex  gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Airtime: *124#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*142#");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-11">
              <img src={airtel} alt="airtel" className="md:h-28" />{" "}
              <div className=" flex-col flex gap-4">
                <div className="flex  gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Normal Data: *140#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*140#");
                      }}
                    />
                  </div>
                </div>
                <div className="flex  gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Airtime: *123#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*123#");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-11">
              <img src={eisalat} alt="etisalat" className="md:h-28" />
              <div className=" flex-col flex gap-4">
                <div className="flex  gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Normal Data: *228#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*228#");
                      }}
                    />
                  </div>
                </div>
                <div className="flex  gap-4  justify-end">
                  <p className="text-xs font-medium md:text-lg">
                    Airtime: *232#{" "}
                  </p>
                  <div className="flex gap-1 align-middle items-center">
                    <p className="text-xx  text-primary-gray md:text-xs">
                      copy
                    </p>
                    <img
                      src={copyIcon}
                      alt="copy"
                      className=""
                      onClick={() => {
                        Copy("*232#");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
