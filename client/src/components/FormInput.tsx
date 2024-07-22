import React from "react";

interface FormInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string | number;
  styles:string;
  min?:string
handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const FormInput = ({
  type,
  id,
  name,
  placeholder,
  value,
  handleChange,
  styles,
  min
  
}: FormInputProps) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={styles}
        value={value}
        onChange={handleChange}
        min={min}
      />

      <label
        htmlFor={id}
        className={`${name==="phone"?"hidden":"flex"} absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
      >
        {id}
      </label>
    </div>
  );
};

export default FormInput;
