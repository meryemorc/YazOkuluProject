import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/home", label: "Anasayfa" },
    { path: "/yaz-okulu", label: "Yaz Okulu" },
    { path: "/yatay-gecis", label: "Ders Denklik" },
    { path: "/sistem-hakkinda", label: "Sistem Hakkında" },
  ];

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
  to="/home"
  className="flex items-center gap-2 no-underline hover:underline decoration-yellow-400 decoration-2 underline-offset-4"
>
  <GraduationCap className="w-9 h-9 p-2 bg-yellow-500 text-black rounded-full" />
  <span className="text-xl font-semibold text-white">SummerSchool</span>
</Link>


          {/* Nav Items */}
          <nav className="flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                  location.pathname === item.path
                    ? "bg-yellow-500 text-gray-900"
                    : "text-gray-200 hover:bg-yellow-600 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
            >
              Çıkış Yap
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
