import React from "react";
import CardSection from "../components/CardSection";
import FeatureSection from "../components/FeatureSection";

const HomeScreen = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hoş Geldiniz mesajı */}
      <div className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-2">Hoş Geldiniz</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Bu sistem üzerinden yaz okuluna ve ders denklik işlemlerine kolayca başvuru yapabilir, önceki başvurularınızı takip edebilirsiniz.
        </p>
      </div>

      {/* Özellik Tanıtım Kartları */}
      <FeatureSection />
    </div>
  );
};

export default HomeScreen;
