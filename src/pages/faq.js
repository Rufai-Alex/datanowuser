import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
import { useContext, useEffect } from "react";
import { UserContext } from "../providers/userData";
import { AppDataContext } from "../providers/appData";
import { FormContext } from "../providers/formValues";
import { useHistory } from "react-router-dom";

function Faq() {
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);
  const { formData, formDispatch } = useContext(FormContext);
  document.title = "FAQs- " + appData.business.name;

  const history = useHistory();
  const back = () => {
    history.push("/home");
  };
  const fetchFAQS = () => {
    // loaderDispatch({
    //   type: "SET_LOADER",
    //   data: { text: "Retrieving FAQs...", isLoading: true },
    // });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      //redirect: "follow",
    };
    fetch(localStorage.getItem("apiURL") + "faq", requestOptions)
      .then((response) => (response = response.text()))
      .then((response) => {
        const data = JSON.parse(response);
        // loaderDispatch({
        //   type: "SET_LOADER",
        //   data: { text: "", isLoading: false },
        // });
        console.log(data);
        if (data.status === "success") {
          formDispatch({
            type: "INPUTVALUES",
            data: { name: "faqs", value: data.data },
          });
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
            type: "SET_ERROR",
            data: errorString,
          });
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
        // loaderDispatch({
        //   type: "SET_LOADER",
        //   data: { text: "", isLoading: false },
        // });
      });
  };

  useEffect(() => {
    fetchFAQS();
  }, []);
  console.log(formData);
  return (
    <div className="flex">
      <div className="">
        <Nav />
      </div>
      <div className="flex-1 flex flex-col items-center mx-auto md:mt-12 ">
        <div className="flex  flex-col  minScreen  w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative mb-12 md:mb-0">
          <div className="px-4 py-8">
            <div className="flex justify-between items-center">
              <div className="flex justify-between item-center">
                <button onClick={back}>
                  <img src={LeftAngle} alt="leftAngle" />
                </button>
                <h2 className="ml-8 font-medium text-sm md:hidden">FAQs</h2>
              </div>
              <img src={bell} alt="bell" className="md:hidden" />
            </div>
            <div>
              <section className="text-gray-700">
                <div className="container px-5 mx-auto">
                  <div className="text-center mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                      Frequently Asked Questions
                    </h1>
                  </div>
                  <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                    <div className="w-full  px-4 py-2">
                      {formData.faqs && (
                        <>
                          {formData.faqs.map((faq) => (
                            <details className="mb-4">
                              <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                {faq.question}
                              </summary>

                              <div>{faq.answer}</div>
                            </details>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
