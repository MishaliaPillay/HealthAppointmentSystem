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
  useEffect(() => {
    if (providerId && actions?.fetchAvailabilityByProvider) {
      actions.fetchAvailabilityByProvider(providerId);
    }
  }, [providerId]);

  // Effect to populate form with provider's availability if available
  useEffect(() => {
    if (availabilities?.result) {
      const match = availabilities.result.find(
        (a) => a.providerId === providerId
      );
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

  //SETTING THE PROVIDER Calender
  const now = new Date();
  const dateAvailable = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // Handle form submission
  const handleFinish = async (values: IProvidersAvailability) => {
    const now = dayjs();
    const availabilityData: IProvidersAvailability = {
      id: currentAvailability?.id ?? providerId,
      providerId,
      startTime: dayjs(values.startTime, "HH:mm").format("HH:mm"),
      endTime: dayjs(values.endTime, "HH:mm").format("HH:mm"),
      isAvailable: values.isAvailable,
      dateAvailable: dateAvailable,
      dayOfWeek: now.day(), // Sunday = 0, Monday = 1, going on .
    };

    try {
      if (currentAvailability) {
        await actions?.updateAvailability(availabilityData);

        message.success("Availability updated successfully!");
      } else {
        await actions?.createAvailability(availabilityData);
        message.success("Availability created successfully!");
      }
    } catch (error) {
      console.error(error);
      console.error();
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
