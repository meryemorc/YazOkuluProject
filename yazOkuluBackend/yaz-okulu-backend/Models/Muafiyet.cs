// Models/Muafiyet.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace yaz_okulu_backend.Models
{
    [Table("yatay_gecis_ders_muafiyet")]
    public class Muafiyet
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int user_id { get; set; }

        [Required]
        public int source_course_id { get; set; }

        [Required]
        public int target_course_id { get; set; }

        [Required]
        public bool is_equivalent { get; set; }

        [Required]
        public double similarity_score { get; set; }

        [Required]
        public DateTime created_at { get; set; } = DateTime.UtcNow;
    }
}