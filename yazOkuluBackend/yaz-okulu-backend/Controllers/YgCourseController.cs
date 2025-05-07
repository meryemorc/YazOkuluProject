using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

[Route("api/[controller]")]
[ApiController]
public class YgCourseController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public YgCourseController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 Tüm dersleri getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<YgCourse>>> GetAll()
    {
        return await _context.yatay_gecis_courses.ToListAsync();
    }

    // 📌 ID ile ders getir
    [HttpGet("{id}")]
    public async Task<ActionResult<YgCourse>> GetById(int id)
    {
        var course = await _context.yatay_gecis_courses.FindAsync(id);
        if (course == null)
            return NotFound();
        return course;
    }

    // 📌 Bölüme göre ders getir
    [HttpGet("ByDepartment/{departmentId}")]
    public async Task<ActionResult<IEnumerable<YgCourse>>> GetByDepartment(int departmentId)
    {
        return await _context.yatay_gecis_courses
            .Where(c => c.DepartmentId == departmentId)
            .ToListAsync();
    }

    // 📌 Yeni ders ekle
    [HttpPost]
    public async Task<ActionResult<YgCourse>> Create(YgCourse course)
    {
        _context.yatay_gecis_courses.Add(course);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = course.Id }, course);
    }

    // 📌 Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, YgCourse course)
    {
        if (id != course.Id)
            return BadRequest();

        _context.Entry(course).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var course = await _context.yatay_gecis_courses.FindAsync(id);
        if (course == null)
            return NotFound();

        _context.yatay_gecis_courses.Remove(course);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
