using yaz_okulu_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace yaz_okulu_backend.Services
{
    public class YgCourseService
    {
        private readonly ApplicationDbContext _context;

        public YgCourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<YgCourse>> GetByDepartmentAndSemester(int departmentId, int semester)
        {
            return await _context.YgCourses
                .Where(c => c.DepartmentId == departmentId && c.Semester <= semester)
                .ToListAsync();
        }
    }
}
