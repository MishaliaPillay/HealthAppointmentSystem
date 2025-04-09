using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace HealthAPP.EntityFrameworkCore
{
    public static class HealthAPPDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<HealthAPPDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<HealthAPPDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
