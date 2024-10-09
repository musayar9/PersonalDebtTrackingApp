import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface Languages {
  id: number;
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
  const [selectLanguage, setSelectLanguage] = useState<Languages | undefined>(
    languages[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = languages.find(
      (lang) => lang.language === i18n.language
    );
   
    setSelectLanguage(currentLanguage);
  }, []);

  const handleSelectLanguage = async (data: Languages) => {
    setSelectLanguage(data);

    setIsOpen(false);
    await i18n.changeLanguage(data.language);
  };
  return (
    <div className="relative  w-26 ml-2">
      <div className="">
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
        <ul className="absolute z-10 w-full bg-base-200 rounded-lg mt-1">
          {languages?.map((c) => (
            <li
              key={c?.id}
              className="flex items-center space-x-2 text-xs p-2 cursor-pointer hover:bg-base-300 m-2 hover:rounded-lg transform duration-150 ease-in "
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
