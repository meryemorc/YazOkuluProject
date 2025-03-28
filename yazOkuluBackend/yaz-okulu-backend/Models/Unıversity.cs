using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("universities")]  // Veritabanındaki tablo adıyla eşleşmesi için ekledik.
public class University
{
    [Key]
    public int id { get; set; }

    [Required]
    [MaxLength(255)]
    public string name { get; set; } = string.Empty;
}
