import LeftAngle from "../icons/LeftAngle.svg";
import loadingSmall from "../icons/loadingSmall.svg";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../providers/formValues";
import Alert from "../components/Alert";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";

export default function SignUp() {
  const { formData, formDispatch } = useContext(FormContext);
  const { appData } = useContext(AppDataContext);

  const { user, userDispatch } = useContext(UserContext);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(false);
  document.title = "Sign Up-" + appData.business.name;
  const handleFocus = (e) => {
    setFocused(true);
    console.log("forcused");
  };
  let history = useHistory();

  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", String(formData.name));
    urlencoded.append("email", String(formData.email));
    urlencoded.append("phone_number", String(formData.phone_number));
    urlencoded.append("password", String(formData.password));
    formData.referrer &&
      urlencoded.append("referrer", String(formData.referrer));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    fetch(localStorage.getItem("apiURL") + "signup", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        console.log(data);
        setSending(false);
        if (data.status === "success") {
          userDispatch({ type: "STORE_USER_DATA", user: data });
          history.push("/home");
        }
        if (data.errors) {
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
          type: "SET_ERROR",
          data: "unable to connect to server",
        });

        setSending(false);
      });
  };
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      appData.business.primary_color,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      appData.business.secondary_color,
    );
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "Alert",
        value: {
          isOpen: false,
          message: "",
        },
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "name",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "phone_number",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "email",
        value: "",
      },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "referrer",
        value: "",
      },
    });

    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "password",
        value: "",
      },
    });
  }, []);

  return (
    <>
      {" "}
      {appData && (
        <div className="h-screen w-full flex flex-col items-center">
          {formData.Alert ? <Alert message={formData.Alert.message} /> : ""}

          <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div>
              <img src={LeftAngle} alt="backicon" />
            </div>
            <h2 className="text-black font-bold text-2xl mt-12">
              Create an account
            </h2>
            <p className="text-xs text-primary-gray font-medium mt-3.5"></p>
            <form onSubmit={handleSubmit}>
              <div className="relative w-full mt-12">
                <label className="block  text-gray-700 text-sm font-medium mb-2">
                  Fullname
                  <input
                    type="text"
                    name="name"
                    required
                    focused={focused.toString()}
                    onBlur={handleFocus}
                    value={formData.name}
                    onChange={(e) => {
                      formOnChange(e);
                    }}
                    className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                    style={{ transition: "all .15s ease" }}
                  />
                  <span className="text-xs text-red-500 ml-1 mt-1"></span>
                </label>
                <label className="block  text-gray-700 text-sm font-medium mt-4">
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
                <label className="block  text-gray-700 text-sm font-medium mb-2 mt-3.5">
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
                <label className="block  text-gray-700 text-sm font-medium mt-4">
                  Referrer Phone Number or Email (Optional)
                  <input
                    type="text"
                    className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:  "
                    style={{ transition: "all .15s ease" }}
                    name="referrer"
                    value={formData.referrer}
                    onChange={(e) => {
                      formOnChange(e);
                    }}
                  />{" "}
                </label>
                <label className="block  text-gray-700 text-sm font-medium mb-2">
                  Password
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

                <label className="block  text-gray-700 text-sm font-medium mt-4">
                  Confirm Password
                  <input
                    type="password"
                    onChange={(e) => {
                      formOnChange(e);
                    }}
                    focused={focused.toString()}
                    onBlur={handleFocus}
                    required
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
                  `Create your account`
                )}
              </button>
            </form>

            <div className="flex w-full "></div>
            <div className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400 mt-12">
              Have an account?
              <Link to="/" className="text-sm  text-primary-orange ">
                Sign in
              </Link>
            </div>
            <div className="grid w-10 h-1 grid-cols-3 gap-2 mt-32 self-center">
              <div className="h-full col-span-1 bg-black rounded"></div>
              <div className="h-full col-span-2 bg-black  rounded"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
