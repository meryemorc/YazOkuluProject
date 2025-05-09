using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UglyToad.PdfPig;
using yaz_okulu_backend.Models;
using yaz_okulu_backend.Models.DTOs;
using yaz_okulu_backend.Models.Context;

namespace yaz_okulu_backend.Services
{
    public interface ITranscriptService
    {
        Task<MatchResultDto> ProcessTranscript(Stream pdfStream, int departmentId, int semester);
    }

    public class TranscriptService : ITranscriptService
    {
        private readonly ApplicationDbContext _context;

        public TranscriptService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MatchResultDto> ProcessTranscript(Stream pdfStream, int departmentId, int semester)
        {
            // 1. PDF'ten satırları oku
            var lines = ExtractLinesFromPdf(pdfStream);

            // 2. Satırlardan transkript derslerini ayrıştır
            var parsedCourses = ParseTranscriptLines(lines);

            // 3. Veritabanından hedef dersleri al (seçilen bölüm ve sınıfa kadar)
            var targetCourses = _context.YgCourses
                .Where(c => c.DepartmentId == departmentId && c.Semester <= semester)
                .ToList();

            // 4. Eşleştirme yap
            var matched = new List<YgCourse>();
            var unmatched = new List<YgCourse>();

            foreach (var target in targetCourses)
            {
                bool found = parsedCourses.Any(tc =>
                    tc.CourseCode.ToLower() == target.CourseCode.ToLower() ||
                    tc.CourseName.ToLower().Contains(target.CourseName.ToLower()));

                if (found)
                    matched.Add(target);
                else
                    unmatched.Add(target);
            }

            return new MatchResultDto
            {
                Matched = matched,
                Unmatched = unmatched
            };
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
                            lines.Add(line.Trim());
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
