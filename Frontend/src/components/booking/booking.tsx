// // BookingModule.tsx
// import React, { useState, useEffect } from "react";
// import { Button, Modal, Steps, message } from "antd";
// import {
//   SPECIALTIES,
//   FACILITIES,
//   DOCTORS,
//   DATES,
//   TIME_SLOTS,
// } from "./booking-mock";
// import { Facility, Doctor, TimeSlot } from "./types";
// import { useStyles } from "./styles";
// import { SpecialtyStep } from "./steps/specialty-step";
// import { LocationStep } from "./steps/location-step";
// import { DoctorStep } from "./steps/doctor-step";
// import { DateStep } from "./steps/date-step";
// import { TimeStep } from "./steps/time-step";
// import DoctorProfileModal from "./booking-doctor-info";

// interface BookingModuleProps {
//   showButton?: boolean;
//   onClose?: () => void;
// }

// export const BookingModule: React.FC<BookingModuleProps> = ({
//   showButton = true,
//   onClose,
// }) => {
//   const { styles } = useStyles();
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
//     null
//   );
//   const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
//     null
//   );
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
//     null
//   );
//   const [showDoctorProfile, setShowDoctorProfile] = useState(false);
//   const [doctorToShow, setDoctorToShow] = useState<Doctor | null>(null);

//   useEffect(() => {
//     if (!showButton) {
//       setIsOpen(true);
//     }
//   }, [showButton]);

//   const resetBooking = () => {
//     setCurrentStep(0);
//     setSelectedSpecialty(null);
//     setSelectedFacility(null);
//     setSelectedDoctor(null);
//     setSelectedDate(null);
//     setSelectedTimeSlot(null);
//   };

//   const handleOpenModal = () => {
//     setIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsOpen(false);
//     resetBooking();
//     if (onClose) {
//       onClose();
//     }
//   };

//   const filteredFacilities = selectedSpecialty
//     ? FACILITIES.filter((facility) =>
//         facility.specialties.includes(selectedSpecialty)
//       )
//     : FACILITIES;

//   const filteredDoctors =
//     selectedFacility && selectedSpecialty
//       ? DOCTORS.filter(
//           (doctor) =>
//             doctor.facilityId === selectedFacility.id &&
//             doctor.specialty === selectedSpecialty
//         )
//       : [];

//   const filteredTimeSlots =
//     selectedDoctor && selectedDate
//       ? TIME_SLOTS.filter(
//           (slot) =>
//             slot.doctorId === selectedDoctor.id &&
//             slot.date === selectedDate &&
//             slot.available
//         )
//       : [];

//   const handleSpecialtySelect = (specialtyId: string) => {
//     setSelectedSpecialty(specialtyId);
//     setCurrentStep(1);
//   };

//   const handleFacilitySelect = (facility: Facility) => {
//     setSelectedFacility(facility);
//     setCurrentStep(2);
//   };

//   const handleDoctorSelect = (doctor: Doctor) => {
//     setSelectedDoctor(doctor);
//     setCurrentStep(3);
//     message.info({
//       content: `Selected Dr. ${doctor.name} - ${SPECIALTIES.find(s => s.id === doctor.specialty)?.name}`,
//       duration: 3
//     });
//   };

//   const handleDateSelect = (date: string) => {
//     setSelectedDate(date);
//     setCurrentStep(4);
//   };

//   const handleTimeSelect = (timeSlot: TimeSlot) => {
//     setSelectedTimeSlot(timeSlot);
//   };

//   const handleSubmitBooking = () => {
//     message.success({
//       content: `Your appointment with ${selectedDoctor?.name} on ${selectedDate} at ${selectedTimeSlot?.time} has been booked.`,
//       className: 'custom-class',
//       duration: 2,
//     });
    
//     const appointmentDate = new Date(selectedDate + ' ' + selectedTimeSlot?.time);
//     const reminderDate = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);
    
//     const reminders = JSON.parse(localStorage.getItem('appointmentReminders') || '[]');
//     reminders.push({
//       doctorName: selectedDoctor?.name,
//       date: appointmentDate.toISOString(),
//       reminderDate: reminderDate.toISOString()
//     });
//     localStorage.setItem('appointmentReminders', JSON.stringify(reminders));
    
