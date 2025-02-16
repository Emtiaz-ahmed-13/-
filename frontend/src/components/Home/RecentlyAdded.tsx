import axios from "axios";
import { useEffect, useState } from "react";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Sending a GET request to the backend
        const response = await axios.get("http://localhost:5001/api/recent");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-gray-800 font-semibold">নতুন বই সমূহ</h4>
    </div>
  );
};

export default RecentlyAdded;
