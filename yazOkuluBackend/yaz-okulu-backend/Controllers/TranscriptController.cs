using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Services;
using yaz_okulu_backend.Models.DTOs;

namespace yaz_okulu_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TranscriptController : ControllerBase
    {
        private readonly ITranscriptService _transcriptService;

        public TranscriptController(ITranscriptService transcriptService)
        {
            _transcriptService = transcriptService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadTranscript([FromForm] IFormFile file, [FromQuery] int departmentId, [FromQuery] int semester)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Dosya yüklenemedi.");

            try
            {
                var result = await _transcriptService.ProcessTranscript(file.OpenReadStream(), departmentId, semester);
                return Ok(result); // result -> MatchResultDto
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"İşlem sırasında hata oluştu: {ex.Message}");
            }
        }
    }
}
