using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace healthap.MultiTenancy.speciality
{
    public enum SpecialtyName
    {
        [Display(Name = "Cardiology")]
        Cardiology,

        [Display(Name = "Dermatology")]
        Dermatology,

        [Display(Name = "Family Medicine")]
        FamilyMedicine,

        [Display(Name = "Gastroenterology")]
        Gastroenterology,

        [Display(Name = "Internal Medicine")]
        InternalMedicine,

        [Display(Name = "Neurology")]
        Neurology,

        [Display(Name = "Obstetrics")]
        Obstetrics,

        [Display(Name = "Oncology")]
        Oncology,

        [Display(Name = "Ophthalmology")]
        Ophthalmology,

        [Display(Name = "Orthopedics")]
        Orthopedics,

        [Display(Name = "Pediatrics")]
        Pediatrics,

        [Display(Name = "Psychiatry")]
        Psychiatry,

        [Display(Name = "Radiology")]
        Radiology,

        [Display(Name = "Urology")]
        Urology
    }
}
