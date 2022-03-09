import LeftAngle from "../icons/LeftAngle.svg";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../providers/auth";

const formschema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email alex format !")
    .required("Email is required please !"),
  password: yup.string().min(6).max(15).required(),
  phone_number: yup
    .number("please enter a valid phone number")
    .required("Phone number is required please !"),
  name: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

function SignUp() {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formschema),
  });
  const { user, handleLogin } = useContext(AuthContext);

  const submitForm = (data) => {
    console.log(data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", String(data.name));
    urlencoded.append("email", String(data.email));
    urlencoded.append("phone_number", String(data.phone_number));
    urlencoded.append("password", String(data.password));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //redirect: "follow",
    };
    console.log(requestOptions);

    fetch(localStorage.getItem("apiURL") + "signup", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        console.log(data);
        if (data.status === "success") {
          handleLogin(data);
          reset();
          history.push("/");
          console.log(data);

          console.log({ data });
        }
      }) // axios
      //   .post("https://api.datanow.ng/api/user/882285/signup", requestOptions)
      //   .then((response) => {
      //     console.log(response);
      //   })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div>
          <img src={LeftAngle} alt="backicon" />
        </div>
        <h2 className="text-black font-bold text-2xl mt-12">
          Create an account
        </h2>
        <p className="text-xs text-primary-gray font-medium mt-3.5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="relative w-full mt-12">
            <label className="block  text-gray-700 text-sm font-medium mb-2">
              Fullname
              <input
                type="text"
                name="name"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                style={{ transition: "all .15s ease" }}
                {...register("name")}
              />
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.name?.message}
              </p>
            </label>
            <label className="block  text-gray-700 text-sm font-medium mt-4">
              Phone number
              <input
                type="tel"
                name="phone"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                style={{ transition: "all .15s ease" }}
                {...register("phone_number")}
              />
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.phone_number?.message}
              </p>
            </label>
            <label className="block  text-gray-700 text-sm font-medium mb-2 mt-3.5">
              Email address
              <input
                type="email"
                name="email"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                style={{ transition: "all .15s ease" }}
                {...register("email")}
              />{" "}
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.email?.message}
              </p>
            </label>
            <label className="block  text-gray-700 text-sm font-medium mt-4">
              Referre Email address
              <input
                type="email"
                m
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                style={{ transition: "all .15s ease" }}
              />{" "}
            </label>
            <label className="block  text-gray-700 text-sm font-medium mb-2">
              Password
              <input
                type="password"
                name="password"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 
              shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                style={{ transition: "all .15s ease" }}
                {...register("password")}
              />{" "}
              <p className="text-xs text-red-500 mt-1 ml-1">
                {errors.password?.message}
              </p>
            </label>

            <label className="block  text-gray-700 text-sm font-medium mt-4">
              Confirm Password
              <input
                type="password"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full mt-3.5 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                style={{ transition: "all .15s ease" }}
              />{" "}
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.confirmPassword && " Both passwords should match!"}
              </p>
            </label>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-primary-orange hover:bg-yellow-300 focus:bg-yellow-100 focus:ring-primary-orange text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 mt-10 rounded-lg "
          >
            Create your account
          </button>
        </form>

        <div className="flex w-full "></div>
        <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400 mt-12">
          Have an account?
          <a
            href="www"
            target="blank"
            className="text-sm  text-primary-orange  hover:text-yellow-300"
          >
            Sign in
          </a>
        </span>
        <div className="grid w-10 h-1 grid-cols-3 gap-2 mt-32 self-center">
          <div className="h-full col-span-1 bg-black rounded"></div>
          <div className="h-full col-span-2 bg-black  rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
