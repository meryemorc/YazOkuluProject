import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import YazOkuluScreen from "./yazokuluscreen";
import YatayGecisScreen from "./yataygecisscreen";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} /> {/* ← burası değişti */}
        <Route path="/yaz-okulu" element={<YazOkuluScreen />} />
        <Route path="/yatay-gecis" element={<YatayGecisScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
