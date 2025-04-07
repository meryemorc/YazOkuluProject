using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace yaz_okulu_backend.Models
{
    [Table("yatay_gecis_faculties")]
    public class YgFaculty
    {
        [Key]
        public int id { get; set; }

        [Required]
        [MaxLength(255)]
        public string name { get; set; } = string.Empty;

        [Required]
        public int university_id { get; set; }
    }
}
