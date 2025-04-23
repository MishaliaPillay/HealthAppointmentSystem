"use client";

import React, { useEffect, useState } from "react";
import { Card, Typography, Spin } from "antd";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

import {
  useAvailabilityState,
  useAvailabilityActions,
} from "../../../providers/provider-availibility";

const { Title, Text } = Typography;

interface ProviderTimeSlotsProps {
  providerId: string;
  selectedDate: Date;
  onSelectTimeSlot: (startTime: string, endTime: string) => void;
}

const ProviderTimeSlots: React.FC<ProviderTimeSlotsProps> = ({
  providerId,
  selectedDate,
  onSelectTimeSlot,
}) => {
  const { availabilities, isPending } = useAvailabilityState();
  const { fetchAvailabilityByProvider } = useAvailabilityActions();
  const [timeSlots, setTimeSlots] = useState<
    Array<{ start: string; end: string; available: boolean }>
  >([]);

  // Fetch provider availability when providerId changes
  useEffect(() => {
    if (providerId) {
      fetchAvailabilityByProvider(providerId);
    }
  }, [providerId]);

  // Update time slots when availabilities or selectedDate changes
  useEffect(() => {
    if (availabilities?.result) {
      const formattedSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      const matchingAvailability = availabilities.result.find((a) => {
        const availableDate = dayjs(a.dateAvailable).format("YYYY-MM-DD");
        return (
          availableDate === formattedSelectedDate && a.isAvailable === true
        );
      });

      if (matchingAvailability) {
        const slots = generateTimeSlots(
          matchingAvailability.startTime,
          matchingAvailability.endTime
        );
        setTimeSlots(slots);
      } else {
        setTimeSlots([]);
      }
    }
  }, [availabilities, selectedDate]);

  const generateTimeSlots = (startTime: string, endTime: string) => {
    const slots = [];
    let current = dayjs(`2000-01-01 ${startTime}`);
    const end = dayjs(`2000-01-01 ${endTime}`);

    while (current.isBefore(end)) {
      const slotStart = current.format("HH:mm");
      const nextSlot = current.add(30, "minute");
      const slotEnd = nextSlot.format("HH:mm");

      slots.push({
        start: slotStart,
        end: slotEnd,
        available: true,
      });

      current = nextSlot;
    }

    return slots;
  };

  const handleSelectTimeSlot = (start: string, end: string) => {
    onSelectTimeSlot(start, end);
  };

  if (isPending) {
    return <Spin size="large" tip="Loading provider availability..." />;
  }

  return (
    <div>
      <Title level={4}>Available Time Slots</Title>

      {timeSlots.length === 0 ? (
        <Text>No availability found for the selected date</Text>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {timeSlots.map((slot, index) => (
            <Card
              key={index}
              size="small"
              style={{ width: 120, textAlign: "center", cursor: "pointer" }}
              onClick={() => handleSelectTimeSlot(slot.start, slot.end)}
              hoverable
            >
              <div>
                {slot.start} - {slot.end}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderTimeSlots;
