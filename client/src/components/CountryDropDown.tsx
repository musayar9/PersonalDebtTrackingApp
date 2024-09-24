import { useEffect, useState } from "react";
import { fetchCountries } from "../redux/dataFetch";
import { CountryData } from "../lib/types";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const CountryDropDown = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);


  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {


    const fetchAndSetCountries = async () => {
      const countryData = await fetchCountries();
        if (Array.isArray(countryData)) {
          setCountries(countryData); // Eğer data bir dizi ise
        } else {
        
          // İsteğe bağlı olarak boş bir dizi set edebilirsiniz
          setCountries([]);
        }
    };

    fetchAndSetCountries();
  }, []);
  
    const handleSelect = (country:CountryData) => {
      setSelectedCountry(country);
      setIsOpen(false);
    };

  return (
    <div className="relative inline-block w-56 text-gray-700">
      <div className=" border rounded-s-lg border-e-2  border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600">
        <div
          className="flex items-center p-2 justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCountry ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.iso}
                className="w-6 h-6 rounded-sm"
              />
              <p className="text-xs">{selectedCountry.iso}</p>
              <p className="pr-2">({selectedCountry.phoneCode})</p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <img
                src={countries[0]?.flag}
                alt={countries[0]?.iso}
                className="w-6 h-6 rounded-sm"
              />
              <p className="text-xs">{countries[0]?.iso}</p>
              <p className="pr-2">({countries[0]?.phoneCode})</p>
            </div>
          )}

          {isOpen ? <MdArrowDropUp size={18} /> : <MdArrowDropDown size={18} />}
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1">
          {countries?.map((c) => (
            <li
              key={c?._id}
              className="flex items-center space-x-2 text-xs p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(c)}
            >
              <img src={c.flag} alt={c.iso} className="w-6 h-6 rounded-sm" />
              <p className="text-xs ml-2">{c.iso}</p>
              <p className="pr-2 ml-2">({c.phoneCode})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryDropDown;
