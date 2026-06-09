namespace Backend.Models;

using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    // Este constructor es OBLIGATORIO para que Program.cs le inyecte la conexión de SQL Server
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }

    // Tu tabla de usuarios
    public DbSet<User> Users { get; set; }
}