import React from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-title">Yaz Okulu Sistemi</div>
        <div className="navbar-links">
          <Link to="/profile">Profilim</Link>
          <Link to="/applications">Başvurularım</Link>
          <Link to="/history">Geçmiş İşlemler</Link>
          <Link to="/settings">Ayarlar</Link>
          <Link to="/logout">Çıkış Yap</Link>
        </div>
      </nav>

      <div className="welcome">
        <h2>Hoş Geldiniz</h2>
        <p>
          Bu sistem üzerinden yaz okuluna ve yatay geçiş işlemlerine kolayca başvuru yapabilir, geçmiş başvurularınızı takip edebilirsiniz.
        </p>
      </div>

      <div className="card-section">
        <div className="card">
          <h3>Yaz Okulu</h3>
          <p>Yaz okuluna başvuru ve ders görüntüleme işlemleri.</p>
          <Link to="/yaz-okulu" className="card-btn">Git</Link>
        </div>
        <div className="card">
          <h3>Yatay Geçiş</h3>
          <p>Yatay geçiş başvurunuzu kolayca yapın ve takip edin.</p>
          <Link to="/yatay-gecis" className="card-btn">Git</Link>
        </div>
      </div>

      <div className="history-section">
        <h3>Son İşlemler</h3>
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>İşlem</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>06.05.2025</td>
              <td>Yaz Okulu Başvurusu</td>
              <td>Onaylandı</td>
            </tr>
            <tr>
              <td>04.05.2025</td>
              <td>Yatay Geçiş Başvurusu</td>
              <td>İnceleniyor</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeScreen;
