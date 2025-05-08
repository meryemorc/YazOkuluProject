import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { getDocument } from "pdfjs-dist";
import { parseTranscriptLines } from "../utils/pdfParser";
import { matchCourses } from "../utils/matcher";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

GlobalWorkerOptions.workerSrc = pdfjsWorker;


const YatayGecisScreen = () => {
  const [transcript, setTranscript] = useState(null);
  const [transcriptLines, setTranscriptLines] = useState([]);
  const [parsedTranscriptCourses, setParsedTranscriptCourses] = useState([]);
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

  const handlePdfUpload = async (file) => {
    setTranscript(file);
    const fileReader = new FileReader();
  
    fileReader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await getDocument(typedarray).promise;
      let allText = "";
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        allText += strings.join(" ") + "\n";
      }
  
      const lines = allText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
  
      setTranscriptLines(lines);
      console.log("📄 PDF içeriği:", lines);
  
      const parsed = parseTranscriptLines(lines); // 🔹 BURASI KRİTİK
      setParsedTranscriptCourses(parsed);         // 🔹 BUNU EKLEMEZSEN eşleşme yapılmaz
  
      console.log("📄 Transkript dersleri:", parsed);
    };
  
    fileReader.readAsArrayBuffer(file);
  };
  

  const handleMatchCourses = () => {
    console.log("🚀 parsedTranscriptCourses:", parsedTranscriptCourses);
    console.log("🎯 hedef courses:", courses);
  
    if (!parsedTranscriptCourses || parsedTranscriptCourses.length === 0 || !courses || courses.length === 0){
      alert("Dersler veya transkript eksik.");
      return;
    }
  
    const { matched, unmatched } = matchCourses(parsedTranscriptCourses, courses);
    setMatchedCourses(matched);
    setUnmatchedCourses(unmatched);
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Yatay Geçiş Başvurusu
        </h2>

        {/* Dropdownlar */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block mb-1 text-sm font-medium">🎓 Üniversite</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">🏛️ Fakülte</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              disabled={!faculties.length}
            >
              <option value="">Seçiniz</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">🏫 Bölüm</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={!departments.length}
            >
              <option value="">Seçiniz</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">🎯 Sınıf</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              disabled={!semesters.length}
            >
              <option value="">Seçiniz</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}. Dönem</option>
              ))}
            </select>
          </div>
        </div>

        {/* Başlat Butonu */}
        <div className="text-center mb-10">
          <button
            onClick={handleMatchCourses}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded"
          >
            🔍 Eşleştirmeyi Başlat
          </button>
        </div>

        {/* Scrollable Ders Tablosu */}
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
                  courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-2">{course.courseCode}</td>
                  <td className="px-4 py-2">{course.courseName}</td>
                  <td className="px-4 py-2">{course.kredi}</td>
                  <td className="px-4 py-2">{course.akts}</td>
                  <td className="px-4 py-2">{course.semester}. dönem</td>
                </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-12">
  <h3 className="text-xl font-semibold mb-4">📄 Transkript Dosyası Yükle</h3>
  <div className="flex items-center justify-center w-full">
  <label
    htmlFor="dropzone-file"
    className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition"
  >
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg
        className="w-8 h-8 mb-4 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.2 5.02C5.14 5.02 5.07 5 5 5a4 4 0 0 0 0 8h2.2M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-2 text-sm text-gray-400">
        <span className="font-semibold">PDF dosyasını yükleyin</span>
      </p>
      <p className="text-xs text-gray-400">Sadece PDF (Max: 2MB)</p>
    </div>

    {/* ✅ Tek ve temiz input alanı */}
    <input
      id="dropzone-file"
      type="file"
      accept="application/pdf"
      className="hidden"
      onChange={(e) => handlePdfUpload(e.target.files[0])}
    />
  </label>
</div>


  {/* Dosya adı gösterme */}
  {transcript && (
    <p className="mt-2 text-green-400 text-sm">
      Seçilen dosya: <span className="font-semibold">{transcript.name}</span>
    </p>
  )}
</div>

        {/* Uyumlu/Uyumsuz Ders Kartları */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-700 bg-opacity-20 border border-green-500 rounded p-4">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ Uyumlu Dersler</h3>
            {matchedCourses.length === 0 ? (
              <p className="text-gray-400">Henüz eşleşen ders yok.</p>
            ) : (
              <ul className="list-disc ml-4 space-y-1">
                {matchedCourses.map((c, i) => (
                  <li key={i}>{c.courseCode} - {c.courseName}</li>

                ))}
              </ul>
            )}
          </div>

          <div className="bg-red-700 bg-opacity-20 border border-red-500 rounded p-4">
            <h3 className="text-lg font-bold text-red-400 mb-4">❌ Uyumsuz Dersler</h3>
            {unmatchedCourses.length === 0 ? (
              <p className="text-gray-400">Henüz uyumsuz ders yok.</p>
            ) : (
              <ul className="list-disc ml-4 space-y-1">
                {unmatchedCourses.map((c, i) => (
                  <li key={i}>{c.courseCode} - {c.courseName}</li>

                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YatayGecisScreen;
