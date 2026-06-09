using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class AuthDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)] // Puedes ajustar la longitud mínima según tus requerimientos
    public string Password { get; set; } = string.Empty;

    [Required]
    public string RecaptchaToken { get; set; } = string.Empty; // El token que genera Google en el Frontend
}