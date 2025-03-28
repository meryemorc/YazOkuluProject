using Microsoft.AspNetCore.Mvc;
using yaz_okulu_backend.Models;


[Route("api/[controller]")]
[ApiController]
public class DerslerController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDersler()
    {
        return Ok(new { mesaj = "Ders listesi burada olacak!" });
    }
    [HttpPost]
public IActionResult EkleDers([FromBody] Ders yeniDers)
{
    return Ok(new { mesaj = $"{yeniDers.DersAdi} eklendi!" });
}

}
