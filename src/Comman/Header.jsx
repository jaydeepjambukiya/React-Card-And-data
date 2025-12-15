import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛒 E-Shop
        </Link>

        <nav className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/" className="hover:text-blue-500">Products</Link>
          <Link to="/" className="hover:text-blue-500">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
