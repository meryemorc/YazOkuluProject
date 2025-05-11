using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UglyToad.PdfPig;
using yaz_okulu_backend.Models.DTOs;

namespace yaz_okulu_backend.Services
{
    public interface ITranscriptService
    {
        Task<MatchResultDto> ProcessTranscript(Stream pdfStream, int departmentId, int semester);
    }

    public class TranscriptService : ITranscriptService
    {
        private readonly TranscriptParserService _parserService;
        private readonly YgCourseService _ygCourseService;
        private readonly CourseMatcherService _matcherService;

        public TranscriptService(
            TranscriptParserService parserService,
            YgCourseService ygCourseService,
            CourseMatcherService matcherService)
        {
            _parserService = parserService;
            _ygCourseService = ygCourseService;
            _matcherService = matcherService;
        }

        public async Task<MatchResultDto> ProcessTranscript(Stream fileStream, int departmentId, int semester)
        {
            Console.WriteLine("📥 Transkript işleme başladı...");

            // PDF'ten satırları al
            var lines = ExtractLinesFromPdf(fileStream);

            Console.WriteLine("📄 PDF'ten okunan toplam satır: " + lines.Count);
            foreach (var line in lines)
                Console.WriteLine("🧾 SATIR: " + line);

            // Satırları parser'a gönder
            var parsedCourses = _parserService.Parse(lines);
            Console.WriteLine($"📚 Parse edilen ders sayısı: {parsedCourses.Count}");

            // Veritabanındaki hedef dersleri çek
            var targetCourses = await _ygCourseService.GetByDepartmentAndSemester(departmentId, semester);
            Console.WriteLine($"🎯 Veritabanından alınan hedef ders sayısı: {targetCourses.Count}");

            // Eşleştir
            var result = _matcherService.Match(parsedCourses, targetCourses);
            Console.WriteLine($"🔗 Eşleşen: {result.Matched.Count}, Eşleşmeyen: {result.Unmatched.Count}");

            return result;
        }

        // 🔍 PDF'ten satırları çıkaran fonksiyon
        private List<string> ExtractLinesFromPdf(Stream pdfStream)
{
    var lines = new List<string>();

    using (var document = PdfDocument.Open(pdfStream))
    {
        foreach (var page in document.GetPages())
        {
            var currentLine = "";

            foreach (var word in page.GetWords())
            {
                var text = word.Text.Trim();

                if (text.EndsWith("-")) // satır sonu olabilir
                {
                    currentLine += text.Substring(0, text.Length - 1);
                    lines.Add(currentLine.Trim());
                    currentLine = "";
                }
                else if (text.Contains("\n") || text.Contains("\r"))
                {
                    currentLine += " " + text;
                    lines.Add(currentLine.Trim());
                    currentLine = "";
                }
                else
                {
                    currentLine += " " + text;
                }
            }

            // Satır tamamlandıysa ekle
            if (!string.IsNullOrWhiteSpace(currentLine))
            {
                lines.Add(currentLine.Trim());
            }
        }
    }

    Console.WriteLine("📄 PDF'ten okunan toplam satır: " + lines.Count);
    return lines;
}

    }
}
