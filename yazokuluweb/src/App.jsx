import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import YazOkuluScreen from "./pages/Yazokuluscreen";
import YatayGecisScreen from "./pages/Yataygecisscreen";
import SistemHakkindaScreen from "./pages/SistemHakkindaScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<MainLayout><HomeScreen /></MainLayout>} />
        <Route path="/yaz-okulu" element={<MainLayout><YazOkuluScreen /></MainLayout>} />
        <Route path="/yatay-gecis" element={<MainLayout><YatayGecisScreen /></MainLayout>} />
        <Route path="/sistem-hakkinda" element={<SistemHakkindaScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
