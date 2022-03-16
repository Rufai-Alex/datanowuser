import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import whatsapp from "../icons/whatsapp.svg";
import sms from "../icons/sms.svg";
import location from "../icons/location.svg";
import map from "../icons/Basemap image.svg";
import Nav from "../components/nav";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center   max-w-md ">
      <div className="flex  flex-col h-h90 w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <img src={LeftAngle} alt="leftAngle" />
              <h2 className="ml-8 font-medium text-sm">Contact Us</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
        </div>
        <div className=" flex self-center ">
          <img src={map} alt="map" className="shadow-xl rounded-md" />
        </div>
        <div className="flex flex-col justify-center align-middle self-center mt-9">
          <div className="flex flex-col align-middle justify-center">
            <h2 className="text-center font-medium text-sm text-primary-gray">
              Location
            </h2>
            <p className=" text-xs self-center font-semibold mt-2 text-primary-black">
              Ilorin, Kwara State, Nigeria
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <h2 className="text-sm text-center font-medium text-primary-gray ">
              Email address
            </h2>
            <p className="text-xs self-center font-semibold mt-2 text-primary-black">
              support@systemstech.com.ng
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <h2 className="text-sm text-primary-gray text-center font-medium ">
              Phone number
            </h2>
            <div className="flex flex-col self-center font-semibold mt-2 gap-1 text-primary-black">
              <p className="text-xs">08168670476</p>
              <p className="text-xs">08168670476</p>
              <p className="text-xs">08168670476</p>
            </div>
            <div className=" mt-8">
              <h3 className="flex flex-col text-primary-gray text-center font-medium text-sm">
                {" "}
                Quick Links
              </h3>
              <div className="flex mt-2">
                <button className="flex items-center mx-auto justify-center h-11 w-11 rounded-md bg-primary-orange text-white">
                  <img src={whatsapp} alt="whatsapp" />
                </button>
                <button className="flex items-center mx-auto justify-center h-11 w-11 rounded-md bg-primary-orange text-white">
                  <img src={sms} alt="sms" />
                </button>
                <button className="flex items-center mx-auto justify-center h-11 w-11 rounded-md bg-primary-orange text-white">
                  <img src={location} alt="location " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Contact;
