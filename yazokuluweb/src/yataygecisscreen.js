import React, { useEffect, useState } from "react";
import axios from "./api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./YatayGecisScreen.css";
import { useNavigate } from "react-router-dom";

const YatayGecisScreen = () => {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState(null);
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [matchedCourses, setMatchedCourses] = useState([]);
  const [unmatchedCourses, setUnmatchedCourses] = useState([]);

  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/universities")
      .then(res => setUniversities(res.data))
      .catch(err => console.error("Üniversiteler alınamadı:", err));
  }, []);

  useEffect(() => {
    if (university) {
      axios.get(`/api/faculties?university_id=${university}`)
        .then(res => setFaculties(res.data))
        .catch(err => console.error("Fakülteler alınamadı:", err));
    } else {
      setFaculties([]);
      setDepartments([]);
      setSemester("");
    }
  }, [university]);

  useEffect(() => {
    if (faculty) {
      axios.get(`/api/departments?faculty_id=${faculty}`)
        .then(res => setDepartments(res.data))
        .catch(err => console.error("Bölümler alınamadı:", err));
    } else {
      setDepartments([]);
    }
  }, [faculty]);

  useEffect(() => {
    if (department && semester) {
      axios.get(`/api/yataygecis_courses?department_id=${department}&semester=${semester}`)
        .then(res => setCourses(res.data))
        .catch(err => console.error("Dersler alınamadı:", err));
    }
  }, [department, semester]);

  const handleFileChange = (e) => {
    setTranscript(e.target.files[0]);
  };

  const handleMatchCourses = () => {
    alert("Eşleştirme başlatıldı! (Henüz backend bağlantısı yok)");
  };

  return (
    <div className="container py-5">
      <div className="yatay-card">
        <h2 className="text-center mb-5">Yatay Geçiş Başvurusu</h2>

        <div className="mb-4">
          <label className="form-label fw-semibold">📄 Transkript Yükle</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <label className="form-label">🎓 Üniversite</label>
            <select className="form-select" value={university} onChange={(e) => setUniversity(e.target.value)}>
              <option value="">Seçiniz</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>{uni.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-6">
            <label className="form-label">🏛️ Fakülte</label>
            <select className="form-select" value={faculty} onChange={(e) => setFaculty(e.target.value)}>
              <option value="">Seçiniz</option>
              {faculties.map((fac) => (
                <option key={fac.id} value={fac.id}>{fac.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-6">
            <label className="form-label">🏫 Bölüm</label>
            <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Seçiniz</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-6">
            <label className="form-label">🎯 Sınıf</label>
            <select className="form-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="">Seçiniz</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}. Dönem</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mb-5">
          <button className="btn btn-primary match-button" onClick={handleMatchCourses}>
            🔍 Eşleştirmeyi Başlat
          </button>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-success h-100">
              <div className="card-header bg-success text-white">
                ✅ Uyumlu Dersler
              </div>
              <div className="card-body">
                {matchedCourses.length === 0 ? (
                  <p className="text-muted">Henüz eşleşen ders yok.</p>
                ) : (
                  <ul className="list-group">
                    {matchedCourses.map((c, i) => (
                      <li key={i} className="list-group-item">{c.course_code} - {c.course_name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-danger h-100">
              <div className="card-header bg-danger text-white">
                ❌ Uyumsuz Dersler
              </div>
              <div className="card-body">
                {unmatchedCourses.length === 0 ? (
                  <p className="text-muted">Henüz uyumsuz ders yok.</p>
                ) : (
                  <ul className="list-group">
                    {unmatchedCourses.map((c, i) => (
                      <li key={i} className="list-group-item">{c.course_code} - {c.course_name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YatayGecisScreen;
