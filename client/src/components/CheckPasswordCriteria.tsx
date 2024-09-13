
import { useCheckPasswordCriteria } from '../utils/customHooks';

const CheckPasswordCriteria = ({password}:{password:string}) => {
 const { criteria } = useCheckPasswordCriteria(password);

  return (
    <div>
      {" "}
      <ul className="list-disc grid grid-cols-3  font-semibold  text-[10px] pl-4 g">
        <li
          className={`${
            criteria.hasLowerCase ? "text-green-500" : "text-slate-400"
          }`}
        >
          At least one lowercase letter
        </li>
        <li
          className={`${
            criteria.hasUpperCase ? "text-green-500" : "text-slate-400"
          }`}
        >
          At least one uppercase letter
        </li>
        <li
          className={`${
            criteria.hasDigit ? "text-green-500" : "text-slate-400"
          }`}
        >
          At least one digit
        </li>
      </ul>
      <ul className="list-disc grid grid-cols-2 font-semibold  text-[10px] pl-4 ">
        <li
          className={`${
            criteria.hasSpecialChar ? "text-green-500" : "text-slate-400"
          }`}
        >
          At least one special character (@$!%*?&.)
        </li>
        <li
          className={`${
            criteria.hasMinLength ? "text-green-500" : "text-slate-400"
          }`}
        >
          The password must be 8 to 12 characters long
        </li>
      </ul>
    </div>
  );
}

export default CheckPasswordCriteria