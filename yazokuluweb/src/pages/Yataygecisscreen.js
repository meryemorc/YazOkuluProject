import React, { useEffect, useState } from "react";
import axios from "../api/axios";

import "./YatayGecisScreen.css";


const YatayGecisScreen = () => {
  const [transcript, setTranscript] = useState(null);
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [matchedCourses, setMatchedCourses] = useState([]);
  const [unmatchedCourses, setUnmatchedCourses] = useState([]);

  // Üniversiteler
  useEffect(() => {
    axios.get("/api/YgUniversity")
      .then(res => setUniversities(res.data))
      .catch(err => console.error("Üniversiteler alınamadı:", err));
  }, []);

  // Fakülteler
  useEffect(() => {
    if (university) {
      axios.get(`/api/YgFaculty/ByUniversity/${university}`)
        .then(res => setFaculties(res.data))
        .catch(err => console.error("Fakülteler alınamadı:", err));
      setFaculty("");
      setDepartments([]);
      setDepartment("");
      setSemesters([]);
      setSemester("");
    }
  }, [university]);

  // Bölümler
  useEffect(() => {
    if (faculty) {
      axios.get(`/api/YgDepartment/ByFaculty/${faculty}`)
        .then(res => setDepartments(res.data))
        .catch(err => console.error("Bölümler alınamadı:", err));
      setDepartment("");
      setSemesters([]);
      setSemester("");
    }
  }, [faculty]);

  // Dönemler (Courses tablosundaki max semester)
  useEffect(() => {
    if (department) {
      axios.get(`/api/YgCourse/SemesterCount/${department}`)
        .then(res => {
          const maxSemester = res.data;
          const list = Array.from({ length: maxSemester }, (_, i) => i + 1);
          setSemesters(list);
        })
        .catch(err => {
          console.error("Dönem alınamadı:", err);
          setSemesters([]);
        });
    } else {
      setSemesters([]);
    }
  }, [department]);

  const handleFileChange = (e) => {
    setTranscript(e.target.files[0]);
  };

  const handleMatchCourses = () => {
    alert("Eşleştirme başlatıldı! (Backend entegrasyonu yapılacak)");
  };

  return (
    <div className="container py-5">
      <div className="yatay-card">
        <h2 className="text-center mb-5">Yatay Geçiş Başvurusu</h2>

       

        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <label className="form-label">🎓 Üniversite</label>
            <select className="form-select" value={university} onChange={(e) => setUniversity(e.target.value)}>
              <option value="">Seçiniz</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-6">
            <label className="form-label">🏛️ Fakülte</label>
            <select className="form-select" value={faculty} onChange={(e) => setFaculty(e.target.value)} disabled={!faculties.length}>
              <option value="">Seçiniz</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-6">
            <label className="form-label">🏫 Bölüm</label>
            <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} disabled={!departments.length}>
              <option value="">Seçiniz</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-6">
            <label className="form-label">🎯 Sınıf</label>
            <select className="form-select" value={semester} onChange={(e) => setSemester(e.target.value)} disabled={!semesters.length}>
              <option value="">Seçiniz</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}. Dönem</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mb-5">
          <button className="btn btn-primary" onClick={handleMatchCourses}>
            🔍 Eşleştirmeyi Başlat
          </button>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-success h-100">
              <div className="card-header bg-success text-white">✅ Uyumlu Dersler</div>
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
              <div className="card-header bg-danger text-white">❌ Uyumsuz Dersler</div>
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
