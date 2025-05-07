using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

[Route("api/[controller]")]
[ApiController]
public class YgDepartmentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public YgDepartmentController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 Tüm bölümleri getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<YgDepartment>>> GetAll()
    {
        return await _context.yatay_gecis_departments.ToListAsync();
    }

    // 📌 ID ile bölüm getir
    [HttpGet("{id}")]
    public async Task<ActionResult<YgDepartment>> GetById(int id)
    {
        var department = await _context.yatay_gecis_departments.FindAsync(id);
        if (department == null)
            return NotFound();
        return department;
    }

    // 📌 Fakülteye göre bölümleri getir
    [HttpGet("ByFaculty/{facultyId}")]
    public async Task<ActionResult<IEnumerable<YgDepartment>>> GetByFaculty(int facultyId)
    {
        var departments = await _context.yatay_gecis_departments
            .Where(d => d.FacultyId == facultyId)
            .ToListAsync();
        return departments;
    }

    // 📌 Yeni bölüm ekle
    [HttpPost]
    public async Task<ActionResult<YgDepartment>> Create(YgDepartment department)
    {
        _context.yatay_gecis_departments.Add(department);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = department.Id }, department);
    }

    // 📌 Bölüm güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, YgDepartment department)
    {
        if (id != department.Id)
            return BadRequest();

        _context.Entry(department).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var department = await _context.yatay_gecis_departments.FindAsync(id);
        if (department == null)
            return NotFound();

        _context.yatay_gecis_departments.Remove(department);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
