import React, { useEffect, useState } from "react";
import { addMonths, format, isToday, isValid, parseISO } from "date-fns";
import axios from "axios";
import { CiCircleInfo } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";
import AlertMessage from "../AlertMessage";
import api from "../../utils/api";
import DebtImage from "../../assets/Debt.png";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
const DebtForm = () => {
const {t} = useTranslation()

  const [formData, setFormData] = useState({
    lender: "",
    borrower: "",
    debtAmount: 0,
    interestRate: 0,
    amount: 0,
    paymentStart: "",
    installment: 1,
    description: "",
    paymentPlan: [{ paymentDate: "", paymentAmount: 0 }],
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const editData =
      !isNaN(parseFloat(value)) &&
      !["paymentDate", "paymentStart"].includes(name)
        ? parseFloat(value)
        : value;

    setFormData({ ...formData, [name]: editData });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/v1/debt", formData);
      const data = await res.data;
  
      setMsg(data?.message);
      toast.success(data.message)
      setLoading(false);
      navigate("/debts");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data?.message);
      } else {
        setErrMsg("request failed");
      }

      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  };

  return (
    <div className=" w-full my-12">
      <div >
        <h2 className="text-xl m-4 font-semibold  border-b border-gray-300 p-4">
          {t("create_debt")}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center my-8">
        <div className="flex items-center justify-center flex-col gap-2">
          <img
            src={DebtImage}
            alt="debt"
            className="w-44 h-44 object-cover  rounded-full"
          />
          <p className="text-center text-sm text-gray-400 tracking-wide max-w-md my-4">
            {t("create_debt_info")}
          </p>
        </div>

        <form className="flex flex-col gap-2 p-4 " onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between md:flex-row gap-2 ">
            <FormInput
              type={"text"}
              id="Lender"
              name="lender"
              placeholder={t("lender")}
              value={formData.lender}
              handleChange={handleChange}
              styles="custom-input peer w-full md:w-60"
            />

            <FormInput
              type={"text"}
              id="Borrower"
              name="borrower"
              placeholder={t("borrower")}
              value={formData.borrower}
              handleChange={handleChange}
              styles="custom-input peer w-full md:w-60"
            />
          </div>
          <div className="flex flex-col justify-between md:flex-row gap-2 ">
            <FormInput
              type={"number"}
              id="debtAmount"
              name="debtAmount"
              placeholder={t("debt_amount")}
              value={formData.debtAmount}
              handleChange={handleChange}
              styles="custom-input peer w-full md:w-60"
            />

            <FormInput
              type={"number"}
              id="InterestRate"
              name="interestRate"
              placeholder={t("interest_rate")}
              value={formData.interestRate}
              handleChange={handleChange}
              styles="custom-input peer w-full md:w-60"
            />
          </div>
          <div className="flex flex-col justify-between md:flex-row gap-2 ">
            <FormInput
              type={"number"}
              id="Amount"
              name="amount"
              placeholder={t("amount")}
              value={formData.amount}
              //   handleChange={handleChange}
              styles="custom-input peer w-full md:w-40 "
            />

            <FormInput
              type={"date"}
              id="PaymentStart"
              name="paymentStart"
              placeholder={t("payment_start")}
              value={formData.paymentStart}
              handleChange={handleChange}
              styles="custom-input peer w-full md:w-40"
              min={isToday(new Date()) ? format(new Date(), "yyyy-MM-dd") : ""}
            />

            <FormInput
              type={"number"}
              id="Installment"
              name="installment"
              placeholder={t("installment")}
              value={formData.installment}
              handleChange={handleChange}
              styles="custom-input peer w-full md:w-40"
            />
          </div>

          <div className="flex     flex-col   ">
            <FormTextArea
              id="description"
              styles="flex px-2.5 pt-8  text-sm w-full
 bg-transparent rounded-md border-1 border-gray-300 appearance-none 
 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder={t("description")}
              name="description"
              value={formData.description}
              handleChange={handleChange}
              rows={2}
              maxLength={20}
            />

            <p className="text-slate-500 text-xs pl-2 mt-2">
              {20 - formData.description.length} {t("characters_remaining")}
            </p>
          </div>

          <div className="mt-4">
            <h6>{t("payments_plan")}</h6>

            {formData.paymentPlan.map((plan, index) => (
              <div
                className="flex  justify-center flex-col md:flex-row gap-3 my-6"
                key={index}
              >
                <FormInput
                  type={"date"}
                  id="PaymentDate"
                  name="paymentDate"
                  placeholder={t("payment_date")}
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
                  placeholder={t("monthly_payment_amount")}
                  value={plan.paymentAmount}
                  styles="custom-input peer w-full md:w-60"
                />
              </div>
            ))}
          </div>

          <button className="btn btn-success text-gray-100" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-infinity loading-xs"></span>
              </div>
            ) : (
              <>{t("create_debt")}</>
            )}
          </button>
        </form>

        {msg && (
          <AlertMessage
            icon={<CiCircleInfo size={28} />}
            message={msg}
            color={"bg-sky-500"}
          />
        )}

        {errMsg && (
          <AlertMessage
            icon={<MdErrorOutline size={28} />}
            message={errMsg}
            color={"bg-red-500"}
          />
        )}
      </div>
    </div>
  );
};

export default DebtForm;
