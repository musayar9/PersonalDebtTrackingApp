import { useTranslation } from "react-i18next";
import { useCheckPasswordCriteria } from "../utils/customHooks";

const CheckPasswordCriteria = ({ password }: { password: string }) => {
  const { criteria } = useCheckPasswordCriteria(password);
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <ul className="list-disc grid grid-cols-3  font-semibold  text-[10px] pl-4 g">
        <li
          className={`${
            criteria.hasLowerCase ? "text-green-500" : "text-slate-400"
          }`}
        >
          {t("At_least_one_lowercase_letter")}
        </li>
        <li
          className={`${
            criteria.hasUpperCase ? "text-green-500" : "text-slate-400"
          }`}
        >
          {t("At_least_one_uppercase_letter")}
        </li>
        <li
          className={`${
            criteria.hasDigit ? "text-green-500" : "text-slate-400"
          }`}
        >
          {t(" At least one digit")}
        </li>
      </ul>
      <ul className="list-disc grid grid-cols-2 font-semibold  text-[10px] pl-4 ">
        <li
          className={`${
            criteria.hasSpecialChar ? "text-green-500" : "text-slate-400"
          }`}
        >
          {t("At_least_one_special_character")} (@$!%*?&.)
        </li>
        <li
          className={`${
            criteria.hasMinLength ? "text-green-500" : "text-slate-400"
          }`}
        >
          {t("check_password")}
        </li>
      </ul>
    </div>
  );
};

export default CheckPasswordCriteria;
