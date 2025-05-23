import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#2D9596] text-white py-6 border-t border-[#90D1CA]">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} SummerSchool • Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
