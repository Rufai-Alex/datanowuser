import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  const back = () => {
    history.push("/home");
  };

  return (
    <div className="flex flex-col items-center  max-w-md ">
      <div class="flex  flex-col h-h90 w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
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
                Firstname:
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                Dhul-qorunain
              </p>
            </div>
            <div className="flex justify-between ">
              {" "}
              <p className="font-medium text-sm text-primary-gray">
                Lastname :
              </p>
              <p className="font-semibold text-sm text-primary-black ">Rufai</p>
            </div>
            <div className="flex justify-between ">
              {" "}
              <p className="font-medium text-sm text-primary-gray">
                Email address :
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                abc@gmail.com
              </p>
            </div>
            <div className="flex justify-between ">
              <p className="font-medium text-sm text-primary-gray">
                Phone Number
              </p>
              <p className="font-semibold text-sm text-primary-black ">
                08106653903
              </p>
            </div>
          </div>
          <div class="flex w-full mt-20">
            <button className="py-2 px-4   focus:ring-primary-orange  w-full transition ease-in duration-200 text-center text-base font-bold border-2 focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Edit
            </button>
          </div>
          <div class="flex w-full mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-red-600 hover:bg-red-200 focus:ring-primary-orange focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Profile;
