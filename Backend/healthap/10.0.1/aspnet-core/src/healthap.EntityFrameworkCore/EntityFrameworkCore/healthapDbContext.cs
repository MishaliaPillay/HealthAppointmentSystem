using Abp.Zero.EntityFrameworkCore;
using healthap.Authorization.Roles;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;
using healthap.Domain.Institution;
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
    public DbSet<Speciality> Specialities { get; set;}
    public DbSet<Institution> Institutions { get; set; }
    public DbSet<ProviderAvailabilty> ProviderAvailabilties { get; set; }
    public DbSet<ProviderLocation> ProviderLocations { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Institution>(entity =>
        {
            entity.ToTable("Institutions");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(256);
            entity.Property(e => e.City).IsRequired().HasMaxLength(100);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.PostalCode).HasMaxLength(20);
            entity.Property(e => e.Country).IsRequired().HasMaxLength(100);
            entity.Property(e => e.FacilityType).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.PlaceId).HasMaxLength(100);
            entity.Property(e => e.GoogleMapsUrl).HasMaxLength(256);
        });

        // Appointment → Provider (Restrict delete)
        //modelBuilder.Entity<Appointment>()
        //    .HasOne(a => a.Provider)
        //    .WithMany(p => p.Appointments)
        //    .HasForeignKey(a => a.ProviderId)
        //    .OnDelete(DeleteBehavior.Restrict);

        // ProviderAvailability → Provider (Optional cascade or restrict)
        modelBuilder.Entity<ProviderAvailabilty>()
            .HasOne(pa => pa.Provider)
            .WithMany(p => p.Availabilities)
            .HasForeignKey(pa => pa.ProviderId)
            .OnDelete(DeleteBehavior.Cascade); // or Restrict if you prefer
    }
    public healthapDbContext(DbContextOptions<healthapDbContext> options)
        : base(options)
    {
    }

  
}
