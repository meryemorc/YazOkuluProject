import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SistemHakkindaScreen = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 border-b border-yellow-500 pb-2">
          📘 Sistem Hakkında
        </h2>

        <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-yellow-500">
          <h3 className="text-xl font-semibold mb-2 text-yellow-300">📚 Yaz Okulu Modülü</h3>
          <p className="text-gray-300 leading-relaxed">
            Yaz Okulu modülü, öğrencilerin farklı üniversitelerde açılan yaz okulu derslerini kolayca
            bulmalarını sağlar. Üniversite, fakülte ve bölüm filtreleri sayesinde yalnızca ilgilenilen
            dersler görüntülenebilir. Derslerin kredisi ve AKTS bilgileriyle birlikte detaylı liste sunar.
          </p>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-yellow-500">
          <h3 className="text-xl font-semibold mb-2 text-yellow-300">🔄 Yatay Geçiş Modülü</h3>
          <p className="text-gray-300 leading-relaxed">
            Öğrenciler transkriptlerini sisteme yükleyerek, hedef bölümdeki derslerle karşılaştırma
            yapabilir. Sistem, ders adı benzerliği ve kredi/AKTS eşleşmesi gibi kriterlere göre otomatik
            eşleştirme gerçekleştirir. Uyumlu ve uyumsuz dersler ayrı ayrı gösterilir.
          </p>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-yellow-500">
          <h3 className="text-xl font-semibold mb-2 text-yellow-300">🤖 Chatbot Destekli İnceleme</h3>
          <p className="text-gray-300 leading-relaxed">
            Uyumlu olmayan dersler, OpenAI destekli bir yapay zeka ile analiz edilerek olası eşleşmeler
            hakkında öneriler sunar. Chatbot, sistemin kaçırmış olabileceği eşleşmeleri yakalayarak
            kullanıcıya rehberlik eder.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SistemHakkindaScreen;
