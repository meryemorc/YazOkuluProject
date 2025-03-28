using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class UniversitiesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UniversitiesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 1. Tüm Üniversiteleri Getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<University>>> GetUniversities()
    {
        return await _context.universities.ToListAsync();
    }

    // 📌 2. ID'ye Göre Üniversite Getir
    [HttpGet("{id}")]
    public async Task<ActionResult<University>> GetUniversity(int id)
    {
        var university = await _context.universities.FindAsync(id);
        if (university == null)
        {
            return NotFound();
        }
        return university;
    }

    // 📌 3. Yeni Üniversite Ekle
    [HttpPost]
    public async Task<ActionResult<University>> PostUniversity(University university)
    {
        _context.universities.Add(university);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUniversity), new { id = university.id }, university);
    }

    // 📌 4. Üniversite Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUniversity(int id, University university)
    {
        if (id != university.id)
        {
            return BadRequest();
        }

        _context.Entry(university).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 5. Üniversite Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUniversity(int id)
    {
        var university = await _context.universities.FindAsync(id);
        if (university == null)
        {
            return NotFound();
        }

        _context.universities.Remove(university);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
