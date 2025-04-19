"use client";

import { Typography, Card, Collapse } from "antd";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default function HelpPage() {
  return (
    <div>
      <Title level={2}>Help & Support</Title>
      <Card>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="How to Book an Appointment" key="1">
            <Paragraph>
              1. Click on &quot;Book New Appointment&quot; from your dashboard
              <br />
              2. Select your preferred specialty
              <br />
              3. Choose your preferred location
              <br />
              4. Select a doctor from the available list
              <br />
              5. Pick a convenient date and time
              <br />
              6. Confirm your booking
            </Paragraph>
          </Panel>
          
          <Panel header="Managing Your Appointments" key="2">
            <Paragraph>
              1. View all your appointments in the &quot;My Appointments&quot; section
              <br />
              2. Cancel appointments up to 24 hours before the scheduled time
              <br />
              3. Reschedule appointments through the appointment details page
              <br />
              4. Set up appointment reminders in your profile settings
            </Paragraph>
          </Panel>

          <Panel header="Viewing Medical History" key="3">
            <Paragraph>
              1. Access your complete medical history in the &quot;Medical History&quot; section
              <br />
              2. Download medical records and test results
            </Paragraph>
          </Panel>

        </Collapse>
      </Card>
    </div>
  );
}