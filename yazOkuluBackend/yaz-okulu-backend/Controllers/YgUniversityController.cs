using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YgUniversityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public YgUniversityController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<YgUniversity>>> GetYgUniversities()
        {
            return await _context.ygUniversities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<YgUniversity>> GetYgUniversity(int id)
        {
            var university = await _context.ygUniversities.FindAsync(id);
            if (university == null)
                return NotFound();

            return university;
        }

        [HttpPost]
        public async Task<ActionResult<YgUniversity>> PostYgUniversity(YgUniversity ygUniversity)
        {
            _context.ygUniversities.Add(ygUniversity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetYgUniversity), new { id = ygUniversity.id }, ygUniversity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutYgUniversity(int id, YgUniversity ygUniversity)
        {
            if (id != ygUniversity.id)
                return BadRequest();

            _context.Entry(ygUniversity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteYgUniversity(int id)
        {
            var university = await _context.ygUniversities.FindAsync(id);
            if (university == null)
                return NotFound();

            _context.ygUniversities.Remove(university);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
