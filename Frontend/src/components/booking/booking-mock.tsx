// // mockData.ts
// import { Specialty, Facility, Doctor, TimeSlot } from "./types";

// export const SPECIALTIES: Specialty[] = [
//   { id: "cardio", name: "Cardiology" },
//   { id: "derm", name: "Dermatology" },
//   { id: "neuro", name: "Neurology" },
//   { id: "ortho", name: "Orthopedics" },
//   { id: "pedia", name: "Pediatrics" },
//   { id: "primary", name: "Primary Care" },
//   { id: "ent", name: "ENT" },
//   { id: "surgery", name: "Surgery" },
// ];

// export const FACILITIES: Facility[] = [
//   {
//     id: "city-general",
//     name: "City General Hospital",
//     specialties: ["primary", "cardio", "pedia"],
//     address: "123 Main St, Cityville",
//     distance: 0.8,
//   },
//   {
//     id: "metro-medical",
//     name: "Metro Medical Center",
//     specialties: ["surgery", "ortho", "neuro"],
//     address: "456 Health Ave, Townville",
//     distance: 1.2,
//   },
//   {
//     id: "westside",
//     name: "Westside Clinic",
//     specialties: ["derm", "ent", "primary"],
//     address: "789 Care Blvd, Healthtown",
//     distance: 2.3,
//   },
// ];

// export const DOCTORS: Doctor[] = [
//   {
//     id: "doc1",
//     name: "Dr. Sarah Johnson",
//     specialty: "cardio",
//     facilityId: "city-general",
//     bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience treating heart conditions.",
//     rating: 4.9,
//     image: "/api/placeholder/100/100",
//   },
//   {
//     id: "doc2",
//     name: "Dr. Michael Chen",
//     specialty: "primary",
//     facilityId: "city-general",
//     bio: "Dr. Chen specializes in family medicine and preventative care for patients of all ages.",
//     rating: 4.7,
//     image: "/api/placeholder/100/100",
//   },
//   {
//     id: "doc3",
//     name: "Dr. Rebecca Santos",
//     specialty: "neuro",
//     facilityId: "metro-medical",
//     bio: "Dr. Santos is a neurologist focusing on headache disorders and neurodegenerative diseases.",
//     rating: 4.8,
//     image: "/api/placeholder/100/100",
//   },
// ];

// // Generate dates for the next 30 days
// export const generateDates = () => {
//   const dates = [];
//   const today = new Date();

//   for (let i = 0; i < 30; i++) {
//     const date = new Date(today);
//     date.setDate(today.getDate() + i);
//     dates.push(date.toISOString().split("T")[0]); // YYYY-MM-DD format
//   }

//   return dates;
// };

// export const DATES = generateDates();

// // Generate time slots for each doctor
// export const generateTimeSlots = (): TimeSlot[] => {
//   const slots: TimeSlot[] = [];
//   const times = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//   ];

//   DOCTORS.forEach((doctor) => {
//     DATES.forEach((date) => {
//       times.forEach((time, index) => {
//         // Randomly make some slots unavailable
//         const available = Math.random() > 0.3;
//         slots.push({
//           id: `${doctor.id}-${date}-${index}`,
//           doctorId: doctor.id,
//           date,
//           time,
//           available,
//         });
//       });
//     });
//   });

//   return slots;
// };

// export const TIME_SLOTS = generateTimeSlots();
