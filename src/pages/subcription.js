import bell from "../icons/Bell.svg";
import sort from "../icons/sort.svg";
import wrong from "../icons/wrong.svg";
import right from "../icons/right.svg";
import leftsAngle from "../icons/leftsAngle.svg";
import rightAngle from "../icons/rightAngle.svg";
import Nav from "../components/nav";
import close from "../icons/Close.svg";
import { useState } from "react";
function Subcription() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col max-w-md ">
      <div className=" h-h90 px-4 py-8 bg-white rounded-lg sm:px-6 md:px-8 lg:px-10 relative">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-lg">Subscriptions</h2>
          <img src={bell} alt="bell" className="h-5 pr-2" />
        </div>
        <form>
          <h3 className="font-medium text-sm mt-9">Search </h3>
          <div className="flex flex-col mb-2 mt-3">
            <div className="flex relative ">
              <input
                className=" rounded-l-lg flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                placeholder="Search Subscriptions"
              />
              {/* /////// */}
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="absolute w-full  mx-auto max-w-sm bottom-0">
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
                          <h3 className="text-lg font-extrabold text-black text-center mx-auto ">
                            Transaction list
                          </h3>
                        </div>
                        {/*body*/}
                        <div className="relative flex flex-col   mb-5 gap-y-1 text-base font-medium text-primary-black">
                          <p className=" py-3 px-12 bg-secondary-blue  ">
                            All Subscriptions
                          </p>
                          <p className=" bg-secondary-blue py-3 px-12">Data</p>
                          <p className=" bg-secondary-blue py-3 px-12">
                            Airtime
                          </p>
                          <p className=" bg-secondary-blue py-3 px-12">Cable</p>
                          <p className=" bg-secondary-blue py-3 px-12 -mb-6">
                            Electricity
                          </p>
                        </div>
                        {/*footer*/}
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
              {/* ///// */}
              <span className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-r border-b  border-slate-300 text-gray-500 shadow-sm text-sm">
                <img src={sort} alt="sort" />
              </span>
            </div>
          </div>
          <div className="flex gap-4 mb-2 mt-2.5">
            <div className=" relative ">
              <input
                className=" rounded-lg border-transparent flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                placeholder="Select"
                onClick={() => setShowModal(true)}
              />
            </div>
            <div className=" relative ">
              <input
                className=" rounded-lg border-transparent flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                placeholder="Pages"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-2">
            <div className=" relative ">
              <input
                className=" rounded-lg border-transparent flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                placeholder="From"
              />
            </div>
            <div className=" relative ">
              <input
                className=" rounded-lg border-transparent flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                placeholder="To"
              />
            </div>
          </div>
          <div className="flex w-full my-4">
            <button
              type="submit"
              className="py-2 px-4 bg-primary-orange hover:bg-yellow-200 focus:ring-primary-orange focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Apply
            </button>
          </div>
        </form>
        <div className="flex w-full mt-2.5">
          <ul className="w-full">
            <li className="flex justify-between ">
              <div className="">
                <img src={right} alt="right" />
              </div>
              <div className="flex w-full flex-col ml-1">
                <div className="flex justify-between w-full">
                  <h4 className="font-medium text-sm">MTN 2GB SME</h4>
                  <p className="font-bold text-sm text-red-500">N 200</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="font-medium text-xx"> 08106653903</p>
                  <p className="font-medium text-xx">From Wallet</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="font-medium text-xx">Data Purchase</p>
                  <p className="font-medium text-xx">22-08-21 5:05pm</p>
                </div>
              </div>
            </li>
            <li className="flex justify-between mt-2.5">
              <div className="">
                <img src={wrong} alt="right" />
              </div>
              <div className="flex w-full flex-col ml-1">
                <div className="flex justify-between w-full">
                  <h4 className="font-medium text-sm">MTN 2GB SME</h4>
                  <p className="font-bold text-sm text-red-500">N 200</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="font-medium text-xx"> 08106653903</p>
                  <p className="font-medium text-xx">From Wallet</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="font-medium text-xx">Data Purchase</p>
                  <p className="font-medium text-xx">22-08-21 5:05pm</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center  justify-center h-11 w-11  rounded-md bg-primary-black text-white">
          <img src={leftsAngle} alt="whatsapp" />
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
