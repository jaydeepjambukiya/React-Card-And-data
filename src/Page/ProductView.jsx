import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductView = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const shareText = `
🛍 Product: ${item.title}
📄 Description: ${item.description}
💰 Price: $${item.price}
📦 Category: ${item.category}
⭐ Rating: ${item.rating}

🔗 View product:
${window.location.href}
`;

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: shareText,
        url: window.location.href,
      });
    } else {
      alert(shareText);
    }
  };

  const whatsAppShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl 
                transition-transform duration-300 hover:scale-[1.02]">

        <Link
          to="/"
          className="inline-block mb-4 text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Back
        </Link>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <img
  src={item.thumbnail}
  alt={item.title}
  className="h-56 w-full md:w-1/2 object-contain 
             transition-transform duration-300 hover:scale-110"
/>


          {/* Product Info */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>

            <p className="text-gray-700 mb-4">{item.description}</p>

            <p className="font-semibold">
              Category: <span className="text-gray-600">{item.category}</span>
            </p>

            <p className="text-3xl font-bold mt-3 text-green-600">
  ${item.price}
</p>


            <p className="text-yellow-600 mt-1">⭐ {item.rating}</p>

            <div className="mt-4 flex gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Buy Now
              </button>

              <button
                onClick={handleNativeShare}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
