using System.Collections.Generic;
using System.Linq;
using FuzzySharp;
using yaz_okulu_backend.Models;
using yaz_okulu_backend.Models.DTOs;

namespace yaz_okulu_backend.Services
{
    public class CourseMatcherService
{
    public MatchResultDto Match(List<TranscriptCourseDto> transcriptCourses, List<YgCourse> targetCourses)
    {
        var matched = new List<YgCourse>();
        var unmatched = new List<YgCourse>();

        foreach (var target in targetCourses)
        {
           var match = transcriptCourses.FirstOrDefault(transcript =>
{
    var code1 = transcript.CourseCode?.Trim().ToUpperInvariant();
    var code2 = target.CourseCode?.Trim().ToUpperInvariant();

    // Kodlar birebir aynıysa direkt eşle
    if (!string.IsNullOrEmpty(code1) && !string.IsNullOrEmpty(code2) && code1 == code2)
        return true;

    // Diğer kontroller (isim, kredi, AKTS)
    int similarity = Fuzz.TokenSetRatio(transcript.CourseName.ToLower(), target.CourseName.ToLower());
    bool krediUyumlu = Math.Abs(transcript.Kredi - target.Kredi) <= 1;
    bool aktsUyumlu = Math.Abs(transcript.Akts - target.Akts) <= 1;

    return similarity >= 70 && krediUyumlu && aktsUyumlu;
});

            if (match != null)
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

    private bool IsCourseCodeMatch(string code1, string code2)
    {
        return !string.IsNullOrWhiteSpace(code1) &&
               !string.IsNullOrWhiteSpace(code2) &&
               code1.Trim().ToUpperInvariant() == code2.Trim().ToUpperInvariant();
    }
}


    }

