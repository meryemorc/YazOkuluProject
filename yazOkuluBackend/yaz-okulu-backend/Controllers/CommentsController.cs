using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CommentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CommentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 1. Tüm Yorumları Getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
    {
        return await _context.comments.ToListAsync();
    }

    // 📌 2. ID'ye Göre Yorum Getir
    [HttpGet("{id}")]
    public async Task<ActionResult<Comment>> GetComment(int id)
    {
        var comment = await _context.comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }
        return comment;
    }

    // 📌 3. Yeni Yorum Ekle
    [HttpPost]
    public async Task<ActionResult<Comment>> PostComment(Comment comment)
    {
        comment.CreatedAt = DateTime.UtcNow; // Zamanı otomatik ayarla
        _context.comments.Add(comment);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, comment);
    }

    // 📌 4. Yorum Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> PutComment(int id, Comment comment)
    {
        if (id != comment.Id)
        {
            return BadRequest();
        }

        _context.Entry(comment).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 5. Yorum Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        var comment = await _context.comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        _context.comments.Remove(comment);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
