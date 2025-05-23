import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ChatDrawer from "../components/Chatdrawer";


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

  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [misplacedCourses, setMisplacedCourses] = useState([]);




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
  if (!transcript || !department || !semester) {
    alert("Lütfen önce transkript, bölüm ve dönem bilgisini giriniz.");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("file", transcript);
  formData.append("departmentId", department);
  formData.append("semester", semester);

  try {
    const response = await axios.post("/api/Transcript/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { matched, unmatched } = response.data;
    setMatchedCourses(matched);
    setUnmatchedCourses(unmatched);

    console.log("✅ Eşleşen dersler:", matched);
    console.log("❌ Uyumsuz dersler:", unmatched);
  } catch (err) {
    console.error("Yükleme hatası:", err.response?.data || err.message);
    alert("Eşleştirme başarısız. Konsolu kontrol edin.");
  } finally {
    setLoading(false);
  }
};


  const colorClasses = {
    green: {
      border: "border-green-500",
      bg: "bg-green-700 bg-opacity-20",
      text: "text-green-400",
    },
    red: {
      border: "border-red-500",
      bg: "bg-red-700 bg-opacity-20",
      text: "text-red-400",
    },
  };
  const handleFinalReview = async () => {
  try {
    const universityName = universities.find(u => u.id === parseInt(university))?.name;
    const departmentName = departments.find(d => d.id === parseInt(department))?.name;

    const response = await axios.post("/api/chatbot/final-review", {
      university: universityName,
      department: departmentName,
      semester: parseInt(semester),
      departmentId: parseInt(department),
      unmatchedCourses: unmatchedCourses.map(c => `${c.courseCode} - ${c.courseName}`)
    });

    const botText = response.data.response;

    // Chatbot mesajından dersleri ayıklama
    const matches = botText.match(/- ([A-ZÇĞİÖŞÜ0-9]+) - (.+?)(?=\n|$)/g);

    const parsed = matches?.map(line => {
      const [code, name] = line.replace("- ", "").split(" - ");
      return { courseCode: code.trim(), courseName: name.trim() };
    }) || [];

    // ChatDrawer'ı açma, sadece sarı kartı göster
    setMisplacedCourses(parsed);

  } catch (err) {
    console.error("Final review hatası:", err);
    alert("Chatbot karşılaştırması başarısız.");
  }
};






  return (
    <div className="min-h-screen bg-[#F7FDFB] text-[#143D60] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Yatay Geçiş Başvurusu</h2>

        {/* Dropdownlar */}
       <div className="grid md:grid-cols-4 gap-4 mb-8">
  {[
    {
      label: "🎓 Üniversite",
      value: university,
      onChange: setUniversity,
      options: universities
    },
    {
      label: "🏛️ Fakülte",
      value: faculty,
      onChange: setFaculty,
      options: faculties,
      disabled: !faculties.length
    },
    {
      label: "🏫 Bölüm",
      value: department,
      onChange: setDepartment,
      options: departments,
      disabled: !departments.length
    },
    {
      label: "🎯 Sınıf",
      value: semester,
      onChange: setSemester,
      options: semesters.map(s => ({ id: s, name: `${s}. Dönem` })),
      disabled: !semesters.length
    }
  ].map(({ label, value, onChange, options, disabled = false }, i) => (
    <div key={i}>
      <label className="block mb-1 text-sm font-medium text-[#143D60]">{label}</label>
      <select
        className="w-full p-2 border border-[#90D1CA] bg-white text-[#143D60] rounded focus:outline-none focus:ring-2 focus:ring-[#2D9596]"
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
  <h3 className="text-xl font-semibold mb-2 text-[#2D9596]">
    📘 Seçilen Döneme Kadar Tüm Dersler
  </h3>

  <div className="overflow-y-auto max-h-[400px] rounded border border-[#90D1CA]">
    <table className="min-w-full table-auto text-left text-sm text-[#143D60]">
      <thead className="bg-[#90D1CA] text-white sticky top-0 z-10">
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
            <td colSpan="5" className="text-center py-4 text-[#9CAFAA]">
              Ders bulunamadı.
            </td>
          </tr>
        ) : (
          courses.map((c) => (
            <tr key={c.id} className="hover:bg-[#E0F2F1] transition">
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
{/* Dosya Yükleme */}
<div className="mb-12">
  <h3 className="text-xl font-semibold mb-4 text-[#2D9596]">📄 Transkript Dosyası Yükle</h3>
  <div className="flex items-center justify-center w-full">
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-[#90D1CA] rounded-lg cursor-pointer bg-white hover:bg-[#E0F2F1] transition"
    >
      <p className="mb-2 text-sm text-[#143D60] font-semibold">PDF dosyasını yükleyin</p>
      <p className="text-xs text-[#90A4AE]">Sadece PDF (Max: 2MB)</p>
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
    <p className="mt-2 text-green-600 text-sm">
      Seçilen dosya: <span className="font-semibold">{transcript.name}</span>
    </p>
  )}
</div>

{/* Başlat ve Chatbot Butonları */}
<div className="flex justify-center gap-4 mb-10">
  <button
    onClick={handleFileUpload}
    disabled={loading}
    className={`px-6 py-2 font-semibold rounded transition ${
      loading
        ? "bg-gray-400 cursor-not-allowed text-white"
        : "bg-[#077A7D] hover:bg-[#066467] text-white"
    }`}
  >
    {loading ? "Eşleştiriliyor..." : "🔍 Manuel Eşleştirme"}
  </button>

  <button
    onClick={() => setChatOpen(true)}
    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded transition"
  >
    🤖 SummerSchoolAsistan
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
          <div key={i} className={`mb-8 p-4 rounded overflow-y-auto max-h-64 ${colorClasses[color].border} ${colorClasses[color].bg}`}>
            <h3 className={`text-lg font-bold mb-4 ${colorClasses[color].text}`}>{title}</h3>
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
{unmatchedCourses.length > 0 && (
  <div className="flex justify-center mb-10">
    <button
      onClick={handleFinalReview}
      className="px-6 py-2 bg-[#077A7D] hover:bg-[#066467] text-white font-semibold rounded transition"
    >
      🤖 Son Kontrol: Chatbotla Karşılaştır
    </button>
  </div>
)}

{misplacedCourses && (
  <div className="mb-8 p-4 rounded overflow-y-auto max-h-64 border border-[#FFD95A] bg-[#FFFBEA]">
    <h3 className="text-lg font-bold mb-4 text-[#E7B93E]">
      ⚠️ Chatbot’a Göre Yanlış Eşleşmiş Dersler
    </h3>

    {misplacedCourses.length === 0 ? (
      <p className="text-[#9CAFAA]">Chatbot’a göre yanlış eşleşmiş ders bulunamadı.</p>
    ) : (
      <ul className="list-disc ml-4 space-y-1 text-[#143D60]">
        {misplacedCourses.map((c, i) => (
          <li key={i}>{c.courseCode} - {c.courseName}</li>
        ))}
      </ul>
    )}
  </div>
)}

{/* ✅ CHATBOT PANELİ */}
<ChatDrawer
  open={chatOpen}
  onClose={() => setChatOpen(false)}
  chat={chat}
  setChat={setChat}
/>

      </div>
    </div>
  );
};

export default YatayGecisScreen;
