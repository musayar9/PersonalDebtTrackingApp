import React from "react";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold capitalize p-1">{user?.user.name}</h2>
    </div>
  );
};

export default Home;
