using System.ComponentModel.DataAnnotations;       // [Key], [Required], [MaxLength] gibi validation attribute'ları için
using System.ComponentModel.DataAnnotations.Schema; // [Table], [ForeignKey] gibi database mapping için


namespace yaz_okulu_backend.Models
{
    [Table("yatay_gecis_courses")] // PostgreSQL tablo adı
    public class YgCourse
    {
        [Key]
        public int id { get; set; }

        [Required]
        [MaxLength(50)]
        public string course_code { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string course_name { get; set; } = string.Empty;

        [Required]
        public int kredi { get; set; }

        [Required]
        public int akts { get; set; }

        [Required]
        public int department_id { get; set; }  // Foreign key olacak

        [Required]
        public int semester { get; set; }

        [Required]
        [MaxLength(50)]
        public string compulsory { get; set; } = string.Empty;
    }
}
