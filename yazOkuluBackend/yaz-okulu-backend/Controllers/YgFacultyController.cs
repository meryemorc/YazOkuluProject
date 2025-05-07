using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

[Route("api/[controller]")]
[ApiController]
public class YgFacultyController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public YgFacultyController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 Tüm fakülteleri getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<YgFaculty>>> GetAll()
    {
        return await _context.yatay_gecis_faculties.ToListAsync();
    }

    // 📌 ID ile fakülte getir
    [HttpGet("{id}")]
    public async Task<ActionResult<YgFaculty>> GetById(int id)
    {
        var faculty = await _context.yatay_gecis_faculties.FindAsync(id);
        if (faculty == null)
            return NotFound();
        return faculty;
    }

    // 📌 Üniversiteye göre fakülteleri getir
    [HttpGet("ByUniversity/{universityId}")]
    public async Task<ActionResult<IEnumerable<YgFaculty>>> GetByUniversity(int universityId)
    {
        var faculties = await _context.yatay_gecis_faculties
            .Where(f => f.UniversityId == universityId)
            .ToListAsync();
        return faculties;
    }

    // 📌 Yeni fakülte ekle
    [HttpPost]
    public async Task<ActionResult<YgFaculty>> Create(YgFaculty faculty)
    {
        _context.yatay_gecis_faculties.Add(faculty);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = faculty.Id }, faculty);
    }

    // 📌 Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, YgFaculty faculty)
    {
        if (id != faculty.Id)
            return BadRequest();

        _context.Entry(faculty).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // 📌 Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var faculty = await _context.yatay_gecis_faculties.FindAsync(id);
        if (faculty == null)
            return NotFound();

        _context.yatay_gecis_faculties.Remove(faculty);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
