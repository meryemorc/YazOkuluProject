using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("faculties")]
public class Faculty
{
    [Key]
    public int id { get; set; }  // Birincil anahtar (Primary Key)

    [Required]
    [MaxLength(255)]
    public string name { get; set; } = string.Empty;  // Fakülte adı

    [ForeignKey("University")]
    public int university_id { get; set; }  // Üniversite ile ilişki

    public string? whatsapp_link { get; set; }  // WhatsApp linki opsiyonel (NULL olabilir)

    // Navigation Property
    public University? University { get; set; }  // Üniversite ile ilişki
}
