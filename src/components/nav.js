import home from "../icons/home.svg";
import receipt from "../icons/receipt-item.svg";
import wallet from "../icons/wallet-add.svg";
import Bell from "../icons/Bell.svg";
import { Link } from "react-router-dom";
//import user from "../icons/user.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppDataContext } from "../providers/appData";
import { UserContext } from "../providers/userData";
import Header from "./header";

function Nav() {
  const { appData, dispatch } = useContext(AppDataContext);
  const { user, userDispatch } = useContext(UserContext);
  const divStyle = {
    background: `rgba(${appData.business.primary_color}, 0.8)`,
  };
  return (
    <div className="">
      <Header />
      {/* <nav className=" bg-primary-black  w-full  inset-x-0 bottom-0  md:inset-y-0 md:left-0  md:w-72 md:pl-10 md:pt-20"> */}
      <nav className=" bg-primary-black   fixed max-w-md  md:static inset-x-0 bottom-0 md:w-72 md:pl-10 md:pt-20 md:h-screen">
        <ul className="flex  md:flex-col justify-between gap-4 p-2 ">
          <li>
            <NavLink
              exact
              to="/home"
              activeStyle={{
                color: appData.business.primary_color,
                stroke: appData.business.primary_color,
              }}
              className="flex justify-center items-center flex-col text-white font-medium text-xx md:flex-row md:text-sm  md:gap-x-4 md:w-full  md:justify-start   space-x-3  md:p-2.5"
              style={{ stroke: "white" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.07 2.82009L3.14002 8.37009C2.36002 8.99009 1.86002 10.3001 2.03002 11.2801L3.36002 19.2401C3.60002 20.6601 4.96002 21.8101 6.40002 21.8101H17.6C19.03 21.8101 20.4 20.6501 20.64 19.2401L21.97 11.2801C22.13 10.3001 21.63 8.99009 20.86 8.37009L13.93 2.83009C12.86 1.97009 11.13 1.97009 10.07 2.82009Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 18V15"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Dashboard
            </NavLink>
          </li>
          <li className="">
            <NavLink
              exact
              to="subcription"
              activeStyle={{
                color: appData.business.primary_color,
                stroke: appData.business.primary_color,
              }}
              className="flex justify-center items-center flex-col text-white font-medium text-xx md:flex-row md:text-sm  md:gap-x-4 md:w-full  md:justify-start   md:p-2.5"
              style={{ stroke: "white" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 13.01H12"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 9.01001H12"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.99561 13H6.00459"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.99561 9H6.00459"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Subscription
            </NavLink>
          </li>
          <li className="">
            <NavLink
              exact
              to="/wallet"
              activeStyle={{
                color: appData.business.primary_color,
                stroke: appData.business.primary_color,
              }}
              className="flex justify-center items-center flex-col text-white font-medium text-xx md:flex-row md:text-sm  md:gap-x-4 md:w-full  md:justify-start  md:p-2.5"
              style={{ stroke: "white" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7514 7.04997C17.5114 7.00997 17.2614 6.99998 17.0014 6.99998H7.00141C6.72141 6.99998 6.45141 7.01998 6.19141 7.05998C6.33141 6.77998 6.53141 6.52001 6.77141 6.28001L10.0214 3.02C11.3914 1.66 13.6114 1.66 14.9814 3.02L16.7314 4.78996C17.3714 5.41996 17.7114 6.21997 17.7514 7.04997Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 19C9 19.75 8.79 20.46 8.42 21.06C7.73 22.22 6.46 23 5 23C3.54 23 2.27 22.22 1.58 21.06C1.21 20.46 1 19.75 1 19C1 16.79 2.79 15 5 15C7.21 15 9 16.79 9 19Z"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.49172 18.9795H3.51172"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 17.5195V20.5095"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 12V17C22 20 20 22 17 22H7.63C7.94 21.74 8.21 21.42 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15C3.8 15 2.73 15.53 2 16.36V12C2 9.28 3.64 7.38 6.19 7.06C6.45 7.02 6.72 7 7 7H17C17.26 7 17.51 7.00999 17.75 7.04999C20.33 7.34999 22 9.26 22 12Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H22"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Beneficiaries
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="profile"
              activeStyle={{
                color: appData.business.primary_color,
                stroke: appData.business.primary_color,
              }}
              className="flex justify-center items-center flex-col text-white font-medium text-xx md:flex-row md:text-sm  md:gap-x-4 md:w-full  md:justify-start  md:p-2.5"
              style={{ stroke: "white" }}
            >
              {" "}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Account
            </NavLink>
          </li>
          <li className="hidden md:inline">
            <NavLink
              exact
              to="faq"
              activeStyle={{
                color: appData.business.primary_color,
                stroke: appData.business.primary_color,
              }}
              className="flex justify-center items-center flex-col text-white font-medium text-xx md:flex-row md:text-sm  md:gap-x-4 md:w-full  md:justify-start   md:p-2.5"
              style={{ stroke: "white" }}
            >
              {" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10 1.66675C5.41669 1.66675 1.66669 5.41675 1.66669 10.0001C1.66669 14.5834 5.41669 18.3334 10 18.3334Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 6.66675V10.8334"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.99542 13.3333H10.0029"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              FAQS
            </NavLink>
          </li>
          <li className="hidden md:inline">
            <NavLink
              exact
              to="contact"
              activeStyle={{
                color: appData.business.primary_color,
                stroke: appData.business.primary_color,
              }}
              className="flex justify-center items-center flex-col text-white font-medium text-xx md:flex-row md:text-sm  md:gap-x-4 md:w-full  md:justify-start   md:p-2.5"
              style={{ stroke: "white" }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.86747 13.0971V11.0288C3.86747 10.3417 4.40581 9.72548 5.17081 9.72548C5.85789 9.72548 6.47414 10.2638 6.47414 11.0288V13.0192C6.47414 14.4005 5.32664 15.548 3.94539 15.548C2.56414 15.548 1.41664 14.3934 1.41664 13.0192V8.6559C1.33872 4.67507 4.48372 1.45215 8.46456 1.45215C12.4454 1.45215 15.5833 4.67506 15.5833 8.57798V12.9413C15.5833 14.3226 14.4358 15.4701 13.0546 15.4701C11.6733 15.4701 10.5258 14.3226 10.5258 12.9413V10.9509C10.5258 10.2638 11.0641 9.64756 11.8291 9.64756C12.5162 9.64756 13.1325 10.1859 13.1325 10.9509V13.0971"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
