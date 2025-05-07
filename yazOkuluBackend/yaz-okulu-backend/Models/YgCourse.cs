using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("yatay_gecis_courses")]
public class YgCourse
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("course_code")]
    public string CourseCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("course_name")]
    public string CourseName { get; set; } = string.Empty;

    [Column("kredi")]
    public int Kredi { get; set; }

    [Column("akts")]
    public int Akts { get; set; }

    [Column("department_id")]
    public int DepartmentId { get; set; }

    [Column("semester")]
    public int Semester { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("compulsory")]
    public string Compulsory { get; set; } = string.Empty;
}
