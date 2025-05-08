import React from "react";
import { Link } from "react-router-dom";

const CardSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 px-4 mb-20">
      {/* Yaz Okulu Kartı */}
      <div className="card lg:card-side bg-base-100 shadow-sm w-full max-w-2xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
            alt="Yaz Okulu"
            className="h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-gray-900">Yaz Okulu Başvurusu</h2>
          <p className="text-sm text-gray-600">Üniversiteler arası yaz okulu derslerini görüntüleyin ve başvurunuzu yapın.</p>
          <div className="card-actions justify-end">
            <Link to="/yaz-okulu" className="btn btn-warning text-white">
              Başvur
            </Link>
          </div>
        </div>
      </div>

      {/* Ders Denklik Kartı */}
      <div className="card lg:card-side bg-base-100 shadow-sm w-full max-w-2xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1521165943898-3f8d0311c3c9.webp"
            alt="Ders Denklik"
            className="h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-gray-900">Yatay Geçiş Ders Denklik İşlemleri</h2>
          <p className="text-sm text-gray-600">Transkriptinizi yükleyin, hedef üniversiteye göre ders eşleşmesini görün.</p>
          <div className="card-actions justify-end">
            <Link to="/yatay-gecis" className="btn btn-warning text-white">
              Başvur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
