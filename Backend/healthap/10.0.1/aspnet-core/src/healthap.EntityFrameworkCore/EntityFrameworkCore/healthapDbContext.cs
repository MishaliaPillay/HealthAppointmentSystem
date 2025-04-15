using Abp.Zero.EntityFrameworkCore;
using healthap.Authorization.Roles;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;
using healthap.Domain.Location;
using healthap.Domain.Persons;
using healthap.MultiTenancy;
using healthap.MultiTenancy.speciality;
using Microsoft.EntityFrameworkCore;

namespace healthap.EntityFrameworkCore;

public class healthapDbContext : AbpZeroDbContext<Tenant, Role, User, healthapDbContext>
{
    /* Define a DbSet for each entity of the application */
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Provider> Providers { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Location> Location { get; set; }

    public DbSet<Speciality> Specialities { get; set; }
    public DbSet<ProviderAvailabilty> ProviderAvailabilities { get; set; }

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
