
import { useAppSelector } from "../redux/hooks";

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold capitalize p-1">{user?.user?.name}</h2>
    </div>
  );
};

export default Home;
