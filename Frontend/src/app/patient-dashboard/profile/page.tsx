'use client';

import { Typography, Form, Input, Button, Card, Avatar, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function ProfilePage() {
  return (
    <div>
      <Title level={2}>Profile</Title>
      
      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={100} icon={<UserOutlined />} />
              <div style={{ marginTop: 16 }}>
                <Button type="primary">Change Avatar</Button>
              </div>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <Form layout="vertical">
              <Form.Item label="Full Name" name="name" initialValue="John Doe">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" initialValue="john.doe@example.com">
                <Input />
              </Form.Item>
              <Form.Item label="Phone" name="phone" initialValue="515151454513">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Save Changes</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
