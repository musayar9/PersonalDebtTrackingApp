import React from "react";

interface PropsMessage {
  message: string;
}
const ErrorMessage: React.FC<PropsMessage> = ({ message }) => {
  return (
    <div className="mx-auto max-w-xl   ">
      <div className="flex items-center justify-center flex-col">
        <img src={"../assets/error.png"} alt="error" className="h-80" />
        <p className="text-center text-2xl text-red-600 font-bold">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
