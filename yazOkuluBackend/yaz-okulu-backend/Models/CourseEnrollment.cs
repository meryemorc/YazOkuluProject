using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("course_enrollments")]
public class CourseEnrollment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [ForeignKey("User")]
    [Column("user_id")]
    public int UserId { get; set; }  

    [Required]
    [ForeignKey("Course")]
    [Column("course_id")]
    public int CourseId { get; set; }  

    [Required]
    [Column("enrollment_date")]
    public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

    // Navigation Properties (JSON Ignore eklenerek API'de gösterilmez)
    [JsonIgnore]
    public User? User { get; set; }

    [JsonIgnore]
    public Course? Course { get; set; }
}
