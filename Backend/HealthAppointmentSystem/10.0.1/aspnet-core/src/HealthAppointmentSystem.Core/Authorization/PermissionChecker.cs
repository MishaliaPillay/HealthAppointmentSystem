using Abp.Authorization;
using HealthAppointmentSystem.Authorization.Roles;
using HealthAppointmentSystem.Authorization.Users;

namespace HealthAppointmentSystem.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
