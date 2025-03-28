using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CourseEnrollmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CourseEnrollmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 1. Tüm Kayıtları Getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseEnrollment>>> GetCourseEnrollments()
    {
        return await _context.course_enrollments.ToListAsync();
    }

    // 📌 2. ID'ye Göre Kayıt Getir
    [HttpGet("{id}")]
    public async Task<ActionResult<CourseEnrollment>> GetCourseEnrollment(int id)
    {
        var courseEnrollment = await _context.course_enrollments.FindAsync(id);
        if (courseEnrollment == null)
        {
            return NotFound();
        }
        return courseEnrollment;
    }

    // 📌 3. Yeni Kayıt Ekle
    [HttpPost]
    public async Task<ActionResult<CourseEnrollment>> PostCourseEnrollment(CourseEnrollment courseEnrollment)
    {
        courseEnrollment.EnrollmentDate = DateTime.UtcNow; // Zamanı otomatik ayarla
        _context.course_enrollments.Add(courseEnrollment);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCourseEnrollment), new { id = courseEnrollment.Id }, courseEnrollment);
    }

    // 📌 4. Kayıt Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCourseEnrollment(int id, CourseEnrollment courseEnrollment)
    {
        if (id != courseEnrollment.Id)
        {
            return BadRequest();
        }

        _context.Entry(courseEnrollment).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 5. Kayıt Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourseEnrollment(int id)
    {
        var courseEnrollment = await _context.course_enrollments.FindAsync(id);
        if (courseEnrollment == null)
        {
            return NotFound();
        }

        _context.course_enrollments.Remove(courseEnrollment);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
