using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class FacultiesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FacultiesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 1. Tüm Fakülteleri Getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Faculty>>> GetFaculties()
    {
        return await _context.faculties.ToListAsync();
    }

    // 📌 2. ID'ye Göre Fakülte Getir
    [HttpGet("{id}")]
    public async Task<ActionResult<Faculty>> GetFaculty(int id)
    {
        var faculty = await _context.faculties.FindAsync(id);
        if (faculty == null)
        {
            return NotFound();
        }
        return faculty;
    }

    // 📌 3. Yeni Fakülte Ekle
    [HttpPost]
    public async Task<ActionResult<Faculty>> PostFaculty(Faculty faculty)
    {
        _context.faculties.Add(faculty);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetFaculty), new { id = faculty.id }, faculty);
    }

    // 📌 4. Fakülte Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFaculty(int id, Faculty faculty)
    {
        if (id != faculty.id)
        {
            return BadRequest();
        }

        _context.Entry(faculty).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 5. Fakülte Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFaculty(int id)
    {
        var faculty = await _context.faculties.FindAsync(id);
        if (faculty == null)
        {
            return NotFound();
        }

        _context.faculties.Remove(faculty);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
