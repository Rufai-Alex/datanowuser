import * as yup from "yup";

export const signInformschema = yup.object().shape({
  identifier: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

export const airtimePurchaseSchema = yup.object().shape({
  phone_numbers: yup.number().required().positive().integer().min(11).max(11),
  amount: yup.number().required().positive().min(2).max(6),
});
export const DataPurchaseSchema = yup.object().shape({
  phone_number: yup.number().required().positive().integer().min(11).max(11),
  amount: yup.number().required().positive().min(2).max(6),
  password: yup.string().min(6).max(15).required(),
});
