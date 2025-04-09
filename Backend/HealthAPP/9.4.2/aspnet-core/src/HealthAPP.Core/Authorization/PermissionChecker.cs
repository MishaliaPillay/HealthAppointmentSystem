using Abp.Authorization;
using HealthAPP.Authorization.Roles;
using HealthAPP.Authorization.Users;

namespace HealthAPP.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
