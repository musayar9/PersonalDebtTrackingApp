import React, { useEffect, useState } from "react";
import { CreateDebt } from "../lib/types";
import FormInput from "./FormInput";
import { formattedDate } from "../utils/functions";
import { addMonths, format, isToday, isValid, parseISO } from "date-fns";
import FormTextArea from "./FormTextArea";
import axios from "axios";
import AlertMessage from "./AlertMessage";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface EditDebtProps {
  id: string | undefined;
  formData: CreateDebt;
  setFormData: React.Dispatch<React.SetStateAction<CreateDebt>>;
}

const EditDebtPage: React.FC<EditDebtProps> = ({
  id,
  formData,
  setFormData,
}) => {
  const [updateDebt, setUpdateDebt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  console.log("updetedebt id", id);
  
  const navigate = useNavigate()
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const debtAmount = parseFloat(formData.debtAmount.toString()) || 0;
    const interestRate = parseFloat(formData.interestRate.toString()) || 0;

    const amount = debtAmount + debtAmount * (interestRate / 100);
    const installment = formData.installment || 1;
    const paymentAmount = amount / installment;

    const paymentStartDate = parseISO(formData.paymentStart);
    setFormData((prevState) => ({
      ...prevState,
      amount,
    }));

    if (isValid(paymentStartDate)) {
      const updatedPaymentPlan = Array.from(
        { length: installment },
        (_, i) => ({
          paymentDate: format(addMonths(paymentStartDate, i), "yyyy-MM-dd"),
          paymentAmount: parseFloat(paymentAmount.toFixed(2)),
          paymentStatus: false,
        })
      );

      setFormData((prevState) => ({
        ...prevState,
        paymentPlan: updatedPaymentPlan,
      }));
    }
  }, [
    formData.debtAmount,
    formData.interestRate,
    formData.installment,
    formData.paymentStart,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      setLoading(true);
      const res = await axios.put(`/api/v1/debt/updateDebt/${id}`, formData);
      const data = await res.data;
      console.log(data, "data");
      setUpdateDebt(data);
      setLoading(false);
      navigate("/dashboard?tab=debt");
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error?.response?.data.msg);
      } else {
        setErrMsg("Request Failed");
      }
    }
  };

  console.log("updateDebt", updateDebt);
  return (
    <div className="max-w-2xl mx-auto">
      <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between md:flex-row gap-2 ">
          <FormInput
            type={"text"}
            id="Lender"
            name="lender"
            placeholder={"lender"}
            value={formData.lender}
            handleChange={handleChange}
            styles="custom-input peer w-full md:w-80"
          />

          <FormInput
            type={"text"}
            id="Borrower"
            name="borrower"
            placeholder={"borrower"}
            value={formData.borrower}
            handleChange={handleChange}
            styles="custom-input peer w-full md:w-80"
          />
        </div>
        <div className="flex flex-col justify-between md:flex-row gap-2 ">
          <FormInput
            type={"number"}
            id="debtAmount"
            name="debtAmount"
            placeholder={"debtAmount"}
            value={formData.debtAmount}
            handleChange={handleChange}
            styles="custom-input peer w-full md:w-80"
          />

          <FormInput
            type={"number"}
            id="InterestRate"
            name="interestRate"
            placeholder={"interestRate"}
            value={formData.interestRate}
            handleChange={handleChange}
            styles="custom-input peer w-full md:w-80"
          />
        </div>
        <div className="flex flex-col justify-between md:flex-row gap-3 ">
          <FormInput
            type={"number"}
            id="Amount"
            name="amount"
            placeholder={"amount"}
            value={formData.amount}
            //   handleChange={handleChange}
            styles="custom-input peer w-full md:w-52 "
          />

          <FormInput
            type={"date"}
            id="PaymentStart"
            name="paymentStart"
            placeholder={"paymentStart"}
            value={formattedDate(formData.paymentStart)}
            handleChange={handleChange}
            styles="custom-input peer w-full md:w-52"
            min={isToday(new Date()) ? format(new Date(), "yyyy-MM-dd") : ""}
          />

          <FormInput
            type={"number"}
            id="Installment"
            name="installment"
            placeholder={"installment"}
            value={formData.installment}
            handleChange={handleChange}
            styles="custom-input peer w-full md:w-52"
          />
        </div>

        <div className="flex     flex-col   ">
          <FormTextArea
            id="description"
            styles="flex px-3.5 pt-8  text-sm w-full 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder="description "
            name="description"
            value={formData.description ?? ""}
            handleChange={handleChange}
            rows={2}
          />
        </div>

        <div className="mt-4">
          <h6 className="text-center text-2xl text-gray-400">Payments Plan</h6>

          {formData.paymentPlan?.map((plan, index) => (
            <div
              className="flex  justify-center flex-col md:flex-row gap-3 my-6"
              key={index}
            >
              <FormInput
                type={"date"}
                id="PaymentDate"
                name="paymentDate"
                placeholder={"paymentDate"}
                value={plan.paymentDate}
                min={
                  isToday(new Date()) ? format(new Date(), "yyyy-MM-dd") : ""
                }
                styles="custom-input peer w-full md:w-60"
              />

              <FormInput
                type={"number"}
                id="PaymentAmount"
                name="paymentAmount"
                placeholder={"paymentAmount"}
                value={plan.paymentAmount}
                styles="custom-input peer w-full md:w-60"
              />
            </div>
          ))}
        </div>

        <button className="btn btn-success text-gray-100">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loading loading-dots loading-xs"></span>
              <span>Updating Debt </span>
            </div>
          ) : (
            <span>Update Debt</span>
          )}
        </button>
      </form>
      {errMsg && (
        <AlertMessage
          icon={<MdErrorOutline size={28} />}
          color={"bg-red-500"}
          message={errMsg}
        />
      )}
      ;
    </div>
  );
};

export default EditDebtPage;
