using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("yatay_gecis_universities")]  
public class YgUniversity
{
    [Key]
    public int id { get; set; }

    [Required]
    [MaxLength(255)]
    public string name { get; set; } = string.Empty;
}
