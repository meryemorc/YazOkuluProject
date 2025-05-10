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
                    transcript.CourseCode.Equals(target.CourseCode, System.StringComparison.OrdinalIgnoreCase) || (
                        Math.Abs(transcript.Kredi - target.Kredi) <= 1 &&
                        Math.Abs(transcript.Akts - target.Akts) <= 1 &&
                        Fuzz.Ratio(transcript.CourseName.ToLower(), target.CourseName.ToLower()) >= 70
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
}
