
import { useCheckPasswordCriteria } from '../utils/customHooks';

const CheckPasswordCriteria = ({password}:{password:string}) => {
 const { criteria } = useCheckPasswordCriteria(password);

  return (
    <div>
      {" "}
      <ul className="list-disc grid grid-cols-4  font-semibold  text-[10px] pl-4 g">
        <li
          className={`${
            criteria.hasLowerCase ? "text-green-500" : "text-slate-400"
          }`}
        >
          En az bir küçük harf
        </li>
        <li
          className={`${
            criteria.hasUpperCase ? "text-green-500" : "text-slate-400"
          }`}
        >
          En az bir büyük harf
        </li>
        <li
          className={`${
            criteria.hasDigit ? "text-green-500" : "text-slate-400"
          }`}
        >
          En az bir rakam
        </li>
      </ul>
      <ul className="list-disc grid grid-cols-2 font-semibold  text-[10px] pl-4 ">
        <li
          className={`${
            criteria.hasSpecialChar ? "text-green-500" : "text-slate-400"
          }`}
        >
          En az bir özel karakter (@$!%*?&)
        </li>
        <li
          className={`${
            criteria.hasMinLength ? "text-green-500" : "text-slate-400"
          }`}
        >
          Şifre 8 ile 12 karakter uzunluğunda olmalı.
        </li>
      </ul>
    </div>
  );
}

export default CheckPasswordCriteria