using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Services;

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatbotController : ControllerBase
    {
        private readonly OpenAiService _openAiService;

        public ChatbotController(OpenAiService openAiService)
        {
            _openAiService = openAiService;
        }

        [HttpPost]
        public async Task<IActionResult> GetAnswer([FromBody] ChatRequestDto request)
        {
            var response = await _openAiService.GetChatbotResponse(request.Message);
            return Ok(new { response });
        }
    }

    public class ChatRequestDto
    {
        public string Message { get; set; }
    }
    
}
