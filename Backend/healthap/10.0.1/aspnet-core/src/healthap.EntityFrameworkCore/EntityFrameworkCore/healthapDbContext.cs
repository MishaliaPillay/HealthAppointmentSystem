using Abp.Zero.EntityFrameworkCore;
using healthap.Authorization.Roles;
using healthap.Authorization.Users;
using healthap.Domain;
using healthap.Domain.Location;
using healthap.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace healthap.EntityFrameworkCore;

public class healthapDbContext : AbpZeroDbContext<Tenant, Role, User, healthapDbContext>
{
    /* Define a DbSet for each entity of the application */
    public DbSet<Location> Locations { get; set; }
    public DbSet<Appointment> Appointments { get; set; }

    public healthapDbContext(DbContextOptions<healthapDbContext> options)
        : base(options)
    {
    }
    protected void ConfigureLocation(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Location>(entity =>
        {
            entity.ToTable("Locations");
            entity.HasIndex(e => new { e.Latitude, e.Longitude });

            entity.Property(e => e.Address).IsRequired().HasMaxLength(100);
            entity.Property(e => e.City).IsRequired().HasMaxLength(100);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.PostalCode).HasMaxLength(30);
            entity.Property(e => e.Country).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(255);
        });
    }
}
