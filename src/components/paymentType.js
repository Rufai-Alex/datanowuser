import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../providers/formValues";

function PaymentType() {
  const { formData, formDispatch } = useContext(FormContext);
  const paymentwallet = (toggle) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPayment", value: false },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPayment", value: toggle },
    });
  };
  const paymentatm = (toggle) => {
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "atmPayment", value: toggle },
    });
    formDispatch({
      type: "INPUTVALUES",
      data: { name: "walletPayment", value: false },
    });
  };
  return (
    <>
      {" "}
      <h3 className="mt-4 font-medium text-primary-black text-sm">
        Payment Method
      </h3>
      <div className="flex gap-4 item-center">
        <button
          type="button"
          className={
            "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-slate-300 text-center text-base font-medium shadow-md   rounded-lg " +
            (formData.walletPayment
              ? "bg-primary-black text-white"
              : "bg-white text-primary-black")
          }
          onClick={() => paymentwallet(true)}
        >
          Wallet
        </button>
        <button
          type="button"
          className={
            "py-2 px-4 flex justify-center items-center  hover:text-primary-gray focus:ring-primary-orange  w-full transition ease-in duration-200 border border-slate-300 text-center text-base font-medium shadow-md   rounded-lg " +
            (formData.atmPayment
              ? "bg-primary-black text-white"
              : "bg-white text-primary-black")
          }
          onClick={() => paymentatm(true)}
        >
          ATM
        </button>
      </div>
    </>
  );
}

export default PaymentType;
