import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import loadingSmall from "../icons/loadingSmall.svg";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";
import Alert from "../components/Alert";
import { FormContext } from "../providers/formValues";

function Profile() {
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { formData, formDispatch } = useContext(FormContext);

  document.title = "Profile-" + appData.business.name;
  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFocus = (e) => {
    setFocused(true);
    console.log("forcused");
  };
  const history = useHistory();
  const back = () => {
    history.push("/home");
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
          window.location.reload(false);
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
        }
      });
  };
  useEffect(() => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "firstname", value: user.data.firstname },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "othername", value: user.data.othername },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: { name: "lastname", value: user.data.lastname },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: { name: "email", value: user.data.email },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: { name: "phone_number", value: user.data.phone_number },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "password", value: "" },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "cpassword", value: "" },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "Alert",
        value: { isOpen: false, message: "" },
      },
    });
    document.documentElement.style.setProperty(
      "--primary-color",
      appData.business.primary_color,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      appData.business.secondary_color,
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var urlencoded = new URLSearchParams();
    urlencoded.append("firstname", String(formData.firstname));
    urlencoded.append("othername", String(formData.othername));
    urlencoded.append("lastname", String(formData.lastname));
    urlencoded.append("email", String(formData.email));
    urlencoded.append("phone_number", String(formData.phone_number));
    formData.password &&
      urlencoded.append("password", String(formData.password));
    formData.cpassword &&
      urlencoded.append("cpassword", String(formData.cpassword));
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,

      body: urlencoded,
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
        setSending(false);
        console.log(data);
        if (data.status === "success") {
          refreshUser();
          setEditOpen(false);
        } else if (
          data.message === "Token Expired" ||
          data.message === "User Not Found"
        ) {
          history.push("/signout");
        } else if (data.errors) {
          let errorString = "";
          const objectValues = Object.values(data.errors);
          objectValues.map((error) => {
            errorString = errorString + error + ", ";
          });

          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: errorString, type: "error" },
            },
          });

          setSending(false);
        } else {
          formDispatch({
            type: "INPUTVALUES",
            data: {
              name: "Alert",
              value: { isOpen: true, message: data.message, type: "error" },
            },
          });

          setSending(false);
        }
      })
      .catch((error) => {
        console.log("error", error);

        formDispatch({
          type: "INPUTVALUES",
          data: {
            name: "Alert",
            value: {
              isOpen: true,
              message: "unable to connect to server",
              type: "error",
            },
          },
        });
        setSending(false);
      });
  };
  console.log(formData);
  return (
    <div className="flex flex-col items-center  max-w-md ">
      {formData.Alert ? <Alert message={formData.Alert.message} /> : ""}

      <div className="flex  flex-col h-h90 w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <img src={LeftAngle} alt="leftAngle" onClick={back} />
              <h2 className="ml-8 font-medium text-sm">Profile</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
          <div className="flex flex-col mt-8 space-y-3.5">
            <div className="flex justify-between ">
              {" "}
              <p className="font-medium text-sm text-primary-gray">
                Firstname :
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                {user.data.firstname}
              </p>
            </div>
            <div className="flex justify-between ">
              {" "}
              <p className="font-medium text-sm text-primary-gray">
                Lastname :
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                {user.data.lastname}
              </p>
            </div>
            <div className="flex justify-between ">
              {" "}
              <p className="font-medium text-sm text-primary-gray">
                Othername :
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                {user.data.othername}
              </p>
            </div>
            <div className="flex justify-between ">
              {" "}
              <p className="font-medium text-sm text-primary-gray">
                Email address :
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                {user.data.email}
              </p>
            </div>
            <div className="flex justify-between ">
              <p className="font-medium text-sm text-primary-gray">
                Phone Number :
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                {user.data.phone_number}
              </p>
            </div>
          </div>
          <div className="flex w-full mt-20">
            <button
              className="py-2 px-4   focus:ring-primary-orange  w-full transition ease-in duration-200 text-center text-base font-bold border-2 focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={() => setEditOpen(true)}
            >
              Edit
            </button>
          </div>{" "}
          <Link to="signout">
            <div className="flex w-full mt-6">
              {" "}
              <button
                type="submit"
                className="py-2 px-4 bg-red-600 hover:bg-red-200 focus:ring-primary-orange focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Sign Out
              </button>
            </div>{" "}
          </Link>
          <div>
            {" "}
            {editOpen && (
              <div>
                <div
                  className={
                    "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full  "
                  }
                >
                  <div
                    className={"relative w-full my-6 mx-auto max-w-sm  px-4"}
                  >
                    {/*content*/}
                    <div className="h-screen w-full flex flex-col items-center">
                      {formData.Alert ? (
                        <Alert message={formData.Alert.message} />
                      ) : (
                        ""
                      )}

                      <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <div className="flex item-center">
                          <img
                            src={LeftAngle}
                            alt="leftAngle"
                            onClick={() => setEditOpen(false)}
                          />
                          <h2 className="ml-8 font-medium text-sm">
                            Edit Profile
                          </h2>
                        </div>
                        <p className="text-xs text-primary-gray font-medium mt-3.5"></p>
                        <form onSubmit={handleSubmit}>
                          <div className="relative w-full mt-12">
                            <label className="block  text-gray-700 text-sm font-medium mb-2">
                              Firstname
                              <input
                                type="text"
                                name="firstname"
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                value={formData.firstname}
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />
                              <span className="text-xs text-red-500 ml-1 mt-1"></span>
                            </label>
                            <label className="block  text-gray-700 text-sm font-medium mb-2">
                              Othername
                              <input
                                type="text"
                                name="othername"
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                value={formData.othername}
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />
                              <span className="text-xs text-red-500 ml-1 mt-1"></span>
                            </label>
                            <label className="block  text-gray-700 text-sm font-medium mb-2">
                              Lastname
                              <input
                                type="text"
                                name="lastname"
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                value={formData.lastname}
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />
                              <span className="text-xs text-red-500 ml-1 mt-1"></span>
                            </label>
                            <label className="block  text-gray-700 text-sm font-medium mb-2 ">
                              Email address
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />{" "}
                              <span className="text-xs text-red-500 ml-1 mt-1">
                                Enter a valid Email
                              </span>
                            </label>
                            <label className="block  text-gray-700 text-sm font-medium  mb-2">
                              Phone number
                              <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                inputmode="numeric"
                                focused={focused.toString()}
                                pattern="^[0-9]{11,11}$"
                                required
                                onBlur={handleFocus}
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />
                              <span className="text-xs text-red-500 ml-1 mt-1">
                                Enter valid phone number
                              </span>
                            </label>

                            <label className="block  text-gray-700 text-sm font-medium mb-2">
                              Current Password
                              <input
                                type="password"
                                name="cpassword"
                                value={formData.cpassword}
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />{" "}
                              <span className="text-xs text-red-500 mt-1 ml-1"></span>
                            </label>
                            <label className="block  text-gray-700 text-sm font-medium mb-2">
                              New Password
                              <input
                                type="password"
                                name="password"
                                value={formData.password}
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />{" "}
                              <span className="text-xs text-red-500 mt-1 ml-1"></span>
                            </label>
                            <label className="block  text-gray-700 text-sm font-medium mt-2">
                              Confirm Password
                              <input
                                type="password"
                                onChange={(e) => {
                                  formOnChange(e);
                                }}
                                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                                style={{ transition: "all .15s ease" }}
                              />{" "}
                              <span className="text-xs text-red-500 ml-1 mt-1"></span>
                            </label>
                          </div>
                          <button
                            type="submit"
                            className="py-2 px-4 bg-primary-orange   focus:ring-primary-orange text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 mt-10 rounded-lg "
                            disabled={sending}
                          >
                            {sending ? (
                              <div className="flex items-center justify-center">
                                <img
                                  src={loadingSmall}
                                  alt="loading ..."
                                  className="w-7 h-7 "
                                />
                              </div>
                            ) : (
                              `Save Changes`
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Profile;
