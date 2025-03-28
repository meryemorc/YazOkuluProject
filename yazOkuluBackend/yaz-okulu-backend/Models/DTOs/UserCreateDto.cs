namespace yaz_okulu_backend.Models.DTOs;

public class UserCreateDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public int? DepartmentId { get; set; }
    public string Password { get; set; } = string.Empty; // Sadece POST için olacak
}
