using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User
{
    [Key] // Esto le dice a SQL Server que es la llave primaria auto-incremental
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty; // Aquí guardamos la contraseña protegida

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Fecha de registro automática
}