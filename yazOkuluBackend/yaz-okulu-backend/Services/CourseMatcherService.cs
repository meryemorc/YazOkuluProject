using System.Collections.Generic;
using System.Linq;
using yaz_okulu_backend.Models;
using yaz_okulu_backend.Models.DTOs;




public class CourseMatcherService
{
    public MatchResultDto Match(List<TranscriptCourseDto> transcriptCourses, List<YgCourse> targetCourses)
    {
        var matched = new List<YgCourse>();
        var unmatched = new List<YgCourse>();

        foreach (var target in targetCourses)
        {
            var match = transcriptCourses.FirstOrDefault(t =>
                t.CourseCode.Equals(target.CourseCode, System.StringComparison.OrdinalIgnoreCase) ||
                t.CourseName.ToLower().Contains(target.CourseName.ToLower())
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
