import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/Users", {
        fullName,
        email,
        password,
        role,
      });

      console.log("RESPONSE:", response);
      alert("Kayıt başarılı!");
      navigate("/login");
    } catch (err) {
      console.error("HATA:", err);
      setError("Kayıt başarısız. Bilgileri kontrol et.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 text-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          SummerSchool Kayıt Ol
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Ad Soyad</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Kullanıcı Rolü</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          >
            <option value="student">Öğrenci</option>
            <option value="assistant">Asistan</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
        >
          Kayıt Ol
        </button>

        <p className="mt-4 text-sm text-center">
          Zaten hesabınız var mı?{" "}
          <Link to="/login" className="text-yellow-400 font-semibold">
            Giriş Yap
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterScreen;
