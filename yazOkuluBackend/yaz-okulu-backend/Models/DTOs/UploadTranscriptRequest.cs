using Microsoft.AspNetCore.Http;

namespace yaz_okulu_backend.Models.DTOs
{
    public class UploadTranscriptRequest
    {
        public IFormFile File { get; set; } = null!;
        public int DepartmentId { get; set; }
        public int Semester { get; set; }
    }
}
