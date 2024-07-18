import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { fetchCountries } from "../redux/dataFetch";
import { CountryData } from "../lib/types";


const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchAndSetCountries = async () => {
      const countryData = await fetchCountries();
      setCountries(countryData);
    };

    fetchAndSetCountries();
  }, []);

  console.log(countries);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold capitalize p-1">{user?.user?.name}</h2>
    </div>
  );
};

export default Home;
