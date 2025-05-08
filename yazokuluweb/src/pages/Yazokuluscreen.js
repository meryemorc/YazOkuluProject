import React, { useEffect, useState } from "react";
import "./YazOkuluScreen.css";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const YazOkuluScreen = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/api/Universities")
      .then((res) => setUniversities(res.data))
      .catch((err) => console.error("Üniversiteler alınamadı:", err));
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      axios.get("/api/Course").then((res) => {
        const filtered = res.data.filter(
          (c) => c.department_id === parseInt(selectedDepartment)
        );
        setCourses(filtered);
      });
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedFaculty) {
      axios.get("/api/Department").then((res) => {
        const filtered = res.data.filter(
          (dep) => dep.faculty_id === parseInt(selectedFaculty)
        );
        setDepartments(filtered);
      });
    }
  }, [selectedFaculty]);

  useEffect(() => {
    if (selectedUniversity) {
      axios.get("/api/Faculties").then((res) => {
        const filtered = res.data.filter(
          (fac) => fac.university_id === parseInt(selectedUniversity)
        );
        setFaculties(filtered);
      });
    }
  }, [selectedUniversity]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    axios.get("/api/Course")
      .then((res) => {
        const term = searchTerm.toLowerCase();
        const matched = res.data.filter((course) =>
          course.course_name.toLowerCase().includes(term) ||
          course.course_code.toLowerCase().includes(term)
        );
        setCourses(matched);
      })
      .catch((err) => console.error("Arama hatası:", err));
  };

  return (
    <div className="position-relative">
      {/* Sol üst köşedeki geri dön butonu */}
      <div
        className="position-absolute top-0 start-0 m-3"
        style={{ zIndex: 1000 }}
      >
        <button
          className="btn btn-light border rounded-circle shadow-sm d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
          onClick={() => navigate("/home")}
          title="Ana Sayfaya Dön"
        >
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>

      {/* Sayfanın ana içeriği */}
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg p-5 w-100" style={{ maxWidth: "960px" }}>
          <div className="text-center mb-4">
            <h1 className="text-primary fw-bold">
              <i className="bi bi-journal-bookmark-fill me-2"></i>Yaz Okulu Başvurusu
            </h1>
            <p className="text-muted">
              Üniversite, fakülte ve bölüm seçerek dersleri görüntüleyebilir veya doğrudan ders adıyla arama yapabilirsiniz.
            </p>
          </div>

          <div className="row g-4 mb-4 justify-content-center">
            <div className="col-md-4">
              <label className="form-label">🎓 Üniversite Seçin</label>
              <select
                className="form-select"
                onChange={(e) => setSelectedUniversity(e.target.value)}
                value={selectedUniversity}
              >
                <option value="">-- Üniversite Seçin --</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">🏛️ Fakülte Seçin</label>
              <select
                className="form-select"
                onChange={(e) => setSelectedFaculty(e.target.value)}
                value={selectedFaculty}
              >
                <option value="">-- Fakülte Seçin --</option>
                {faculties.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">🏫 Bölüm Seçin</label>
              <select
                className="form-select"
                onChange={(e) => setSelectedDepartment(e.target.value)}
                value={selectedDepartment}
              >
                <option value="">-- Bölüm Seçin --</option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Arama kutusu */}
          <div className="text-center mb-5">
            <h5 className="mb-3">
              <i className="bi bi-search me-2"></i>Ders Ara
            </h5>
            <div className="d-flex justify-content-center">
              <div style={{ maxWidth: "600px", width: "100%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ders adı veya kodu girin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <div className="d-flex justify-content-end mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search me-1"></i> Ara
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ders tablosu */}
          <h4 className="fw-semibold mb-3">
            <i className="bi bi-journal-text me-2 text-primary"></i>Mevcut Dersler
          </h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>Kod</th>
                  <th>Ders Adı</th>
                  <th>Kredi</th>
                  <th>AKTS</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.course_code}</td>
                    <td>{course.course_name}</td>
                    <td>{course.kredi}</td>
                    <td>{course.akts}</td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-muted text-center">
                      Gösterilecek ders bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="text-center">
              <p className="text-muted">
                Toplam {courses.length} ders gösteriliyor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YazOkuluScreen;
