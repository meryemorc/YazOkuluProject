using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YgDepartmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public YgDepartmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<YgDepartment>>> GetYgDepartments()
        {
            return await _context.ygDepartments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<YgDepartment>> GetYgDepartment(int id)
        {
            var dept = await _context.ygDepartments.FindAsync(id);
            if (dept == null) return NotFound();
            return dept;
        }

        [HttpPost]
        public async Task<ActionResult<YgDepartment>> PostYgDepartment(YgDepartment dept)
        {
            _context.ygDepartments.Add(dept);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetYgDepartment), new { id = dept.id }, dept);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutYgDepartment(int id, YgDepartment dept)
        {
            if (id != dept.id) return BadRequest();
            _context.Entry(dept).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteYgDepartment(int id)
        {
            var dept = await _context.ygDepartments.FindAsync(id);
            if (dept == null) return NotFound();

            _context.ygDepartments.Remove(dept);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
