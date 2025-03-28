using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // 📌 1. Tüm Kullanıcıları Getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.users.Include(u => u.Department).ToListAsync();
    }

    // 📌 2. ID'ye Göre Kullanıcı Getir
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.users.Include(u => u.Department)
                                       .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    // 📌 3. Yeni Kullanıcı Ekle
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        _context.users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    // 📌 4. Kullanıcı Güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, User user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }

        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 📌 5. Kullanıcı Sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.users.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
