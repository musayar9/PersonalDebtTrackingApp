import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface Languages {
  language: string;
  flag: string;
}

const languages = [
  {
    id: 1,
    language: "tr",
    flag: "https://flagcdn.com/w320/tr.png",
  },
  { id: 2, language: "en", flag: "https://flagcdn.com/w320/gb.png" },
];

const Language = () => {
  const [selectLanguage, setSelectLanguage] = useState<Languages | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleSelectLanguage =  (data: Languages) => {
    setSelectLanguage(data);

    setIsOpen(false);
     i18n.changeLanguage(data.language);
  };
  return (
    <div className="relative inline-block w-24">
      <div className="  rounded border   focus:outline-none focus:ring-0 focus:border-emerald-600">
        <div
          className="flex items-center p-2 justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectLanguage ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectLanguage.flag}
                className="w-6 h-6 rounded-sm object-contain"
              />
              <p className="text-xs capitalize">{selectLanguage.language}</p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <img
                src={languages[0]?.flag}
                alt={languages[0]?.language}
                className="w-6 h-6 rounded-sm"
              />
              <p className="text-xs capitalize">{languages[0]?.language}</p>
            </div>
          )}

          {isOpen ? <MdArrowDropUp size={18} /> : <MdArrowDropDown size={18} />}
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-base-100 border border-gray-300 rounded-lg mt-1">
          {languages?.map((c) => (
            <li
              key={c?.id}
              className="flex items-center space-x-2 text-xs p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectLanguage(c)}
            >
              <img
                src={c.flag}
                alt={c.flag}
                className="w-6 h-6 rounded-sm object-contain"
              />
              <p className="text-xs ml-2 capitalize">{c.language}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Language;
