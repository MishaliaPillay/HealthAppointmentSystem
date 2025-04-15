import React from 'react';
import { Typography, List, Button } from 'antd';
import { EnvironmentOutlined, LeftOutlined } from '@ant-design/icons';
import { Facility } from '../types';
import { useStyles } from '../styles';

const { Title, Text } = Typography;

interface LocationStepProps {
  facilities: Facility[];
  onSelect: (facility: Facility) => void;
  onBack: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ facilities, onSelect, onBack }) => {
  const { styles } = useStyles();
  
  return (
    <div>
      <div className={styles.backButton} onClick={onBack}>
        <LeftOutlined /> Back to Specialties
      </div>
      
      <Title level={4}>Select a Location</Title>
      <List
        dataSource={facilities}
        renderItem={(facility) => (
          <List.Item className={styles.locationCard}>
            <Button 
              type="text" 
              block 
              onClick={() => onSelect(facility)}
              style={{ height: 'auto', padding: 16, textAlign: 'left' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div>
                  <Text strong>{facility.name}</Text>
                  <div>
                    <Text type="secondary">{facility.address}</Text>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <EnvironmentOutlined style={{ marginRight: 4 }} />
                  <Text type="secondary">{facility.distance} miles away</Text>
                </div>
              </div>
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};
