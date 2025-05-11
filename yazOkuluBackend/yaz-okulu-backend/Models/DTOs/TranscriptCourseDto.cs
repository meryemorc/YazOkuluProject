namespace yaz_okulu_backend.Models.DTOs
{
    public class TranscriptCourseDto
    {
        public string CourseCode { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
        public int Kredi { get; set; }
        public int Akts { get; set; }
    }
}
