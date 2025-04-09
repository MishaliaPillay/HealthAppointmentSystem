using Abp.MultiTenancy;
using HealthAppointmentSystem.Authorization.Users;

namespace HealthAppointmentSystem.MultiTenancy;

public class Tenant : AbpTenant<User>
{
    public Tenant()
    {
    }

    public Tenant(string tenancyName, string name)
        : base(tenancyName, name)
    {
    }
}
