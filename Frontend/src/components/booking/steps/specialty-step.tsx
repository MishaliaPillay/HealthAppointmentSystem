// import React, { useState } from "react";
// import { Input, Card, Typography } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { Specialty } from "../types";
// import { useStyles } from "../styles";

// const { Title } = Typography;

// interface SpecialtyStepProps {
//   specialties: Specialty[];
//   onSelect: (specialtyId: string) => void;
// }

// export const SpecialtyStep: React.FC<SpecialtyStepProps> = ({
//   specialties,
//   onSelect,
// }) => {
//   const { styles } = useStyles();
//   const [searchTerm, setSearchTerm] = useState("");

//   // Add General specialty if it doesn't exist
//   const allSpecialties = specialties.some((s) => s.name === "General")
//     ? specialties
//     : [{ id: "general", name: "General" }, ...specialties];

//   // Filter specialties based on search term
//   const filteredSpecialties = allSpecialties.filter((specialty) =>
//     specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div>
//       <Title level={4}>Select a Specialty</Title>
//       <Input
//         placeholder="Search specialties..."
//         prefix={<SearchOutlined />}
//         style={{ marginBottom: 16 }}
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//           gap: 12,
//         }}
//       >
//         {filteredSpecialties.map((specialty) => (
//           <Card
//             key={specialty.id}
//             hoverable
//             onClick={() => onSelect(specialty.id)}
//             className={styles.stepCard}
//           >
//             <Typography.Text strong style={{ fontSize: 14, margin: 0 }}>
//               {specialty.name}
//             </Typography.Text>
//           </Card>
//         ))}
//       </div>
//       {filteredSpecialties.length === 0 && (
//         <Typography.Text type="secondary">
//           No specialties match your search.
//         </Typography.Text>
//       )}
//     </div>
//   );
// };
