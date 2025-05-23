import React from "react";
import { Link } from "react-router-dom";
import { BookOpenText, FileStack, Info } from "lucide-react";

const HomeScreen = () => {
  return (
    <div className="bg-[#F7FDFB] text-[#104A7B] min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-[#90D1CA] text-sm tracking-widest mb-2">
          SİSTEM MODÜLLERİ
        </h2>
        <h1 className="text-3xl font-bold text-center mb-10">
          Platform Size Neler Sunuyor?
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Yaz Okulu */}
          <div className="bg-[#309898] p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4 text-white text-xl font-semibold">
              <BookOpenText />
              Yaz Okulu Başvurusu
            </div>
            <p className="text-white mb-4">
              Üniversite, fakülte ve bölüm seçerek yaz okulunda verilen dersleri görüntüleyin.
            </p>
            <Link
              to="/yaz-okulu"
              className="inline-block text-white font-medium bg-[#077A7D] px-3 py-1 rounded hover:bg-[#066467] transition"
            >
              Keşfet →
            </Link>
          </div>

          {/* Yatay Geçiş */}
          <div className="bg-[#309898] p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4 text-white text-xl font-semibold">
              <FileStack />
              Yatay Geçiş Eşleşmesi
            </div>
            <p className="text-white mb-4">
              Transkriptinizi yükleyerek hedef bölümdeki derslerle eşleşmelerinizi görün.
            </p>
            <Link
              to="/yatay-gecis"
              className="inline-block text-white font-medium bg-[#077A7D] px-3 py-1 rounded hover:bg-[#066467] transition"
            >
              Keşfet →
            </Link>
          </div>

          {/* Sistem Hakkında */}
          <div className="bg-[#309898] p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4 text-white text-xl font-semibold">
              <Info />
              Sistem Hakkında
            </div>
            <p className="text-white mb-4">
              Bu sistemin nasıl çalıştığını, hangi verileri kullandığını ve nasıl yardımcı olduğunu detaylıca keşfedin.
            </p>
            <Link
              to="/sistem-hakkinda"
              className="inline-block text-white font-medium bg-[#077A7D] px-3 py-1 rounded hover:bg-[#066467] transition"
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
