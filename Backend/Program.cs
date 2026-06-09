using Backend.Models; 
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar CORS para permitir peticiones desde tu Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500") 
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 2. Configurar la conexión a SQL Server
var connectionString = "Server=localhost;Database=AuthWebsiteDb;Trusted_Connection=True;TrustServerCertificate=True;";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Registrar HttpClient para poder consultar la API de Google reCAPTCHA
builder.Services.AddHttpClient();

builder.Services.AddControllers();
builder.Services.AddOpenApi(); // Nativo de .NET 9
builder.Services.AddHttpClient();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 3. Habilitar la política CORS
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();