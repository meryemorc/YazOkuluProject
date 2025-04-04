using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace yaz_okulu_backend.Models
{
    [Table("yatay_gecis_departments")] // Veritabanındaki tablo adı
    public class YgDepartment
    {
        [Key]
        public int id { get; set; }

        [Required]
        [MaxLength(255)]
        public string department_name { get; set; } = string.Empty;

        [Required]
        public int faculty_id { get; set; }
    }
}
