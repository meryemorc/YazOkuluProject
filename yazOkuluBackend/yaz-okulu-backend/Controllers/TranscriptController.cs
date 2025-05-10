using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Services;
using yaz_okulu_backend.Models;
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
public async Task<IActionResult> UploadTranscript([FromForm] UploadTranscriptRequest request)
{
    if (request.File == null || request.File.Length == 0)
        return BadRequest("Dosya yüklenemedi.");

    try
    {
        var result = await _transcriptService.ProcessTranscript(
            request.File.OpenReadStream(),
            request.DepartmentId,
            request.Semester);

        return Ok(result); // MatchResultDto dönüyor
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"İşlem sırasında hata oluştu: {ex.Message}");
    }
}

    }
}
 