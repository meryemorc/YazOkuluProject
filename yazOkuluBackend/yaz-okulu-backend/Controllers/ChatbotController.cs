using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Services;
using yaz_okulu_backend.DTOs;
using System.Linq;

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatbotController : ControllerBase
    {
        private readonly OpenAiService _openAiService;
        private readonly CourseService _courseService;

        public ChatbotController(OpenAiService openAiService, CourseService courseService)
        {
            _openAiService = openAiService;
            _courseService = courseService;
        }

        // 🟣 1. Genel sohbet mesajı
        [HttpPost]
        public async Task<IActionResult> GetAnswer([FromBody] ChatRequestDto request)
        {
            var response = await _openAiService.GetChatbotResponse(request.Message);
            return Ok(new { response });
        }

        // 🟣 2. Tek ders analizi
        [HttpPost("evaluate-course")]
        public async Task<IActionResult> EvaluateCourse([FromBody] CourseEvaluationRequest request)
        {
            var courses = await _courseService.GetCoursesByDepartmentAndSemester(request.DepartmentId, request.Semester);
            var courseList = string.Join("\n", courses.Select(c => $"{c.CourseCode} - {c.CourseName}"));

            var prompt = $"""
Kullanıcı {request.UniversityId} üniversitesinde {request.FacultyId} fakültesi, {request.DepartmentId} bölümünde {request.Semester}. dönemde.
Kullanıcının incelediği ders: {request.CourseName}

Aşağıdaki ders listesine göre bu dersin eşleşip eşleşmediğini analiz et. Yanlışlıkla gözden kaçmışsa öner:
{courseList}
""";

            var response = await _openAiService.GetChatbotResponse(prompt);
            return Ok(new { response });
        }

        // 🟣 3. Final review için tüm eşleşmeleri analiz et
        [HttpPost("final-review")]
        public async Task<IActionResult> FinalReview([FromBody] FinalReviewRequest dto)
        {
            var courses = await _courseService.GetCoursesByDepartmentAndSemester(dto.DepartmentId, dto.Semester);
            var courseList = string.Join("\n", courses.Select(c => $"{c.CourseCode} - {c.CourseName}"));
            var unmatchedList = string.Join("\n", dto.UnmatchedCourses);

            var prompt = $"""
Kullanıcı {dto.University} - {dto.Department} bölümünde {dto.Semester}. döneme kadar olan dersleri okudu. 
Aşağıdaki dersler, sistem tarafından uyumsuz olarak işaretlendi:

{unmatchedList}

Ancak bu bölümün tüm dersleri şunlardır:
{courseList}

Lütfen sistemin neden bu dersleri uyumsuz bulduğunu analiz et. Gözden kaçmış eşleşebilecek dersler varsa öner.
""";

            var response = await _openAiService.GetChatbotResponse(prompt);
            return Ok(new { response });
        }

        // 🟣 DTO iç içe
        public class ChatRequestDto
        {
            public string Message { get; set; }
        }
    }
}
