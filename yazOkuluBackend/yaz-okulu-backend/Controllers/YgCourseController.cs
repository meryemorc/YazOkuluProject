using Microsoft.AspNetCore.Mvc; // ControllerBase, Route, ApiController
using Microsoft.EntityFrameworkCore; // EntityState, ToListAsync
using System.Collections.Generic; // List<>
using System.Threading.Tasks; // Task
using yaz_okulu_backend.Models; // YgCourse, ApplicationDbContext

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YgCourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public YgCourseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Tüm Yatay Geçiş Derslerini Getir 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<YgCourse>>> GetYgCourses()
        {
            return await _context.ygCourses.ToListAsync();  
        }
        // Yeni Yatay Geçiş Dersi Oluştur
        [HttpGet("{id}")]
        public async Task<ActionResult<YgCourse>> GetYgCourse(int id)
        {
            var ygCourse = await _context.ygCourses.FindAsync(id);
            if (ygCourse == null)
            {
                return NotFound(); // Eğer ID'li kayıt yoksa 404 döndür
            }
            return ygCourse; // Varsa veriyi döndür
        }
        // Yeni Yatay Geçiş Dersi Ekle
        [HttpPost]
        public async Task<ActionResult<YgCourse>> PostYgCourse(YgCourse ygCourse)
        {
            _context.ygCourses.Add(ygCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetYgCourse", new { id = ygCourse.id }, ygCourse);
        }
        // Yeni Yatay Geçiş Dersi Güncelle
        [HttpPut("{id}")]
        public async Task<IActionResult> PutYgCourse(int id, YgCourse ygCourse)
        {
            if (id != ygCourse.id)
            {
                return BadRequest();
            }

            _context.Entry(ygCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.ygCourses.Any(e => e.id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
            // Yeni Yatay Geçiş Dersi Sil.
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteYgCourse(int id)
            {
                var ygCourse = await _context.ygCourses.FindAsync(id);
                if (ygCourse == null)
                {
                    return NotFound(); // Kayıt bulunamadıysa 404 döner
                }

                _context.ygCourses.Remove(ygCourse); // EF Core ile silme işlemi
                await _context.SaveChangesAsync();   // Veritabanına uygula

                return NoContent(); // 204 - Başarıyla silindi ama içerik dönmüyoruz
            }



    }
}
