using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using yaz_okulu_backend.Models;

namespace yaz_okulu_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuafiyetController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MuafiyetController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 📌 GET: api/Muafiyet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Muafiyet>>> GetMuafiyetList()
        {
            return await _context.muafiyet.ToListAsync();
        }

        // 📌 GET: api/Muafiyet/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Muafiyet>> GetMuafiyet(int id)
        {
            var muafiyet = await _context.muafiyet.FindAsync(id);

            if (muafiyet == null)
            {
                return NotFound();
            }

            return muafiyet;
        }

        // 📌 POST: api/Muafiyet
        [HttpPost]
        public async Task<ActionResult<Muafiyet>> PostMuafiyet(Muafiyet muafiyet)
        {
            _context.muafiyet.Add(muafiyet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMuafiyet), new { id = muafiyet.id }, muafiyet);
        }

        // 📌 PUT: api/Muafiyet/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMuafiyet(int id, Muafiyet muafiyet)
        {
            if (id != muafiyet.id)
            {
                return BadRequest();
            }

            _context.Entry(muafiyet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MuafiyetExists(id))
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

        // 📌 DELETE: api/Muafiyet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMuafiyet(int id)
        {
            var muafiyet = await _context.muafiyet.FindAsync(id);
            if (muafiyet == null)
            {
                return NotFound();
            }

            _context.muafiyet.Remove(muafiyet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MuafiyetExists(int id)
        {
            return _context.muafiyet.Any(e => e.id == id);
        }
    }
}
