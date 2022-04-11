import { useState, useEffect, useContext } from "react";
import LeftAngle from "../icons/LeftAngle.svg";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../providers/auth";
import LoggedInContext from "../App";
import { signInformschema } from "../components/validation";
import { UserContext } from "../providers/userData";
import { FormContext } from "../providers/formValues";
import { AppDataContext } from "../providers/appData";

function LoginPage() {
  let history = useHistory();

  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  const [focused, setFocused] = useState(false);
  document.title = "Sign In-" + appData.business.name;
  user.data && history.push("/home");
  const handleFocus = (e) => {
    setFocused(true);
    console.log("forcused");
  };

  const formOnChange = (e) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: e.target.name, value: e.target.value },
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    var urlencoded = new URLSearchParams();
    urlencoded.append("identifier", String(formData.identifier));
    urlencoded.append("password", String(formData.password));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    fetch("https://api.datanow.ng/api/user/882285/signin", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);

        if (data.status === "success") {
          userDispatch({ type: "STORE_USER_DATA", user: data });
          history.push("/home");
        } else {
          formDispatch({
            type: "SET_ERROR",
            data: data.message,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        formDispatch({
          type: "SET_ERROR",
          data: "unable to connect to server",
        });
      });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="flex flex-col max-w-sm px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div>
          <img src={LeftAngle} alt="backicon" />
        </div>
        <h2 className="text-black font-bold text-2xl mt-12">
          Login to your account
        </h2>
        <p className="text-xs text-primary-gray font-medium mt-3.5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac
        </p>
        <form onSubmit={submitForm}>
          <div className="relative w-full mt-12">
            <label className="block  text-gray-700 text-sm font-medium mb-2">
              Email address / Phone number
              <input
                type="text"
                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                placeholder="Email or Phone Number"
                focused={focused.toString()}
                required
                name="identifier"
                onChange={(e) => {
                  formOnChange(e);
                }}
                value={formData.identifier}
              />
              <span>Please enter correct Email or Phone Number </span>
            </label>
            <label className="block  text-gray-700 text-sm font-medium mt-4">
              Password
              <input
                type="password"
                className=" rounded-lg    flex-1 appearance-none border border-slate-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:   mt-3.5"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                focused={focused.toString()}
                required
                name="password"
                onChange={(e) => {
                  formOnChange(e);
                }}
                value={formData.password}
              />
              <span>Please enter your password </span>
            </label>
          </div>

          <p className="block  text-gray-700 text-sm font-semibold mt-8">
            Forgot your password?
          </p>
          <div className="flex w-full mt-10">
            <button
              type="submit"
              // disabled={disable}
              className="py-2 px-4 bg-primary-orange hover:bg-yellow-300 active:bg-yellow-100 active:ring-primary-orange text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg "
            >
              Login
            </button>
          </div>
        </form>
        <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400 mt-12">
          Dont have an account?
          <Link
            to="/signUp"
            className="text-sm  text-primary-orange  hover:text-yellow-300"
          >
            Sign up
          </Link>
        </span>
        <div className="grid w-10 h-1 grid-cols-3 gap-2 mt-32 self-center">
          <div className="h-full col-span-1 bg-black rounded"></div>
          <div className="h-full col-span-2 bg-black  rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
