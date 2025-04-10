using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HealthAPP.Authorization.Roles;
using HealthAPP.Authorization.Users;
using HealthAPP.MultiTenancy;
using HealthAPP.Domain.Persons;
using HealthAPP.Domain.Appointments;

namespace HealthAPP.EntityFrameworkCore
{
    public class HealthAPPDbContext : AbpZeroDbContext<Tenant, Role, User, HealthAPPDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public DbSet<Person> Persons { get; set; }
        public DbSet<Patient> Patients { get; set; }

        public DbSet<Provider> Providers { get; set; }

        public DbSet<Appointment> Appointments { get; set; }
        //TODO:MK
        //Check(refining the comment)if Notifications for Abp inherited member
        //public DbSet<NotificationS> Notifications => Set<NotificationS>();


        public DbSet<ProviderAvailabilty> ProviderAvailabilties { get; set; }







        public HealthAPPDbContext(DbContextOptions<HealthAPPDbContext> options)
            : base(options)
        {
        }
    }
}
