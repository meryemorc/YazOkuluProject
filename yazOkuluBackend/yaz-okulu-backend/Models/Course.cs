using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("courses")]
public class Course
{
    [Key]
    public int id { get; set; }  // Birincil anahtar (Primary Key)

    [Required]
    [MaxLength(50)]
    public string course_code { get; set; } = string.Empty;  // Ders kodu

    [Required]
    [MaxLength(255)]
    public string course_name { get; set; } = string.Empty;  // Ders adı

    [Required]
    public int kredi { get; set; }  // Kredi

    [Required]
    public int akts { get; set; }  // AKTS

    [ForeignKey("Department")]
    public int department_id { get; set; }  // Bölüm ile ilişki

    // Navigation Property
    public Department? Department { get; set; }  // Bölüm ile ilişki
}
