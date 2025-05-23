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
    <div className="min-h-screen flex items-center justify-center bg-[#F7FDFB] px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white text-[#143D60] p-8 rounded-xl shadow-lg w-full max-w-md border border-[#90D1CA]"
      >
        <h2 className="text-center text-2xl font-bold mb-6 text-[#2D9596]">
          SummerSchool Kayıt Ol
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ad Soyad</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded border border-[#90D1CA] focus:outline-none focus:ring-2 focus:ring-[#2D9596]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border border-[#90D1CA] focus:outline-none focus:ring-2 focus:ring-[#2D9596]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border border-[#90D1CA] focus:outline-none focus:ring-2 focus:ring-[#2D9596]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Kullanıcı Rolü</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 rounded border border-[#90D1CA] focus:outline-none focus:ring-2 focus:ring-[#2D9596]"
          >
            <option value="student">Öğrenci</option>
            <option value="assistant">Asistan</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#077A7D] hover:bg-[#066467] text-white font-semibold py-2 rounded transition"
        >
          Kayıt Ol
        </button>

        <p className="mt-4 text-sm text-center">
          Zaten hesabınız var mı?{" "}
          <Link to="/login" className="text-[#2D9596] font-semibold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterScreen;
