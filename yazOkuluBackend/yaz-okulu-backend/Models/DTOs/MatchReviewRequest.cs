namespace yaz_okulu_backend.Models.Dto
{
    public class MatchReviewRequest
    {
        public string University { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int Semester { get; set; }
        public List<TranscriptCourseDto> UnmatchedCourses { get; set; } = new();
    }

    public class TranscriptCourseDto
    {
        public string CourseCode { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
    }
}
