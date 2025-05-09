import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const YatayGecisScreen = () => {
  const [transcript, setTranscript] = useState(null);
  const [matchedCourses, setMatchedCourses] = useState([]);
  const [unmatchedCourses, setUnmatchedCourses] = useState([]);

  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/YgUniversity")
      .then(res => setUniversities(res.data))
      .catch(err => console.error("Üniversiteler alınamadı:", err));
  }, []);

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

  useEffect(() => {
    if (department && semester) {
      axios.get(`/api/YgCourse/ByDepartment/${department}`)
        .then(res => {
          const filtered = res.data.filter(c => c.semester <= parseInt(semester));
          setCourses(filtered);
        })
        .catch(err => console.error("Dersler alınamadı:", err));
    } else {
      setCourses([]);
    }
  }, [department, semester]);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", transcript);
    formData.append("departmentId", department);

    try {
      const response = await axios.post("/api/YgCourse/upload-transcript", formData);
      const { matched, unmatched } = response.data;
      setMatchedCourses(matched);
      setUnmatchedCourses(unmatched);
    } catch (err) {
      console.error("Yükleme hatası:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Yatay Geçiş Başvurusu</h2>

        {/* Dropdownlar */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {/* Dropdownlar tek tek */}
          {[{
            label: "🎓 Üniversite",
            value: university,
            onChange: setUniversity,
            options: universities
          }, {
            label: "🏛️ Fakülte",
            value: faculty,
            onChange: setFaculty,
            options: faculties,
            disabled: !faculties.length
          }, {
            label: "🏫 Bölüm",
            value: department,
            onChange: setDepartment,
            options: departments,
            disabled: !departments.length
          }, {
            label: "🎯 Sınıf",
            value: semester,
            onChange: setSemester,
            options: semesters.map(s => ({ id: s, name: `${s}. Dönem` })),
            disabled: !semesters.length
          }].map(({ label, value, onChange, options, disabled = false }, i) => (
            <div key={i}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <select
                className="w-full p-2 bg-gray-800 text-white rounded"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
              >
                <option value="">Seçiniz</option>
                {options.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Ders Tablosu */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-2">📘 Seçilen Döneme Kadar Tüm Dersler</h3>
          <div className="overflow-y-auto max-h-[400px] rounded border border-gray-600">
            <table className="min-w-full table-auto text-left text-sm text-gray-300">
              <thead className="bg-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2">Kod</th>
                  <th className="px-4 py-2">Ders Adı</th>
                  <th className="px-4 py-2">Kredi</th>
                  <th className="px-4 py-2">AKTS</th>
                  <th className="px-4 py-2">Dönem</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">Ders bulunamadı.</td>
                  </tr>
                ) : (
                  courses.map((c) => (
                    <tr key={c.id}>
                      <td className="px-4 py-2">{c.courseCode}</td>
                      <td className="px-4 py-2">{c.courseName}</td>
                      <td className="px-4 py-2">{c.kredi}</td>
                      <td className="px-4 py-2">{c.akts}</td>
                      <td className="px-4 py-2">{c.semester}. dönem</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dosya Yükleme */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">📄 Transkript Dosyası Yükle</h3>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition">
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">PDF dosyasını yükleyin</span>
              </p>
              <p className="text-xs text-gray-400">Sadece PDF (Max: 2MB)</p>
              <input
                id="dropzone-file"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setTranscript(e.target.files[0])}
              />
            </label>
          </div>
          {transcript && (
            <p className="mt-2 text-green-400 text-sm">
              Seçilen dosya: <span className="font-semibold">{transcript.name}</span>
            </p>
          )}
        </div>

        {/* Başlat Butonu */}
        <div className="text-center mb-10">
          <button
            onClick={handleFileUpload}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded"
          >
            🔍 Eşleştirmeyi Başlat
          </button>
        </div>

        {/* Sonuç Kartları */}
        {[{
          title: "✅ Uyumlu Dersler",
          items: matchedCourses,
          color: "green"
        }, {
          title: "❌ Uyumsuz Dersler",
          items: unmatchedCourses,
          color: "red"
        }].map(({ title, items, color }, i) => (
          <div key={i} className={`mb-8 p-4 border border-${color}-500 bg-${color}-700 bg-opacity-20 rounded`}>
            <h3 className={`text-lg font-bold text-${color}-400 mb-4`}>{title}</h3>
            {items.length === 0 ? (
              <p className="text-gray-400">Henüz sonuç yok.</p>
            ) : (
              <ul className="list-disc ml-4 space-y-1">
                {items.map((c, i) => (
                  <li key={i}>{c.courseCode} - {c.courseName}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YatayGecisScreen;
