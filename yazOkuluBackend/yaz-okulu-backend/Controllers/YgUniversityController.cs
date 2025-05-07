using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

[Route("api/[controller]")]
[ApiController]
public class YgUniversityController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public YgUniversityController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 Tüm üniversiteleri getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<YgUniversity>>> GetAll()
    {
        return await _context.yatay_gecis_universities.ToListAsync();
    }

    // 📌 ID ile üniversite getir
    [HttpGet("{id}")]
    public async Task<ActionResult<YgUniversity>> GetById(int id)
    {
        var university = await _context.yatay_gecis_universities.FindAsync(id);
        if (university == null)
            return NotFound();
        return university;
    }

    // 📌 Yeni üniversite ekle
    [HttpPost]
    public async Task<ActionResult<YgUniversity>> Create(YgUniversity university)
    {
        _context.yatay_gecis_universities.Add(university);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = university.Id }, university);
    }

    // 📌 Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, YgUniversity university)
    {
        if (id != university.Id)
            return BadRequest();

        _context.Entry(university).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var university = await _context.yatay_gecis_universities.FindAsync(id);
        if (university == null)
            return NotFound();

        _context.yatay_gecis_universities.Remove(university);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
