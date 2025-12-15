const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} E-Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
