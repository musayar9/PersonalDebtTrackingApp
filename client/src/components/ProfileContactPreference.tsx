import React, { useState } from 'react'
import ProfileBreadcrumps from './ProfileBreadcrumps'
import { ToggleSwitch } from 'flowbite-react';

const ProfileContactPreference = () => {
const [sms, setSms] = useState(false);
const [email, setEmail] = useState(false);
const [phoneCall, setPhoneCall] = useState(false);

  return (
    <div className="w-full p-8">
      <ProfileBreadcrumps />
      <div className="max-w-lg mx-auto mt-12">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-slate-700">
            Contact Preferences
          </h2>
          <p className="text-slate-600 text-sm text-center mt-3">
            You can determine the methods you prefer to be informed about
            important campaigns.
          </p>
        </div>
        <div className="border border-gray-300 p-4 rounded-md my-8">
          <div className="flex items-center justify-between border-b-2 border-gray-300">
            <div className="p-4">
              <h3 className="text-md text-slate-600 font-semibold">
                Instant Text Message
              </h3>
              <p className="text-sm text-slate-500 mt-3">
                Messages to be sent by DebtTracking to your mobile phone via
                instant/text message channels
              </p>
            </div>

            <ToggleSwitch checked={email} onChange={setEmail} />
          </div>

          <div className="flex items-center justify-between border-b-2 border-gray-300">
            <div className="p-4">
              <h3 className="text-md text-slate-600 font-semibold">E-mail</h3>
              <p className="text-sm text-slate-500 mt-3">
                Notifications sent by DebtTracking via email
              </p>
            </div>

            <ToggleSwitch checked={phoneCall} onChange={setPhoneCall} />
          </div>

          <div className="flex items-center justify-between ">
            <div className="p-4">
              <h3 className="text-md text-slate-600 font-semibold">
                Phone Call
              </h3>
              <p className="text-xs text-slate-500 my-3">
                Calls to be made by DebtTracking to your mobile phone using the
                search method.
              </p>
            </div>

            <ToggleSwitch checked={sms} onChange={setSms} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContactPreference