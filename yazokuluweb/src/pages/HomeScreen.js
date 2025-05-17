import React from "react";
import { Link } from "react-router-dom";
import { BookOpenText, FileStack, Info } from "lucide-react";

const HomeScreen = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-yellow-500 text-sm tracking-widest mb-2">SİSTEM MODÜLLERİ</h2>
        <h1 className="text-3xl font-bold text-center mb-10">Platform Size Neler Sunuyor?</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Yaz Okulu */}
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4 text-yellow-400 text-xl font-semibold">
              <BookOpenText />
              Yaz Okulu Başvurusu
            </div>
            <p className="text-gray-300 mb-4">
              Üniversite, fakülte ve bölüm seçerek yaz okulunda verilen dersleri görüntüleyin.
            </p>
            <Link
              to="/yaz-okulu"
              className="inline-block text-yellow-400 font-medium hover:underline transition"
            >
              Keşfet →
            </Link>
          </div>

          {/* Yatay Geçiş */}
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4 text-yellow-400 text-xl font-semibold">
              <FileStack />
              Yatay Geçiş Eşleşmesi
            </div>
            <p className="text-gray-300 mb-4">
              Transkriptinizi yükleyerek hedef bölümdeki derslerle eşleşmelerinizi görün.
            </p>
            <Link
              to="/yatay-gecis"
              className="inline-block text-yellow-400 font-medium hover:underline transition"
            >
              Keşfet →
            </Link>
          </div>

          {/* Sistem Hakkında */}
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4 text-yellow-400 text-xl font-semibold">
              <Info />
              Sistem Hakkında
            </div>
            <p className="text-gray-300 mb-4">
              Bu sistemin nasıl çalıştığını, hangi verileri kullandığını ve nasıl yardımcı olduğunu detaylıca keşfedin.
            </p>
            <Link
              to="/sistem-hakkinda"
              className="inline-block text-yellow-400 font-medium hover:underline transition"
            >
              Keşfet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
