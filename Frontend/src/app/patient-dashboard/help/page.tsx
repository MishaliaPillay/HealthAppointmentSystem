"use client";

import { Card, Collapse, Divider, Typography } from "antd";
import { HelpCircle, BookOpenCheck, BellRing } from "lucide-react";
import "./page.module.css"; 
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

export default function HelpPage() {
  return (
    <div className="container">
      <Title level={2} className="title">
        <HelpCircle style={{ marginRight: 8 }} />
        Help Center
      </Title>

      <Card className="card">
        <Title level={4} className="subtitle">
          <BookOpenCheck style={{ marginRight: 8 }} />
          Frequently Asked Questions
        </Title>

        <Collapse defaultActiveKey={["1"]} className="collapse">
          <Panel header={<span className="panelHeader">How do I book a new appointment?</span>} key="1">
            <Text>
              Click on &quot;Book New Appointment&quot; in your dashboard and choose a doctor, date, and time.
            </Text>
          </Panel>
          <Panel header={<span className="panelHeader">Can I Schedule an appointment?</span>} key="2">
            <Text>
              Yes. Go to &apos;My Appointments&apos;, find the appointment, and  &apos;schedule&apos;.
            </Text>
          </Panel>
          <Panel header={<span className="panelHeader">How will I get reminders?</span>} key="3">
            <Text>
              You&apos;ll receive SMS and notification reminders before your appointment.
            </Text>
          </Panel>
        </Collapse>

        <Divider />

        <Title level={4} className="subtitle">
          <BellRing style={{ marginRight: 8 }} />
          How-To Guides
        </Title>
        <Paragraph className="paragraph">
          <ul>
            <li>✔️ Update your profile from the Dashboard → Update Profile</li>
            <li>✔️ View medical history from the &quot;Medical History&quot; tab on the left menu</li>
            <li>✔️ Cancel an appointment from the &quot;My Appointments&quot; section</li>
          </ul>
        </Paragraph>
      </Card>
    </div>
  );
}