//     handleCloseModal();
//   };

//   const viewDoctorProfile = (doctor: Doctor) => {
//     setDoctorToShow(doctor);
//     setShowDoctorProfile(true);
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <SpecialtyStep
//             specialties={SPECIALTIES}
//             onSelect={handleSpecialtySelect}
//           />
//         );
//       case 1:
//         return (
//           <LocationStep
//             facilities={filteredFacilities}
//             onSelect={handleFacilitySelect}
//             onBack={() => setCurrentStep(0)}
//           />
//         );
//       case 2:
//         return (
//           <DoctorStep
//             doctors={filteredDoctors}
//             specialties={SPECIALTIES}
//             onSelect={handleDoctorSelect}
//             onViewProfile={viewDoctorProfile}
//             onBack={() => setCurrentStep(1)}
//           />
//         );
//       case 3:
//         return (
//           <DateStep
//             dates={DATES}
//             onSelect={handleDateSelect}
//             onBack={() => setCurrentStep(2)}
//           />
//         );
//       case 4:
//         return (
//           <TimeStep
//             doctor={selectedDoctor}
//             facility={selectedFacility}
//             date={selectedDate}
//             timeSlots={filteredTimeSlots}
//             specialties={SPECIALTIES}
//             selectedTimeSlot={selectedTimeSlot}
//             onSelect={handleTimeSelect}
//             onBack={() => setCurrentStep(3)}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   if (!showButton) {
//     return (
//       <div className={styles.modalContent}>
//         <Steps
//           current={currentStep}
//           items={[
//             { title: "Specialty" },
//             { title: "Location" },
//             { title: "Doctor" },
//             { title: "Date" },
//             { title: "Time" },
//           ]}
//           className="responsive-steps"
//         />

//         <div className={styles.stepContent}>{renderStepContent()}</div>

//         <div className={styles.footerActions}>
//           <Button onClick={handleCloseModal}>Cancel</Button>
//           {currentStep === 4 && (
//             <Button
//               type="primary"
//               disabled={!selectedTimeSlot}
//               onClick={handleSubmitBooking}
//             >
//               Confirm Booking
//             </Button>
//           )}
//         </div>

//         <DoctorProfileModal
//           doctor={doctorToShow}
//           specialties={SPECIALTIES}
//           facilities={FACILITIES}
//           visible={showDoctorProfile}
//           onClose={() => setShowDoctorProfile(false)}
//           onSelect={handleDoctorSelect}
//         />
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: "1024px", margin: "0 auto", padding: 16 }}>
//       <Button
//         type="primary"
//         size="large"
//         className={styles.bookingButton}
//         onClick={handleOpenModal}
//       >
//         Make an Appointment
//       </Button>

//       <Modal
//         title="Book an Appointment"
//         open={isOpen}
//         onCancel={handleCloseModal}
//         width={800}
//         footer={
//           <div className={styles.footerActions}>
//             <Button onClick={handleCloseModal}>Cancel</Button>
//             {currentStep === 4 && (
//               <Button
//                 type="primary"
//                 disabled={!selectedTimeSlot}
//                 onClick={handleSubmitBooking}
//               >
//                 Confirm Booking
//               </Button>
//             )}
//           </div>
//         }
//       >
//         <div className={styles.modalContent}>
//           <Steps
//             current={currentStep}
//             items={[
//               { title: "Specialty" },
//               { title: "Location" },
//               { title: "Doctor" },
//               { title: "Date" },
//               { title: "Time" },
//             ]}
//             className="responsive-steps"
//           />

//           <div className={styles.stepContent}>{renderStepContent()}</div>
//         </div>
//       </Modal>

//       <DoctorProfileModal
//         doctor={doctorToShow}
//         specialties={SPECIALTIES}
//         facilities={FACILITIES}
//         visible={showDoctorProfile}
//         onClose={() => setShowDoctorProfile(false)}
//         onSelect={handleDoctorSelect}
//       />
//     </div>
//   );
// };

