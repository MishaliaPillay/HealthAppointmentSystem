using System.ComponentModel;

namespace HealthAPP.Domain.Persons
{
    public enum ReflistConMethod : long
    {
        [Description("Email")]
        Email = 1,
        [Description("SMS")]
        SMS = 2,

    }
}
