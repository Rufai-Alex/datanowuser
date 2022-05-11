import bell from "../icons/Bell.svg";
import Logo from "../icons/Logo.svg";
import add from "../icons/add.svg";
import arrow from "../icons/arrow-2.svg";
import refresh from "../icons/refresh-2.svg";
import wifi from "../icons/wifi.svg";
import phone from "../icons/call-calling.svg";
import devices from "../icons/devices.svg";
import flash from "../icons/flash.svg";
import eclipse1 from "../icons/eclipse1.svg";
import eclipse2 from "../icons/eclipse2.svg";
import mobile from "../icons/mobile.svg";
import headphone from "../icons/headphone.svg";
import close from "../icons/Close.svg";
import info from "../icons/info-circle.svg";
import Nav from "../components/nav";
import Modal from "../components/modal";
import { useState, useEffect, useContext } from "react";
import Next from "../components/next";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { AppDataContext } from "../providers/appData";
import { UserContext } from "../providers/userData";

function Home() {
  const { appData, dispatch } = useContext(AppDataContext);
  const { user, userDispatch } = useContext(UserContext);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  document.title = appData.business.name;
  console.log(user);
  console.log(appData);
  const getAppData = () => {
    fetch(localStorage.getItem("apiURL") + "data")
      .then((response) => response.json())
      .then((response) => {
        //  dispatch({ type: 'STORE_APP_DATA', appData:{...response.data,is_mobile:appData.is_mobile}})})
        dispatch({
          type: "STORE_APP_DATA",
          appData: {
            is_mobile: appData.is_mobile,
            timestamp: new Date().getTime(),
            ...response.data,
          },
        });
      });
  };
  const refreshUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(
      localStorage
        .getItem("apiURL")
        .substr(0, localStorage.getItem("apiURL").length - 1),
      requestOptions,
    )
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        console.log(data);
        if (data.status === "success") {
          console.log(data);
          userDispatch({ type: "UPDATE_USER", action: data });
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
          history.push("/");
        }

        // formDispatch({
        //   type: "SET_FORM_DATA",
        //   data: { name: "isUserRefreshed", value: true },
        // });
      });

    getAppData();
    if (!appData.settings) getAppData();
    else if (!appData.timestamp) getAppData();
    else if (new Date().getTime() - appData.timestamp > 7200000) getAppData();
    document.documentElement.style.setProperty(
      "--primary-color",
      appData.business.primary_color,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      appData.business.secondary_color,
    );
  };

  useEffect(() => {
    refreshUser();
    console.log("====================================");
    console.log(" me refreshUser");
    console.log("====================================");
  }, []);

  return (
    <div className="h-screen w-full max-w-sm mx-auto relative">
      <div className="self-center flex flex-col items-center h-h90">
        <div className="p-5">
          <div className="flex justify-between w-full">
            <p className="font-medium text-sm ">
              Hello{" "}
              {user.data &&
                `${user.data.firstname} ${user.data.othername} ${user.data.lastname}`}
            </p>

            <img src={bell} alt="bell" className="h-5 pr-2" />
          </div>
          <div
            className={
              " w-full p-3 mt-7 rounded-lg bg-primary-orange relative "
            }
          >
            <img
              src={eclipse1}
              alt=""
              className="absolute top-0 right-0 z-10"
            />
            <img
              src={eclipse2}
              alt=""
              className="absolute bottom-0 left-0 z-10"
            />
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm">Wallet balance</h3>
              <div>
                <img
                  src={appData.business.website + "/logo.png"}
                  alt="logo"
                  className="-mb-4"
                  style={{ height: 40 }}
                />
              </div>
            </div>
            <div className="flex items-center mt-1">
              <p className="text-xl font-bold">{`₦ ${user.data.wallet_balance}`}</p>
              <span className="ml-3">
                <img src={refresh} alt="refresh" className="" />
              </span>
            </div>
            <div className="flex justify-between mt-6 gap-x-3">
              <button
                className="bg-primary-black flex  rounded-lg   justify-between items-center w-full py-2 px-4 z-50"
                onClick={() => setShowModal(true)}
              >
                <span className=" inline-flex  items-center p-0.5 border bg-white  border-white rounded-md">
                  <img src={add} alt="add" className="h-5 w-5 bg-white" />
                </span>

                <h4 className="font-medium text-sm leading-3  text-white flex flex-col justify-start items-start mr-4">
                  {/* //// */}
                  <button>
                    <p>Fund</p>
                    <p className="mt-1">Wallet</p>{" "}
                  </button>

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

                              {/* ///////// */}
                              <h3 className="text-lg font-extrabold text-black text-center mx-auto">
                                Fund Wallet Via
                              </h3>
                            </div>
                            {/*body*/}
                            <div className="relative flex flex-col text-black  mb-5">
                              <table className="table p-4 bg-white shadow rounded-lg ">
                                <tbody className="bg-secondary-blue">
                                  <tr className="text-secondary-black  border-b-8 border-white">
                                    <td className=" font-medium text-sm">
                                      <Link to="/outoAgent">Auto Agent</Link>
                                    </td>
                                    <td className=" p-4 ">
                                      <div className=" font-medium text-xx text-primary-gray">
                                        <Link to="/outoAgent">Delivery</Link>
                                      </div>
                                      <div className="mt-1">
                                        <Link to="/outoAgent"> 1-30Mins</Link>
                                      </div>
                                    </td>
                                    <td className=" p-4 ">
                                      <Link to="/outoAgent">
                                        <div className="text-xx text-primary-gray">
                                          Status
                                        </div>

                                        {appData.master_settings
                                          .fund_status_auto *
                                          1 ===
                                        0 ? (
                                          <div className="mt-1 text-green-500 ">
                                            Active
                                          </div>
                                        ) : (
                                          <div className="mt-1 text-red-500 ">
                                            Down
                                          </div>
                                        )}
                                      </Link>
                                    </td>
                                  </tr>{" "}
                                  <tr className="text-secondary-black border-b-8 border-white">
                                    <td className=" font-medium text-sm">
                                      <Link to="/monify"> Monnify</Link>
                                    </td>
                                    <td className="border-b-2 p-4 ">
                                      <div className=" font-medium text-xx text-primary-gray">
                                        <Link to="/monify"> Delivery</Link>
                                      </div>
                                      <div className="mt-1">
                                        {" "}
                                        <Link to="/monify"> 1-10Mins</Link>
                                      </div>
                                    </td>
                                    <td className="border-b-2 p-4 ">
                                      {" "}
                                      <Link to="/monify">
                                        <div className="text-xx text-primary-gray">
                                          Status
                                        </div>
                                        {appData.master_settings
                                          .fund_status_bank *
                                          1 ===
                                        0 ? (
                                          <div className="mt-1 text-green-500">
                                            Active
                                          </div>
                                        ) : (
                                          <div className="mt-1 text-red-500">
                                            Down
                                          </div>
                                        )}
                                      </Link>
                                    </td>
                                  </tr>
                                  <tr className="text-secondary-black ">
                                    <td className=" font-medium text-sm">
                                      <Link to="/atm">ATM</Link>
                                    </td>
                                    <td className="border-b-2 p-4 ">
                                      <div className=" font-medium text-xx text-primary-gray">
                                        <Link to="/atm"> Delivery</Link>
                                      </div>
                                      <div className="mt-1">
                                        <Link to="/atm">1-3Mins</Link>
                                      </div>
                                    </td>
                                    <td className="border-b-2 p-4 ">
                                      <div className="text-xx text-primary-gray">
                                        Status
                                      </div>

                                      <Link to="/atm">
                                        {appData.master_settings
                                          .fund_status_atm *
                                          1 ===
                                        0 ? (
                                          <div className="mt-1 text-green-500">
                                            Active{" "}
                                          </div>
                                        ) : (
                                          <div className="mt-1 text-red-500">
                                            Down
                                          </div>
                                        )}
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {/*footer*/}
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                  {/* ///// */}
                </h4>
              </button>
              <button
                className="bg-white flex  rounded-lg   justify-between items-center w-full py-2 px-4 z-50"
                onClick={() => history.push("transferToUser")}
              >
                <span className="inline-flex  items-center p-0.5 border bg-primary-black  border-primary-black rounded-md ">
                  <img
                    src={arrow}
                    alt="Arrow"
                    className="h-5 w-5 bg-primary-black"
                  />
                </span>
                <Link to="transferToUser">
                  <h4 className="font-medium text-sm leading-3 ml-3 text-black flex flex-col justify-start items-start ">
                    <p> Transfer</p>
                    <p className="mt-1"> to User</p>
                  </h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="mt-5 ">
            <h2 className="font-bold">Services</h2>
            <div className="flexs grid grid-cols-2 gap-3  gap-y-3s gap-x-3.5s flex-wraps mt-4 i  ">
              <Link to="data">
                <button className="bg-primary-black w-full flex  rounded-lg   justify-start items-center  py-2 px-4  ">
                  <span className="inline-flex  items-center p-1 border bg-primary-orange  border-primary-orange rounded-md ">
                    <img src={wifi} alt="wifi" className=" bg-primary-orange" />
                  </span>
                  <h4 className="min-w-max font-medium text-sm leading-3 ml-3 text-white flex flex-col justify-start items-start">
                    <p>Data </p>
                    <p className="mt-1">Purchase</p>
                  </h4>
                </button>
              </Link>
              <Link to="airtime">
                <button className="bg-primary-black flex w-full  rounded-lg   justify-start items-center  py-2 px-4 ">
                  <span className="inline-flex  items-center p-1 border bg-primary-orange  border-primary-orange rounded-md">
                    <img
                      src={phone}
                      alt="phone"
                      className=" bg-primary-orange"
                    />
                  </span>

                  <h4 className="font-medium text-sm leading-3 ml-3 text-white flex flex-col justify-start items-start">
                    <p>Airtime</p>
                    <p className="mt-1"> Purchase</p>
                  </h4>
                </button>
              </Link>
              <Link to="cable">
                <button className="bg-primary-black flex  w-full rounded-lg   justify-start items-center  py-2 px-4  ">
                  <span className="inline-flex  items-center p-1 border bg-primary-orange  border-primary-orange rounded-md">
                    <img
                      src={devices}
                      alt="devices"
                      className=" bg-primary-orange"
                    />
                  </span>

                  <h4 className="font-medium text-sm leading-3 ml-3 text-white flex flex-col justify-start items-start">
                    <p> Cable</p> <p className="mt-1"> Payment</p>
                  </h4>
                </button>
              </Link>
              <Link to="electricity">
                <button className="bg-primary-black flex w-full rounded-lg   justify-start items-center  py-2 pl-4 pr-3.5   ">
                  <span className="inline-flex  items-center p-1 border bg-primary-orange  border-primary-orange rounded-md ">
                    <img
                      src={flash}
                      alt="flash"
                      className=" bg-primary-orange"
                    />
                  </span>

                  <h4 className="font-medium text-sm leading-3 ml-3 text-white flex flex-col justify-start items-start">
                    <p> Electricity</p> <p className="mt-1"> Payment</p>
                  </h4>
                </button>
              </Link>
              <Link to="code">
                <button className="bg-primary-black flex w-full  rounded-lg   justify-start items-center  py-2 pl-4 pr-6  ">
                  <span className="inline-flex  items-center p-1 border bg-primary-orange  border-primary-orange rounded-md ">
                    <img
                      src={mobile}
                      alt="Mobil"
                      className=" bg-primary-orange"
                    />
                  </span>

                  <h4 className="font-medium text-sm leading-3 ml-3 text-white flex flex-col justify-start items-start">
                    <p>Balance</p>
                    <p className="mt-1">Codes</p>
                  </h4>
                </button>
              </Link>
            </div>
          </div>
          <div className=" mx-auto bg-primary-black  text-white flex  px-4 py-3 rounded-full mt-20 justify-center items-center w-56 ">
            <Link to="faq">
              <button className="flex justify-center items-center ">
                <img src={info} alt="info" />
                <p className="font-medium text-xs py-1 px-2 pr-5  border-r-w1 bordercolorfaq ">
                  FAQS
                </p>
              </button>
            </Link>
            <Link to="contact">
              <button className="flex justify-center items-center ml-4">
                <img src={headphone} alt="headphone" />
                <p className="font-medium text-xs px-1">Contact&nbsp;Us</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Home;
