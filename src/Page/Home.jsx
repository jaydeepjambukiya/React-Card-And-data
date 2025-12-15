import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const jsonData = await response.json();
      setData(jsonData.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || item.category === category;

    return matchSearch && matchCategory;
  });

  const categories = ["all", ...new Set(data.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border w-full md:w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border w-full md:w-48"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      
      {loading && (
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-4 
                         hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-40 w-full object-contain mb-3"
              />

              <h3 className="text-lg font-semibold mb-1">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2">
                {item.description}
              </p>

              <p className="text-yellow-600 font-medium mt-1">
                ⭐ {item.rating}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-xl font-bold">${item.price}</span>

                <Link to={`/product/${item.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found 😢
        </p>
      )}
    </div>
  );
};

export default Home;
