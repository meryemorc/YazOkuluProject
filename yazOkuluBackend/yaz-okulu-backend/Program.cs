using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using yaz_okulu_backend.Models;
using yaz_okulu_backend.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔐 OpenAI Key kontrolü
Console.WriteLine("OpenAI Key: " + builder.Configuration["OpenAI:ApiKey"]);

// 📦 Service Kayıtları

// OpenAI Servisi
builder.Services.AddSingleton<OpenAiService>();

// PostgreSQL Veritabanı
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// CORS (React localhost:3000 için)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Diğer servisler
builder.Services.AddScoped<CourseMatcherService>();
builder.Services.AddScoped<TranscriptParserService>();
builder.Services.AddScoped<ITranscriptService, TranscriptService>();
builder.Services.AddScoped<YgCourseService>();

// Controller ve Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔨 Artık uygulamayı build edebiliriz
var app = builder.Build();

// 🧪 Swagger sadece development'ta aktif
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
