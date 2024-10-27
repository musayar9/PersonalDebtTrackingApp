import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProfileBreadcrumps = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="border-b pb-5">
        <h2 className="text-2xl font-medium tracking-wider capitalize ">
          {t("user_information")}
        </h2>
      </div>
      <div className="breadcrumbs text-md font-bold  my-4 ">
        <ul>
          <li>
            <Link to="/profile">{t("user_information")}</Link>
          </li>
          <li>
            <Link to="/profile/change-password">{t("change_password")}</Link>
          </li>
          <li>
            <Link to="/profile/contactPreference">
              {t("contact_preferences")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileBreadcrumps;
