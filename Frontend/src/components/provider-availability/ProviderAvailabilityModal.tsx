"use client";

import React, { useContext, useEffect, useState } from "react";
import { Form, TimePicker, Switch, Button, message } from "antd";
import dayjs from "dayjs";
import {
  ProviderAvailabilityStateContext,
  ProviderAvailabilityActionContext,
} from "../../providers/provider-availibility/context";
import { IProvidersAvailability } from "../../providers/provider-availibility/context";

interface Props {
  providerId: string;
}

const UpdateAvailabilityForm: React.FC<Props> = ({ providerId }) => {
  const { availabilities, isPending } = useContext(
    ProviderAvailabilityStateContext
  );
  const actions = useContext(ProviderAvailabilityActionContext);

  const [form] = Form.useForm();
  const [currentAvailability, setCurrentAvailability] =
    useState<IProvidersAvailability | null>(null);

  // Effect to populate form with provider's availability if available
  useEffect(() => {
    if (availabilities?.length) {
      const match = availabilities.find((a) => a.providerId === providerId);
      if (match) {
        setCurrentAvailability(match);
        form.setFieldsValue({
          startTime: dayjs(match.startTime, "HH:mm"),
          endTime: dayjs(match.endTime, "HH:mm"),
          isAvailable: match.isAvailable,
        });
      }
    }
  }, [availabilities, providerId, form]);

  // Handle form submission
  const handleFinish = async (values: any) => {
    const now = dayjs();
    const availabilityData: IProvidersAvailability = {
      id: currentAvailability?.id ?? providerId, // Set id to providerId if no id exists
      providerId, // Ensure providerId is the same

      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
      isAvailable: values.isAvailable,
      dateAvailable: now.toISOString(), // Convert Dayjs to string
      dayOfWeek: now.day(), // Sunday = 0, Monday = 1, etc.
    };
    console.log("Payload to be sent to API:", availabilityData);
    try {
      if (currentAvailability) {
        await actions?.updateAvailability(availabilityData);
        message.success("Availability updated successfully!");
      } else {
        await actions?.createAvailability(availabilityData);
        message.success("Availability created successfully!");
      }
    } catch (error) {
      message.error("Failed to save availability.");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Start Time"
        name="startTime"
        rules={[{ required: true, message: "Please select a start time" }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>

      <Form.Item
        label="End Time"
        name="endTime"
        rules={[{ required: true, message: "Please select an end time" }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>

      <Form.Item label="Available?" name="isAvailable" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          {currentAvailability ? "Update Availability" : "Create Availability"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateAvailabilityForm;
