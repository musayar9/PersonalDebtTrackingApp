import axios from "axios";
import { Modal } from "flowbite-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import { MdError } from "react-icons/md";
import { User } from "../lib/types";
import { useTranslation } from "react-i18next";

interface VerifyUserProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoMsg: React.Dispatch<React.SetStateAction<string>>;
  setWarningMsg: React.Dispatch<React.SetStateAction<string>>;
  data: User | null;
}

const VerifyUserModal = ({
  showModal,
  setShowModal,
  setInfoMsg,
  setWarningMsg,
  data,
}: VerifyUserProps) => {
const {t} = useTranslation()
  const [code, setCode] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (errMsg) {
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  }, [errMsg]);

  const handleChange = (e: HTMLInputElement, index: number) => {
    if (isNaN(Number(e.value))) return;

    const newCode = [...code];
    newCode[index] = e.value;
    setCode(newCode);

    if (e.value !== "" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const verificationCode = code.join("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`/api/v1/auth/verifyUserAccount/`, {
        verificationCode,
      });
      const data = res.data;

      setLoading(false);
      setShowModal(false);
      setInfoMsg("");

      if (data.verifyAccount) {
        navigate("/login", {replace:true});
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("Request Failed");
      }
    }
  };

  const handleClose = async () => {
    try {
      const res = await axios.delete(
        `/api/v1/auth/deleteVerifyUser/${data?._id}`
      );

      setShowModal(false);
      setInfoMsg("");
      setWarningMsg(res.data.message);
      setCode(new Array(6).fill(""));
      setTimeout(() => {
        setWarningMsg("");
      }, 4000);
    } catch (error) {


      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("Request Failed");
      }
    }
  };

  return (
    <Modal size="md"  show={showModal} onClose={handleClose}>
      <div className="bg-base-200 rounded-md">
        {" "}
        <Modal.Header>
          <h3 className="text-slate-500 font-semibold">{t("verify_user_account")} </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 ">
            <p className="text-base leading-relaxed text-gray-500">
              {t("verify_user_account_message")}
            </p>

            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
              <div className="flex justify-evenly">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-12 h-12 text-center text-lg font-bold border bg-base-100 border-gray-300 rounded-md focus:outline-none focus:border-emerald-600"
                  />
                ))}
              </div>

              {errMsg && (
                <AlertMessage
                  color="bg-red-500"
                  message={errMsg}
                  icon={<MdError />}
                />
              )}

              <button
                type="submit"
                className="bg-emerald-600 hover:opacity-80 text-gray-50 text-sm rounded-md py-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="loading loading-infinity loading-xs"></span>
                    <span>{t("verify_account_status")}</span>
                  </div>
                ) : (
                  <span>{t("verify_account")}</span>
                )}
              </button>
            </form>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default VerifyUserModal;
