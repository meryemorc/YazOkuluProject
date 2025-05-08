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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-gray-800 text-white p-8 rounded shadow-md w-full max-w-md"
  >
    <h2 className="text-center text-2xl font-semibold mb-6">
      SummerSchool Kullanıcı Girişi
    </h2>

    <div className="mb-4">
      <label className="block text-sm mb-1">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
        placeholder="ornek@eposta.com"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm mb-1">Şifre</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
        placeholder="••••••••"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
    >
      Giriş Yap
    </button>

    <p className="mt-4 text-sm text-center">
      Hesabınız yok mu?{" "}
      <Link to="/register" className="text-yellow-400 font-semibold">
        Kayıt Ol
      </Link>
    </p>
  </form>
</div>

  );
};

export default LoginScreen;
