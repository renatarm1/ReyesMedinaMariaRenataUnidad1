using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Text.Json;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebSiteController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;

    // Llave secreta de prueba provista por Google para entornos de desarrollo local
    private const string RecaptchaSecretKey = "6LeIxAcTAAAAALoSuC7Ex617w3S919mE8ToSkb6b"; // Secreta de prueba universal

    public WebSiteController(ApplicationDbContext context, IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AuthDto dto)
    {
        // 1. Validar reCAPTCHA con los servidores de Google
        var client = _httpClientFactory.CreateClient();
        var response = await client.PostAsync(
            $"https://www.google.com/recaptcha/api/siteverify?secret={RecaptchaSecretKey}&response={dto.RecaptchaToken}", 
            null
        );

        var jsonString = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(jsonString);
        bool isHuman = doc.RootElement.GetProperty("success").GetBoolean();

        if (!isHuman)
        {
            return BadRequest(new { error = "reCAPTCHA verification failed. Please try again." });
        }

        // 2. Verificar si el correo ya está registrado en SQL Server
        var userExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
        if (userExists)
        {
            return BadRequest(new { error = "This email address is already registered." });
        }

        // 3. Crear el nuevo usuario (Aquí guardamos la contraseña directamente; en producción usaríamos hashing)
        var newUser = new User
        {
            Email = dto.Email,
            PasswordHash = dto.Password // Guardado directo para fines académicos/pruebas
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Registration completed successfully. Welcome aboard!" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthDto dto)
    {
        // El login busca las credenciales directamente en tu tabla de SQL Server
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.PasswordHash == dto.Password);
        
        if (user == null)
        {
            return Unauthorized(new { error = "Invalid email or password." });
        }

        return Ok(new { message = $"Access granted. Welcome back, {user.Email}!" });
    }
}