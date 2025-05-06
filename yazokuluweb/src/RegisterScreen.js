import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "./api/axios"; 

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
          role
        });
      
            console.log("RESPONSE:", response);
        alert("Kayıt oldu"); // önce bunu göster
        navigate("/");  // sonra yönlendir

      } catch (err) {
        console.error("HATA:", err); 
        setError("Kayıt başarısız. Bilgileri kontrol et.");
      }
      
  };

  return (
    <div className="container">
      <form autoComplete="off" onSubmit={handleRegister}>
        <h1>Kayıt Ol</h1>
        {error && <small style={{ color: "red" }}>{error}</small>}

        <div className="field">
          <input
            type="text"
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <label>Ad Soyad</label>
        </div>

        <div className="field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        <div className="field">
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Şifre</label>
        </div>

        <div className="field">
            <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="student">Öğrenci</option>
                <option value="assistant">Asistan</option>
                <option value="admin">Admin</option>
             </select>
        </div>

        <button type="submit">Kayıt Ol</button>

        <p>
          Zaten hesabın var mı?{" "}
          <Link to="/" style={{ fontWeight: "bold" }}>
            Giriş Yap
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterScreen;
