import React, { useEffect, useState } from "react";
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
    if (selectedUniversity) {
      axios.get("/api/Faculties").then((res) => {
        const filtered = res.data.filter(
          (f) => f.university_id === parseInt(selectedUniversity)
        );
        setFaculties(filtered);
      });
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (selectedFaculty) {
      axios.get("/api/Department").then((res) => {
        const filtered = res.data.filter(
          (d) => d.faculty_id === parseInt(selectedFaculty)
        );
        setDepartments(filtered);
      });
    }
  }, [selectedFaculty]);

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

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    axios.get("/api/Course").then((res) => {
      const term = searchTerm.toLowerCase();
      const matched = res.data.filter((c) =>
        c.course_name.toLowerCase().includes(term) ||
        c.course_code.toLowerCase().includes(term)
      );
      setCourses(matched);
    });
  };

  return (
    <div className="min-h-screen bg-[#F7FDFB] text-[#143D60] px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">🎓 Yaz Okulu Başvurusu</h1>
          <p className="text-[#555]">
            Filtreleri kullanarak ders arayabilir veya üniversite seçimi yapabilirsiniz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block mb-2 text-sm font-medium">Üniversite</label>
            <select
              className="w-full p-2 bg-white text-[#143D60] border border-[#90D1CA] rounded"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Fakülte</label>
            <select
              className="w-full p-2 bg-white text-[#143D60] border border-[#90D1CA] rounded"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Bölüm</label>
            <select
              className="w-full p-2 bg-white text-[#143D60] border border-[#90D1CA] rounded"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Ders adı ya da kodu..."
            className="w-full md:w-1/2 p-2 bg-white text-[#143D60] border border-[#90D1CA] rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-[#077A7D] hover:bg-[#066467] text-white rounded"
          >
            Ara
          </button>
        </div>

        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-[#90D1CA] text-[#143D60]">
              <tr>
                <th className="px-4 py-2">Kod</th>
                <th className="px-4 py-2">Ders Adı</th>
                <th className="px-4 py-2">Kredi</th>
                <th className="px-4 py-2">AKTS</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-[#999]">
                    Gösterilecek ders yok.
                  </td>
                </tr>
              ) : (
                courses.map((c) => (
                  <tr key={c.id} className="border-t border-[#90D1CA]">
                    <td className="px-4 py-2">{c.course_code}</td>
                    <td className="px-4 py-2">{c.course_name}</td>
                    <td className="px-4 py-2">{c.kredi}</td>
                    <td className="px-4 py-2">{c.akts}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YazOkuluScreen;
