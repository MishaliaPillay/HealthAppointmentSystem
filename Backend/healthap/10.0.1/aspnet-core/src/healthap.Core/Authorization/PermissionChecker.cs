using Abp.Authorization;
using healthap.Authorization.Roles;
using healthap.Authorization.Users;

namespace healthap.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
