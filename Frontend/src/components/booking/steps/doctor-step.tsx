// // import React from "react";
// // import { Typography, List, Button, Avatar, Rate, Space } from "antd";
// // import { LeftOutlined } from "@ant-design/icons";
// // import { Doctor, Specialty } from "../types";
// // import { useStyles } from "../styles";

// // const { Title, Text } = Typography;

// // interface DoctorStepProps {
// //   doctors: Doctor[];
// //   specialties: Specialty[];
// //   onSelect: (doctor: Doctor) => void;
// //   onViewProfile: (doctor: Doctor) => void;
// //   onBack: () => void;
// // }

// // export const DoctorStep: React.FC<DoctorStepProps> = ({
// //   doctors,
// //   specialties,
// //   onSelect,
// //   onViewProfile,
// //   onBack,
// // }) => {
// //   const { styles } = useStyles();

// //   return (
// //     <div>
// //       <div className={styles.backButton} onClick={onBack}>
// //         <LeftOutlined /> Back to Locations
// //       </div>

// //       <Title level={4}>Select a Doctor</Title>
// //       {doctors.length > 0 ? (
// //         <List
// //           dataSource={doctors}
// //           renderItem={(doctor) => (
// //             <List.Item className={styles.doctorCard}>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   width: "100%",
// //                   padding: 16,
// //                 }}
// //               >
// //                 <div className={styles.doctorInfo}>
// //                   <Avatar src={doctor.image} size={64} />
// //                   <div style={{ marginLeft: 12 }}>
// //                     <Text strong>{doctor.name}</Text>
// //                     <div>
// //                       <Text type="secondary">
// //                         {
// //                           specialties.find((s) => s.id === doctor.specialty)
// //                             ?.name
// //                         }
// //                       </Text>
// //                     </div>
// //                     <Rate
// //                       allowHalf
// //                       disabled
// //                       defaultValue={doctor.rating}
// //                       style={{ fontSize: 14 }}
// //                     />
// //                   </div>
// //                 </div>
// //                 <Space>
// //                   <Button type="link" onClick={() => onViewProfile(doctor)}>
// //                     View Details
// //                   </Button>
// //                   <Button type="primary" onClick={() => onSelect(doctor)}>
// //                     Select
// //                   </Button>
// //                 </Space>
// //               </div>
// //             </List.Item>
// //           )}
// //         />
// //       ) : (
// //         <Text>
// //           No doctors available for this specialty at the selected location.
// //         </Text>
// //       )}
// //     </div>
// //   );
// // };
// "use client";
// import React, { useState } from "react";
// import { Typography, List, Button, Avatar, Space } from "antd";
// import { LeftOutlined } from "@ant-design/icons";
// import {
//   useProvidersInstitionActions,
//   useProvidersInstitionState,
// } from "@/providers/providerInstituion-provider";
// import { IProvidersInInstitution } from "@/providers/providerInstituion-provider/context";

// const { Title, Text } = Typography;

// interface Institution {
//   id: number;
//   name: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   country: string;
//   type: string;
// }

// interface InstitutionProviderSelectionProps {
//   institutions: Institution[];
//   onCancel: () => void;
//   onSelectProvider: (provider: IProvidersInInstitution) => void;
// }

// export const DoctorStep: React.FC<InstitutionProviderSelectionProps> = ({
//   onSelectProvider,
// }) => {
//   const [selectedInstitution, setSelectedInstitution] =
//     useState<Institution | null>(null);
//   const { isPending, isSuccess, Providers } = useProvidersInstitionState();
//   const { getProviderInInstitution } = useProvidersInstitionActions();

//   // actually we shoudly try calling the selectin from the location-step page side
//   // const handleInstitutionSelect = (institution: Institution) => {
//   //   setSelectedInstitution(institution);
//   //   // getting the providrs here
//   //   getProviderInInstitution(institution.id);
//   // };

//   const handleBack = () => {
//     setSelectedInstitution(null);
//   };

//   // Display providers for the selected institution
//   if (selectedInstitution) {
//     return (
//       <div>
//         <div
//           style={{ cursor: "pointer", marginBottom: 16 }}
//           onClick={handleBack}
//         >
//           <LeftOutlined /> Back to Locations
//         </div>

//         <Title level={4}>Select a Doctor at {selectedInstitution.name}</Title>

//         {isPending && <Text>Loading doctors...</Text>}

//         {isSuccess && Providers && Providers.length > 0 ? (
//           <List
//             dataSource={Providers}
//             renderItem={(provider) => (
//               <List.Item
//                 style={{
//                   marginBottom: 16,
//                   border: "1px solid #f0f0f0",
//                   borderRadius: 8,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     width: "100%",
//                     padding: 16,
//                   }}
//                 >
//                   <div style={{ display: "flex" }}>
//                     <Avatar size={64} style={{ backgroundColor: "#1890ff" }}>
//                       {provider.fullName.charAt(0)}
//                     </Avatar>
//                     <div style={{ marginLeft: 12 }}>
//                       <Text strong>{provider.fullName}</Text>
//                       <div>
//                         <Text type="secondary">{provider.speciality}</Text>
//                       </div>
//                       <div>
//                         <Text type="secondary">{provider.qualification}</Text>
//                       </div>
//                     </div>
//                   </div>
//                   <Space>
//                     <Button
//                       type="primary"
//                       onClick={() => onSelectProvider(provider)}
//                     >
//                       Select
//                     </Button>
//                   </Space>
//                 </div>
//               </List.Item>
//             )}
//           />
//         ) : (
//           !isPending && <Text>No doctors available at this institution.</Text>
//         )}
//       </div>
//     );
//   }
// };
