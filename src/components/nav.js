import home from "../icons/home.svg";
import receipt from "../icons/receipt-item.svg";
import wallet from "../icons/wallet-add.svg";
import user from "../icons/user.svg";
import { NavLink } from "react-router-dom";
function nav() {
  return (
    <nav className=" bg-primary-black w-full ">
      <ul className="flex justify-between gap-4 p-2">
        <li>
          <NavLink
            exact
            to="/home"
            activeStyle={{
              color: "#FFB830",
              stroke: "#FFB830",
            }}
            className="flex justify-center items-center flex-col text-primary-gray font-medium text-xx "
          >
            <img src={home} alt="home" />
            Dashboard
          </NavLink>
        </li>
        <li className="">
          <NavLink
            exact
            to="subcription"
            activeStyle={{
              color: "#FFB830",
              stroke: "#FFB830",
            }}
            className="flex justify-center items-center flex-col text-primary-gray font-medium text-xx"
          >
            <img src={receipt} alt="receipt" />
            Subscription
          </NavLink>
        </li>
        <li className="">
          <NavLink
            exact
            to="/wallet"
            activeStyle={{
              color: "#FFB830",
              stroke: "#FFB830",
            }}
            className="flex justify-center items-center flex-col text-primary-gray font-medium text-xx"
          >
            <img src={wallet} alt="wallet" />
            Beneficiaries
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="profile"
            activeStyle={{
              color: "#FFB830",
              stroke: "#FFB830",
            }}
            className="flex justify-center items-center flex-col text-primary-gray font-medium text-xx"
          >
            {" "}
            <img src={user} alt="user" />
            Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default nav;
