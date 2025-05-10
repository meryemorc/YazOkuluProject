namespace yaz_okulu_backend.Models.DTOs
{
    public class MatchResultDto
    {
        public List<YgCourse> Matched { get; set; } = new();
        public List<YgCourse> Unmatched { get; set; } = new();
    }
}
