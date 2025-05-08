import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-900 text-white">
        {children}
      </main>
       <Footer /> 
    </>
  );
};

export default MainLayout;
