using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace HealthAppointmentSystem.EntityFrameworkCore;

public static class HealthAppointmentSystemDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<HealthAppointmentSystemDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<HealthAppointmentSystemDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
