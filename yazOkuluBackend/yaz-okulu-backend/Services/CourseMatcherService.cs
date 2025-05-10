using System.Collections.Generic;
using System.Linq;
using yaz_okulu_backend.Models;
using yaz_okulu_backend.Models.DTOs;
using FuzzySharp;





public class CourseMatcherService
{
    public MatchResultDto Match(List<TranscriptCourseDto> transcriptCourses, List<YgCourse> targetCourses)
    {
        var matched = new List<YgCourse>();
        var unmatched = new List<YgCourse>();

        foreach (var target in targetCourses)
        {
            var match = transcriptCourses.FirstOrDefault(tc =>
                tc.CourseCode.Equals(target.CourseCode, StringComparison.OrdinalIgnoreCase) || (
                    Math.Abs(tc.Kredi - target.Kredi) <= 1 &&
                    Math.Abs(tc.Akts - target.Akts) <= 1 &&
                    Fuzz.PartialRatio(tc.CourseName.ToLower(), target.CourseName.ToLower()) >= 70
                )
            );

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
}
