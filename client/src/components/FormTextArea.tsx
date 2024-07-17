import React from 'react'


interface FormTextAreaProps {
  id: string;
  placeholder: string;
  value: string;
  styles: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  name: string;
  rows: number;
}

const FormTextArea = ({id, name, placeholder, value,styles, handleChange, rows}:FormTextAreaProps) => {
  return (
    <div className="relative">
      <textarea
        id={id}
        className={styles}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        rows={rows}
      ></textarea>
      <label
        htmlFor="description"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        Address
      </label>
    </div>
  );
}

export default FormTextArea