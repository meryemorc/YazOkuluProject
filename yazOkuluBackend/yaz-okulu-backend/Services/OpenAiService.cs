using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace yaz_okulu_backend.Services
{
    public class OpenAiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public OpenAiService(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _apiKey = configuration["OpenAI:ApiKey"];
        }

        public async Task<string> GetChatbotResponse(string message)
{
    var requestData = new
    {
        model = "gpt-3.5-turbo",
        messages = new[]
        {
            new { role = "system", content = "Sen bir ders denklik danışmanısın. Kullanıcının sorduğu dersi açıklayıcı şekilde eşleştir." },
            new { role = "user", content = message }
        }
    };

    var requestJson = JsonSerializer.Serialize(requestData);
    var content = new StringContent(requestJson, Encoding.UTF8, "application/json");
    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

    var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);

    var responseString = await response.Content.ReadAsStringAsync();

    // 🔍 Hata kontrolü: API başarısız dönerse detaylı log
    if (!response.IsSuccessStatusCode)
    {
        Console.WriteLine("❌ OpenAI HATASI:");
        Console.WriteLine($"Status: {response.StatusCode}");
        Console.WriteLine(responseString); // burada ne hata dönmüş görürüz
        return $"OpenAI API Hatası: {response.StatusCode} - {responseString}";
    }

    // ✅ JSON parse
    try
    {
        using var doc = JsonDocument.Parse(responseString);
        var result = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return result ?? "Cevap alınamadı.";
    }
    catch (Exception ex)
    {
        Console.WriteLine("❌ JSON Parse hatası:");
        Console.WriteLine(ex.Message);
        return "Chatbot cevabı işlenemedi.";
    }
}


    }
}
