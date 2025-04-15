import React from 'react';
import { Card, Typography, Collapse, Divider, Button, message } from 'antd';
import { QuestionCircleOutlined,  } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const HelpPage = () => {
  const handleFeedbackClick = () => {
    message.success("Thank you for your feedback!");
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Card style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Title level={2}><QuestionCircleOutlined /> Help Center</Title>
        <Paragraph>Welcome to the Health Appointment System Help Center. Here you’ll find answers to common questions, how to use the system.</Paragraph>

        <Divider />

        <Title level={4}>📌 Frequently Asked Questions</Title>
        <Collapse accordion>
          <Panel header="How do I book a new appointment?" key="1">
            <Text>Click on “Book New Appointment” in your dashboard and choose a doctor, date, and time.</Text>
          </Panel>
          <Panel header="Can I reschedule an appointment?" key="2">
            <Text>Yes. Go to &apos;My Appointments&apos;, find the appointment you want to change, and click &apos;Reschedule&apos;.</Text>
          </Panel>
          <Panel header="How will I get reminders?" key="3">
            <Text>You&apos;ll receive email and SMS reminders 24 hours before your appointment.</Text>
          </Panel>
        </Collapse>

        <Divider />

        <Title level={4}>🛠 How-To Guides</Title>
        <Paragraph>
          <ul>
            <li>✔️ Update your profile from the Dashboard → Update Profile.</li>
            <li>✔️ View medical history from the “Medical History” tab on the left menu.</li>
            <li>✔️ Cancel an appointment from “My Appointments” section.</li>
          </ul>
        </Paragraph>

        <Title level={4}>💬 Give Us Feedback</Title>
        <Button type="primary" onClick={handleFeedbackClick}>Submit Feedback</Button>
      </Card>
    </div>
  );
};

export default HelpPage;
