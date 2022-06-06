import Bell from "../icons/Bell.svg";
import { Link } from "react-router-dom";

import { AppDataContext } from "../providers/appData";
import { UserContext } from "../providers/userData";
import { useContext } from "react";

function Header() {
  const { appData, dispatch } = useContext(AppDataContext);
  const { user, userDispatch } = useContext(UserContext);
  return (
    <div className="w-full  fixed inset-x-0 top-0 hidden md:flex bg-white items-center px-5 justify-between py-3.5 md:py-0 z-50 ">
      <Link to="/">
        <div className="   h-5 flex justify-center items-center p-8  ">
          <img
            src={appData.business.website + "/logo.png"}
            alt="logo"
            className=""
            style={{ height: 46 }}
          />
          <h1 className="font-medium text-lg md:text-2xl text-primary-orange text-center    ">
            {appData.business.name}
          </h1>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <div className="">
          <img src={Bell} alt="notification" />
        </div>
        <div className="avatar py-2.5 px-5 rounded-lg  md:flex justify-between items-center ml-10 hidden ">
          <div className="profile text-white  ml-3.5">
            <span className="block text-base font-medium text-primary-blue">
              {user.data &&
                `${user.data.firstname} ${user.data.othername} ${user.data.lastname}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
