using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("comments")]
public class Comment
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
    [Column("comment_text")]
    public string CommentText { get; set; } = string.Empty;

    [Required]
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation Properties (JSON Ignore eklenerek API'de gösterilmez)
    [JsonIgnore] 
    public User? User { get; set; }

    [JsonIgnore]
    public Course? Course { get; set; }
}
