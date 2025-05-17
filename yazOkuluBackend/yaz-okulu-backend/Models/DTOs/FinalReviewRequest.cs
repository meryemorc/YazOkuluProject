namespace yaz_okulu_backend.DTOs
{
    public class FinalReviewRequest
    {
        public string University { get; set; }
        public string Department { get; set; }
        public int Semester { get; set; }
        public int DepartmentId { get; set; }
        public List<string> UnmatchedCourses { get; set; }
    }
}
