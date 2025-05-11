using Microsoft.EntityFrameworkCore;
using yaz_okulu_backend.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // 📌 Veritabanındaki tablo isimlerine uygun DbSet tanımları:
    public DbSet<User> users { get; set; }
    public DbSet<University> universities { get; set; }
    public DbSet<Faculty> faculties { get; set; }
    public DbSet<Department> departments { get; set; }
    public DbSet<Course> courses { get; set; }
    public DbSet<CourseEnrollment> course_enrollments { get; set; }
    public DbSet<Comment> comments { get; set; }
    public DbSet<YgCourse> yatay_gecis_courses { get; set; }

    public DbSet<YgDepartment> yatay_gecis_departments { get; set; }

    public DbSet<YgFaculty> yatay_gecis_faculties { get; set; }

    public DbSet<YgUniversity> yatay_gecis_universities { get; set; }
    public DbSet<YgCourse> YgCourses { get; set; }






    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // 📌 Tabloların isimlerini veritabanındaki isimlere uygun hale getiriyoruz.
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<University>().ToTable("universities");
        modelBuilder.Entity<Faculty>().ToTable("faculties");
        modelBuilder.Entity<Department>().ToTable("departments");
        modelBuilder.Entity<Course>().ToTable("courses");
        modelBuilder.Entity<CourseEnrollment>().ToTable("course_enrollments");
        modelBuilder.Entity<Comment>().ToTable("comments");
        modelBuilder.Entity<YgCourse>().ToTable("yatay_gecis_courses");

        modelBuilder.Entity<YgDepartment>().ToTable("yatay_gecis_departments");

        modelBuilder.Entity<YgFaculty>().ToTable("yatay_gecis_faculties");

        modelBuilder.Entity<YgUniversity>().ToTable("yatay_gecis_universities");





    }
}
