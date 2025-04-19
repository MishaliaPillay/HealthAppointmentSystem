"use client";

import { Typography, Card, Collapse } from "antd";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default function ProviderHelpPage() {
  return (
    <div>
      <Title level={2}>Provider Help & Support</Title>
      <Card>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Managing Your Schedule" key="1">
            <Paragraph>
              1. View your appointments in the Calendar section
              <br />
              2. Block out unavailable times
              <br />
              3. Set your working hours
              <br />
              4. Manage appointment requests
            </Paragraph>
          </Panel>
          
          <Panel header="Handling Appointments" key="2">
            <Paragraph>
              1. Review upcoming appointments in the Appointments section
              <br />
              2. Accept or decline new appointment requests
              <br />
              3. Reschedule appointments when necessary
              <br />
              4. Add notes to patient records
            </Paragraph>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
}