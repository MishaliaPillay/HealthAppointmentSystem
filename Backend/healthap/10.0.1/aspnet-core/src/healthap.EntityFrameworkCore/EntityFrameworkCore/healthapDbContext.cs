using Abp.Zero.EntityFrameworkCore;
using healthap.Authorization.Roles;
using healthap.Authorization.Users;
using healthap.Domain.Appointments;
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
    public DbSet<Speciality> Specialities { get; set; }
    public DbSet<ProviderAvailabilty> ProviderAvailabilities { get; set; }

    public healthapDbContext(DbContextOptions<healthapDbContext> options)
        : base(options)
    {
    }

  
}
