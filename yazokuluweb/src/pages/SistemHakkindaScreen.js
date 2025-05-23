import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SistemHakkindaScreen = () => {
  return (
    <div className="bg-[#F7FDFB] text-[#143D60] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#2D9596] pb-2">
          📘 Sistem Hakkında
        </h2>

        <section className="bg-white p-6 rounded-lg shadow-md border border-[#2D9596]">
          <h3 className="text-xl font-semibold mb-2 text-[#2D9596]">📚 Yaz Okulu Modülü</h3>
          <p className="text-[#4B5563] leading-relaxed">
            Yaz Okulu modülü, öğrencilerin farklı üniversitelerde açılan yaz okulu derslerini kolayca
            bulmalarını sağlar. Üniversite, fakülte ve bölüm filtreleri sayesinde yalnızca ilgilenilen
            dersler görüntülenebilir. Derslerin kredisi ve AKTS bilgileriyle birlikte detaylı liste sunar.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md border border-[#2D9596]">
          <h3 className="text-xl font-semibold mb-2 text-[#2D9596]">🔄 Yatay Geçiş Modülü</h3>
          <p className="text-[#4B5563] leading-relaxed">
            Öğrenciler transkriptlerini sisteme yükleyerek, hedef bölümdeki derslerle karşılaştırma
            yapabilir. Sistem, ders adı benzerliği ve kredi/AKTS eşleşmesi gibi kriterlere göre otomatik
            eşleştirme gerçekleştirir. Uyumlu ve uyumsuz dersler ayrı ayrı gösterilir.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md border border-[#2D9596]">
          <h3 className="text-xl font-semibold mb-2 text-[#2D9596]">🤖 Chatbot Destekli İnceleme</h3>
          <p className="text-[#4B5563] leading-relaxed">
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
