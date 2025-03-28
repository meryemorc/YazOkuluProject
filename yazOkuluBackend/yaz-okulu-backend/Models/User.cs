using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("users")]
public class User
{
    [Key]
    [Column("id")]
    public int Id { get; set; }  

    [Required]
    [MaxLength(255)]
    [Column("full_name")]
    public string FullName { get; set; } = string.Empty;  

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;  

    [Required]
    [MaxLength(50)]
    [RegularExpression("^(student|assistant|admin)$", ErrorMessage = "Geçersiz rol. 'student', 'assistant' veya 'admin' olmalıdır.")]
    [Column("role")]
    public string Role { get; set; } = "student";  

    [ForeignKey("Department")]
    [Column("department_id")]
    public int? DepartmentId { get; set; }  

    [JsonIgnore] // 🔥 GET isteklerinde password'ü gizleyecek
    [Required]
    [MinLength(8, ErrorMessage = "Şifre en az 8 karakter olmalıdır.")]
    [Column("password_hash")]
    public string Password { get; set; } = string.Empty;  

    // Navigation Property
    public Department? Department { get; set; }  
}
