namespace yaz_okulu_backend.DTOs
{
    public class CourseEvaluationRequest
    {
        public int UniversityId { get; set; }
        public int FacultyId { get; set; }
        public int DepartmentId { get; set; }
        public int Semester { get; set; }
        public string CourseName { get; set; }
    }
}
