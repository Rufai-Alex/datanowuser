import React, { useContext, useEffect } from "react";

import { FormContext } from "../providers/formValues";

export default function ConfirmationModel(props) {
  const { formData, formDispatch } = useContext(FormContext);
  const clearModal = () => {
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "ConfirmationModal",
        value: {
          isOpen: false,
          transactionType: "",
          transactionDescription: "",
          transactionReceiver: "",
          transactionAmount: "",
          transactionNetwork: "",
        },
      },
    });
  };

  useEffect(() => {
    formDispatch({
      type: "INPUTVALUES",
      data: {
        name: "ConfirmationModal",
        value: {
          isOpen: false,
          type: "",
          description: "",
          receiver: "",
          amount: "",
          network: "",
        },
      },
    });
  }, []);
  return (
    <>
      {formData.ConfirmationModal.isOpen && (
        <div>
          <div
            className={
              "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full  "
            }
          >
            <div className={"relative w-full my-6 mx-auto max-w-sm  px-4"}>
              {/*content*/}
              <div className="bg-white max-w-2xl shadow overflow-hidden rounded-2xl border-t-8  border-primary-orange ">
                <h3 className="text-primary-orange text-center p-3">REVIEW</h3>
                <div className="border-t border-gray-200">
                  <p className="text-center text-lg font-bold text-black">
                    {formData.ConfirmationModal.type}
                  </p>

                  <dl className="border-t border-gray-200">
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        NETWORK
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {formData.ConfirmationModal.network}
                      </dd>
                    </div>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        ITEM
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {formData.ConfirmationModal.description}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        RECEIVER
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {formData.ConfirmationModal.receiver}
                      </dd>
                    </div>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        AMOUNT
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ₦{formData.ConfirmationModal.amount}
                      </dd>
                    </div>

                    <div class="flex justify-center my-4">
                      <button
                        className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none  rounded text-lg"
                        onClick={() => clearModal()}
                      >
                        CANCEL
                      </button>
                      <button
                        className="ml-4 inline-flex text-white bg-primary-orange  border-0 py-2 px-12   rounded text-lg"
                        onClick={() => {
                          props.onConfirmationClicked();
                          clearModal();
                        }}
                      >
                        PAY
                      </button>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </>
  );
}
