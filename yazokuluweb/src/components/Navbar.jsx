import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center mb-2 md:mb-0 no-underline">
  <GraduationCap className="w-10 h-10 p-2 bg-yellow-500 rounded-full text-white" />
  <span className="ml-3 text-2xl font-semibold tracking-wide text-white not-italic">
    SummerSchool
  </span>
</Link>

        {/* Navigation Buttons */}
        <nav className="flex flex-wrap gap-3">
          <Link
            to="/home"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-4 py-2 rounded transition"
          >
            Anasayfa
          </Link>
          <Link
            to="/yaz-okulu"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-4 py-2 rounded transition"
          >
            Yaz Okulu
          </Link>
          <Link
            to="/yatay-gecis"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-4 py-2 rounded transition"
          >
            Ders Denklik
          </Link>
          <Link
            to="/profile"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-4 py-2 rounded transition"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-4 py-2 rounded transition"
          >
            Çıkış Yap
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
