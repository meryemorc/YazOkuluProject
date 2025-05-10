using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UglyToad.PdfPig;
using yaz_okulu_backend.Models;
using yaz_okulu_backend.Models.DTOs;


namespace yaz_okulu_backend.Services
{
    public interface ITranscriptService
    {
        Task<MatchResultDto> ProcessTranscript(Stream pdfStream, int departmentId, int semester);
    }

    public class TranscriptService : ITranscriptService
    {
        private readonly ApplicationDbContext _context;
        private readonly CourseMatcherService _matcher;

        public TranscriptService(ApplicationDbContext context, CourseMatcherService matcher)
        {
            _context = context;
            _matcher = matcher;
        }

        public async Task<MatchResultDto> ProcessTranscript(Stream pdfStream, int departmentId, int semester)
        {
            // 1. PDF'ten satırları oku
            var lines = ExtractLinesFromPdf(pdfStream);

            // 2. Satırlardan transkript derslerini ayrıştır
            var parsedCourses = ParseTranscriptLines(lines);

            // 3. Veritabanından hedef dersleri al (seçilen bölüm ve sınıfa kadar)
            var targetCourses = _context.yatay_gecis_courses
                .Where(c => c.DepartmentId == departmentId && c.Semester <= semester)
                .ToList();

            // 4. Eşleştirme yap
            var result = _matcher.Match(parsedCourses, targetCourses);

            return result;
        }

        private List<string> ExtractLinesFromPdf(Stream pdfStream)
        {
            var lines = new List<string>();

            using (var pdf = PdfDocument.Open(pdfStream))
            {
                foreach (var page in pdf.GetPages())
                {
                    string[] pageLines = page.Text.Split('\n', '\r');
                    foreach (var line in pageLines)
                    {
                        if (!string.IsNullOrWhiteSpace(line))
                        {
                            var trimmed = line.Trim();
                            Console.WriteLine("📄 Satır: " + trimmed); // 🔍 Log satırı
                            lines.Add(trimmed);
                        }
                    }
                }
            }

            return lines;
        }

        private List<TranscriptCourseDto> ParseTranscriptLines(List<string> lines)
        {
            var result = new List<TranscriptCourseDto>();
            var regex = new System.Text.RegularExpressions.Regex(@"^([A-Z]{2,}\d{3,})\s+(.+?)\s+(\d+)\s+(\d+)\s+\d+(?:[.,]\d+)?\s+[A-Z]{2}$");

            foreach (var line in lines)
            {
                var match = regex.Match(line);
                if (match.Success)
                {
                    result.Add(new TranscriptCourseDto
                    {
                        CourseCode = match.Groups[1].Value.Trim(),
                        CourseName = match.Groups[2].Value.Trim(),
                        Kredi = int.Parse(match.Groups[3].Value),
                        Akts = int.Parse(match.Groups[4].Value)
                    });
                }
            }

            return result;
        }
    }
}
