using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HealthAPP.Authorization.Roles;
using HealthAPP.Authorization.Users;
using HealthAPP.MultiTenancy;

namespace HealthAPP.EntityFrameworkCore
{
    public class HealthAPPDbContext : AbpZeroDbContext<Tenant, Role, User, HealthAPPDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public HealthAPPDbContext(DbContextOptions<HealthAPPDbContext> options)
            : base(options)
        {
        }
    }
}
