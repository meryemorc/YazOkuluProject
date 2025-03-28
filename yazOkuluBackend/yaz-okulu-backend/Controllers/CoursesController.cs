using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 📌 1. Tüm Dersleri Getir
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            return await _context.courses.ToListAsync();
        }

        // 📌 2. ID'ye Göre Ders Getir
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return course;
        }

        // 📌 3. Yeni Ders Ekle
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            _context.courses.Add(course);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCourse), new { id = course.id }, course);
        }

        // 📌 4. Ders Güncelle
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.id)
            {
                return BadRequest();
            }

            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 📌 5. Ders Sil
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.courses.Remove(course);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
