using Abp.Zero.EntityFrameworkCore;
using HealthAppointmentSystem.Authorization.Roles;
using HealthAppointmentSystem.Authorization.Users;
using HealthAppointmentSystem.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace HealthAppointmentSystem.EntityFrameworkCore;

public class HealthAppointmentSystemDbContext : AbpZeroDbContext<Tenant, Role, User, HealthAppointmentSystemDbContext>
{
    /* Define a DbSet for each entity of the application */

    public HealthAppointmentSystemDbContext(DbContextOptions<HealthAppointmentSystemDbContext> options)
        : base(options)
    {
    }
}
