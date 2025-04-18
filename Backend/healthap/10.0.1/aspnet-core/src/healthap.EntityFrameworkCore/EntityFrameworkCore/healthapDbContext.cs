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
    public DbSet<ProviderAvailabilty> ProviderAvailabilty { get; set; }
    public DbSet<Institution> Institutions { get; set; }
    public DbSet<ProviderLocation> ProviderLocations { get; set; }

    public healthapDbContext(DbContextOptions<healthapDbContext> options)
        : base(options)
    {
    }

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

        //modelBuilder.Entity<ProviderLocation>(entity =>
        //{
        //    entity.ToTable("ProviderLocations");
        //    entity.HasKey(e => e.Id);

        //    entity.HasOne(e => e.Institution)
        //        .WithMany(l => l.Providers)
        //        .HasForeignKey(e => e.LocationId)
        //        .OnDelete(DeleteBehavior.Restrict);

        //    entity.HasOne(e => e.Provider)
        //        .WithMany()
        //        .HasForeignKey(e => e.ProviderId)
        //        .OnDelete(DeleteBehavior.Restrict);

        //    entity.Property(e => e.Specialization).HasMaxLength(200);
        //});
    }
}
