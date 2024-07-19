import React from 'react'

type AlertMessageProps = {
icon: React.ReactNode
message:string | boolean;
color:string;

}

const AlertMessage = ({icon, message, color}:AlertMessageProps) => {
  return (
    <div
      className={`${color} mt-2 flex items-center p-3 text-sm rounded-md gap-2`}
    >
      <span className='text-white text-2xl font-bold'>{icon}</span>

      <span className="text-slate-200">{message}</span>
    </div>
  );
}

export default AlertMessage