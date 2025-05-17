import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 border-t border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} SummerSchool • Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
