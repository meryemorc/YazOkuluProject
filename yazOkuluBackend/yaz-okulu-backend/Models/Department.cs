using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("deparments")]
public class Department
{
    [Key]
    public int id { get; set; }  // Birincil anahtar (Primary Key)

    [Required]
    [MaxLength(255)]
    public string name { get; set; } = string.Empty;  // Bölüm adı

    [ForeignKey("Faculty")]
    public int faculty_id { get; set; }  // Fakülte ile ilişki

    // Navigation Property
    public Faculty? Faculty { get; set; }  // Fakülte ile ilişki
}
