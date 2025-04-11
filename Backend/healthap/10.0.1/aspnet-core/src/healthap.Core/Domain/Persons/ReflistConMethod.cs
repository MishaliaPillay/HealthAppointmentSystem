using System.ComponentModel;

namespace healthap.Domain.Persons
{
    public enum ReflistConMethod : long
    {
        [Description("Email")]
        Email = 1,
        [Description("SMS")]
        SMS = 2,
    }
}
