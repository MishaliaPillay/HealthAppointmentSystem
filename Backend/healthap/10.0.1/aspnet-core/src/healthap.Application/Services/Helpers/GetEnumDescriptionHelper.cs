using System;
using System.ComponentModel;
using System.Reflection;

namespace healthap.Services.Helpers
{
    public static class GetEnumDescriptionHelper
    {
        public static string GetEnumDescription(this Enum value)
        {
            //Get the description attribute value for the enum value
            FieldInfo fi = value.GetType().GetField(value.ToString());
            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), true);

            if (attributes.Length > 0)
            {
                return attributes[0].Description;
            }
            else
            {
                return value.ToString();
            }
        }
    }
}
