import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/Auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch {
      setError("Giriş başarısız. Lütfen bilgileri kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FDFB] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-[#143D60] p-8 rounded-xl shadow-lg w-full max-w-md border border-[#90D1CA]"
      >
        <h2 className="text-center text-2xl font-bold mb-6 text-[#2D9596]">
          SummerSchool Giriş
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border border-[#90D1CA] focus:outline-none focus:ring-2 focus:ring-[#2D9596]"
            placeholder="ornek@eposta.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border border-[#90D1CA] focus:outline-none focus:ring-2 focus:ring-[#2D9596]"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#077A7D] hover:bg-[#066467] text-white font-semibold py-2 rounded transition"
        >
          Giriş Yap
        </button>

        <p className="mt-4 text-sm text-center">
          Hesabınız yok mu?{" "}
          <Link to="/register" className="text-[#2D9596] font-semibold hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
