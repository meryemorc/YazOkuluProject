using System;
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
                // 1. Kod birebir eşleşiyorsa => Denk
                if (IsCourseCodeMatch(transcript.CourseCode, target.CourseCode))
                    return true;

                // 2. Kod eşleşmiyorsa => Ad benzerliğine bak (daha katı eşik)
                int similarity = Fuzz.TokenSetRatio(
                    NormalizeName(transcript.CourseName),
                    NormalizeName(target.CourseName));

                Console.WriteLine($"🔍 Ad benzerliği: \"{transcript.CourseName}\" vs \"{target.CourseName}\" = {similarity}");

                return similarity >= 70; // ad benzerliği sadece kod tutmazsa devreye giriyor
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
        return NormalizeCode(code1) == NormalizeCode(code2);
    }

    private string NormalizeCode(string code)
    {
        if (string.IsNullOrWhiteSpace(code)) return "";
        return new string(code.Where(char.IsLetterOrDigit).ToArray()).ToUpperInvariant();
    }

    private string NormalizeName(string name)
    {
        if (string.IsNullOrWhiteSpace(name)) return "";
        return name
            .ToLowerInvariant()
            .Replace("-", " ")
            .Replace(".", "")
            .Replace("–", " ")
            .Replace("ı", "i")  // Türkçe küçük "ı" yerine "i"
            .Replace("İ", "i")  // Türkçe büyük "İ" yerine "i"
            .Trim();
    }
}
}