// import React from "react";
// import { Typography, List, Button } from "antd";
// import { EnvironmentOutlined, LeftOutlined } from "@ant-design/icons";
// import { Facility } from "../types";
// import { useStyles } from "../styles";

// const { Title, Text } = Typography;

// interface LocationStepProps {
//   facilities: Facility[];
//   onSelect: (facility: Facility) => void;
//   onBack: () => void;
// }

// export const LocationStep: React.FC<LocationStepProps> = ({
//   facilities,
//   onSelect,
//   onBack,
// }) => {
//   const { styles } = useStyles();

//   return (
//     <div>
//       <div className={styles.backButton} onClick={onBack}>
//         <LeftOutlined /> Back to Specialties
//       </div>

//       <Title level={4}>Select a Location</Title>
//       <List
//         dataSource={facilities}
//         renderItem={(facility) => (
//           <List.Item className={styles.locationCard}>
//             <Button
//               type="text"
//               block
//               onClick={() => onSelect(facility)}
//               style={{ height: "auto", padding: 16, textAlign: "left" }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   width: "100%",
//                 }}
//               >
//                 <div>
//                   <Text strong>{facility.name}</Text>
//                   <div>
//                     <Text type="secondary">{facility.address}</Text>
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <EnvironmentOutlined style={{ marginRight: 4 }} />
//                   <Text type="secondary">{facility.distance} miles away</Text>
//                 </div>
//               </div>
//             </Button>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

import React, { useEffect } from "react";
import { Typography, List, Button, Spin } from "antd";
import { EnvironmentOutlined, LeftOutlined } from "@ant-design/icons";

import { useStyles } from "../styles";
import {
  useLocationState,
  useLocationActions,
} from "@/providers/institutionLocation-provider";
import { ILocation } from "@/providers/institutionLocation-provider/context";

const { Title, Text } = Typography;

interface LocationPageProps {
  onSelect?: (location: ILocation) => void;
  onBack?: () => void;
}

export const LocationStep: React.FC<LocationPageProps> = ({
  onSelect,
  onBack,
}) => {
  const { styles } = useStyles();
  const { locations, isPending, isError } = useLocationState();
  const { getAllPlaces } = useLocationActions();

  useEffect(() => {
    getAllPlaces();
  }, []);

  if (isPending) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Text type="danger">
          Failed to load locations. Please try again later.
        </Text>
        <Button onClick={() => getAllPlaces()} style={{ marginTop: 16 }}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      {onBack && (
        <div className={styles.backButton} onClick={onBack}>
          <LeftOutlined /> Back to Specialties
        </div>
      )}

      <Title level={4}>Select a Location</Title>

      {!locations || locations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Text type="secondary">No locations found</Text>
        </div>
      ) : (
        <List
          dataSource={locations}
          renderItem={(location) => (
            <List.Item className={styles.locationCard}>
              <Button
                type="text"
                block
                onClick={() => onSelect && onSelect(location)}
                style={{ height: "auto", padding: 16, textAlign: "left" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    <Text strong>{location.description}</Text>
                    <div>
                      <Text type="secondary">{location.address}</Text>
                      <br />
                      <Text type="secondary">
                        {location.state}, {location.postalCode},{" "}
                        {location.country}
                      </Text>
                      <br />
                      <Text type="secondary">
                        Type: {location.facilityType}
                      </Text>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EnvironmentOutlined style={{ marginRight: 4 }} />
                    <a
                      href={location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </Button>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
