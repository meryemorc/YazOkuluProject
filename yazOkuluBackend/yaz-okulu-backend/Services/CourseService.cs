using System.Net.Http;
using System.Text.Json;
using yaz_okulu_backend.DTOs;

public class CourseService
{
    private readonly HttpClient _httpClient;

    public CourseService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<CourseDto>> GetCoursesByDepartmentAndSemester(int departmentId, int semester)
    {
        var response = await _httpClient.GetAsync($"/api/YgCourse/ByDepartment/{departmentId}");

        if (!response.IsSuccessStatusCode)
            throw new Exception("Ders bilgileri alınamadı.");

        var json = await response.Content.ReadAsStringAsync();
        var allCourses = JsonSerializer.Deserialize<List<CourseDto>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        return allCourses!.Where(c => c.Semester <= semester).ToList();
    }
}
