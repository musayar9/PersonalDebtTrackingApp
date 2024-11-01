import { useState } from "react";

import { ToggleSwitch } from "flowbite-react";
import ProfileBreadcrumps from "./ProfileBreadcrumps";
import { useTranslation } from "react-i18next";

const ProfileContactPreference = () => {
  const { t } = useTranslation();
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(false);
  const [phoneCall, setPhoneCall] = useState(false);

  return (
    <div className="w-full p-8">
      <ProfileBreadcrumps />
      <div className="max-w-lg mx-auto mt-12">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold ">{t("contact_preferences")}</h2>
          <p className=" text-sm text-center mt-3">
            {t("contact_preferences_info")}
          </p>
        </div>
        <div className="border border-gray-300 p-4 rounded-md my-8">
          <div className="flex items-center justify-between border-b-2 border-gray-300">
            <div className="p-4">
              <h3 className="text-md  font-semibold">
                {t("instant_text_message")}
              </h3>
              <p className="text-sm  mt-3">
                {t("instant_text_message_detail")}
              </p>
            </div>

            <ToggleSwitch checked={email} onChange={setEmail} />
          </div>

          <div className="flex items-center justify-between border-b-2 border-gray-300">
            <div className="p-4">
              <h3 className="text-md  font-semibold">{t("email")}</h3>
              <p className="text-sm mt-3">{t("email_contact_preferences")}</p>
            </div>

            <ToggleSwitch checked={phoneCall} onChange={setPhoneCall} />
          </div>

          <div className="flex items-center justify-between ">
            <div className="p-4">
              <h3 className="text-md  font-semibold">{t("phone_call")}</h3>
              <p className="text-xs  my-3">
                {t("phone_call_contact_preferences")}
              </p>
            </div>

            <ToggleSwitch checked={sms} onChange={setSms} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContactPreference;
