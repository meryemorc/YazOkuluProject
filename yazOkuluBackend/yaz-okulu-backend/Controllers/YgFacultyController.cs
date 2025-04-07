using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YgFacultyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public YgFacultyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/YgFaculty
        [HttpGet]
        public async Task<ActionResult<IEnumerable<YgFaculty>>> GetYgFaculties()
        {
            return await _context.ygFaculties.ToListAsync();
        }

        // GET: api/YgFaculty/5
        [HttpGet("{id}")]
        public async Task<ActionResult<YgFaculty>> GetYgFaculty(int id)
        {
            var ygFaculty = await _context.ygFaculties.FindAsync(id);

            if (ygFaculty == null)
            {
                return NotFound();
            }

            return ygFaculty;
        }

        // POST: api/YgFaculty
        [HttpPost]
        public async Task<ActionResult<YgFaculty>> PostYgFaculty(YgFaculty ygFaculty)
        {
            _context.ygFaculties.Add(ygFaculty);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetYgFaculty), new { id = ygFaculty.id }, ygFaculty);
        }

        // PUT: api/YgFaculty/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutYgFaculty(int id, YgFaculty ygFaculty)
        {
            if (id != ygFaculty.id)
            {
                return BadRequest();
            }

            _context.Entry(ygFaculty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.ygFaculties.Any(e => e.id == id))
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

        // DELETE: api/YgFaculty/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteYgFaculty(int id)
        {
            var ygFaculty = await _context.ygFaculties.FindAsync(id);
            if (ygFaculty == null)
            {
                return NotFound();
            }

            _context.ygFaculties.Remove(ygFaculty);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
