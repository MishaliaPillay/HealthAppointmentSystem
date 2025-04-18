using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace healthap.EntityFrameworkCore;

public static class healthapDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<healthapDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<healthapDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
