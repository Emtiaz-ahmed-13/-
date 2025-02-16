import Hero from "../../pages/Hero";
import RecentlyAdded from "./RecentlyAdded";

const Home = () => {
  return (
    <div className="h-screen px-10 py-8">
      <Hero />
      <RecentlyAdded />
    </div>
  );
};

export default Home;
