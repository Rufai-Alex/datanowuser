import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import whatsapp from "../icons/whatsapp.svg";
import sms from "../icons/sms.svg";
import location from "../icons/location.svg";
import map from "../icons/Basemap image.svg";
import Nav from "../components/nav";
import { useContext } from "react";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";
import { getOS } from "../helper/getOs";
import { useHistory } from "react-router-dom";

function Contact() {
  const { appData, dispatch } = useContext(AppDataContext);
  const { user, userDispatch } = useContext(UserContext);
  document.title = "Contact Us" + appData.business.name;
  const history = useHistory();
  const back = () => {
    history.push("/home");
  };
  return (
    <div className="flex flex-col items-center justify-center   max-w-md ">
      <div className="flex  flex-col h-h90 w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <button onClick={back}>
                <img src={LeftAngle} alt="leftAngle" />
              </button>
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
              {appData.business.address}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <h2 className="text-sm text-center font-medium text-primary-gray ">
              Email address
            </h2>
            <p className="text-xs self-center font-semibold mt-2 text-primary-black">
              <a href={"Mailto:" + appData.settings.contact_email_address}>
                {appData.settings.contact_email_address}
              </a>
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <h2 className="text-sm text-primary-gray text-center font-medium ">
              Phone number
            </h2>
            <div className="flex flex-col self-center font-semibold mt-2 gap-1 text-primary-black">
              <p className="text-xs">
                {" "}
                <a href={"tel:" + appData.settings.contact_call_number2}>
                  {" "}
                  {appData.settings.contact_call_number2}
                </a>
              </p>
              <p className="text-xs">
                <a href={"tel:" + appData.settings.contact_call_number1}>
                  {" "}
                  {appData.settings.contact_call_number1}
                </a>
              </p>
            </div>
            <div className=" mt-8">
              <h3 className="flex flex-col text-primary-gray text-center font-medium text-sm">
                {" "}
                Quick Links
              </h3>
              <div className="flex mt-2 space-x-4">
                <button className="flex items-center mx-auto justify-center h-11 w-11 rounded-md bg-primary-orange text-white">
                  <a
                    target="_"
                    href={
                      getOS() === "WEB"
                        ? "https://web.whatsapp.com/send?phone=234" +
                          appData.settings.contact_whatsapp_number +
                          "&text=Hello!"
                        : "https://api.whatsapp.com/send?phone=234" +
                          appData.settings.contact_whatsapp_number +
                          "&text=Hello!"
                    }
                  >
                    <img src={whatsapp} alt="whatsapp" />
                  </a>
                </button>
                <button className="flex items-center mx-auto justify-center h-11 w-11 rounded-md bg-primary-orange text-white">
                  <a href={"Mailto:" + appData.settings.contact_email_address}>
                    <img src={sms} alt="E-mail" />
                  </a>
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
