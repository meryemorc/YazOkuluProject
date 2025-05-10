using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using yaz_okulu_backend.Models;
using yaz_okulu_backend.Models.DTOs;




public class TranscriptParserService
{
    public List<TranscriptCourseDto> Parse(List<string> lines)
    {
        var result = new List<TranscriptCourseDto>();

        var regex = new Regex(@"^([A-ZÇĞİÖŞÜ]{3,}\d{3,})\s+(.+?)\s+(\d+)\s+(\d+)\s+\d+[,\.]?\d*\s+[A-Z]{2}$");

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
