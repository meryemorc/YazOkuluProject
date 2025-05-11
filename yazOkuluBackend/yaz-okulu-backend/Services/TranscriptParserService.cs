using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using yaz_okulu_backend.Models.DTOs;

public class TranscriptParserService
{
    public List<TranscriptCourseDto> Parse(List<string> lines)
    {
        var parsedCourses = new List<TranscriptCourseDto>();

        // Her satırda birden fazla ders olabilir → tek tek ayıklamak için MatchCollection kullanıyoruz
        var coursePattern = new Regex(@"(?<Code>[A-ZÇĞİÖŞÜ]{2,}\d{3})\s+(?<Name>[A-ZÇĞİÖŞÜa-zçğıöşü \.\-]+?)\s+(?<Credit>\d+)\s+(?<Akts>\d+)\s+(?<Grade>[0-9]+,[0-9]+)");

        foreach (var line in lines)
        {
            Console.WriteLine("🧾 SATIR: " + line);

            var matches = coursePattern.Matches(line);

            foreach (Match match in matches)
            {
                var code = match.Groups["Code"].Value.Trim();
                var name = match.Groups["Name"].Value.Trim();
                var kredi = int.Parse(match.Groups["Credit"].Value);
                var akts = int.Parse(match.Groups["Akts"].Value);

                parsedCourses.Add(new TranscriptCourseDto
                {
                    CourseCode = code,
                    CourseName = name,
                    Kredi = kredi,
                    Akts = akts
                });

                Console.WriteLine($"✅ EŞLEŞTİ: {code} - {name} | Kredi: {kredi}, AKTS: {akts}");
            }

            if (matches.Count == 0)
                Console.WriteLine("❌ EŞLEŞMEDİ ❌");
        }

        Console.WriteLine($"🔚 TOPLAM DERS BULUNDU: {parsedCourses.Count}");
        return parsedCourses;
    }
}
