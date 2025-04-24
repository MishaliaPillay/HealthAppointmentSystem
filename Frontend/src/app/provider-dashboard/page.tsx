"use client";
import { Row, Col, Spin } from "antd";
import styles from "./providerdashdash.module.css";
import { useEffect, useState, useCallback } from "react";

import {
  useProviderState,
  useProviderActions,
} from "@/providers/providerMedicPrac-provider";
import { useUserActions } from "@/providers/users-provider";
import axios from "axios";

import { PracticeStats } from "../../components/provider-dashboard/PracticeStats";
import { TodaysAppointments } from "../../components/provider-dashboard/TodaysAppointments";
import { QuickActions } from "../../components/provider-dashboard/QuickActions";
import { WelcomeCard } from "../../components/provider-dashboard/WelcomeCard";
import {
  Patient,
  Appointment,
  Provider,
} from "../../components/provider-dashboard/models";

export default function ProviderDashboard() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [weekAppointments, setWeekAppointments] = useState<Appointment[]>([]);
  const [patientDetails, setPatientDetails] = useState<Record<string, Patient>>(
    {}
  );

  const { currentProvider, isPending, isError } = useProviderState();
  const { getCurrentProvider } = useProviderActions();
  const { getCurrentUser } = useUserActions();

  useEffect(() => {
    fetchProviderOnReload();
  }, []);

  // Track loading state
  useEffect(() => {
    setLoading(isPending);
    if (isError) setLoading(false);
  }, [isPending, isError]);

  const fetchProviderOnReload = async () => {
    const token = sessionStorage.getItem("jwt");
    if (!token) return;

    try {
      setLoading(true);
      const user = await getCurrentUser(token);
      await getCurrentProvider(user.id);
    } catch (err) {
      console.error("Error loading provider/user data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Memoize fetchAppointments to prevent recreation on each render
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("jwt");
      if (!token || !currentProvider) return;

      const response = await axios.get(
        `https://healthappointmentsystem-2.onrender.com/api/services/app/Appointment/GetAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Extract appointments from the nested structure
      const allAppointments: Appointment[] = response.data.result.items || [];

      console.log(allAppointments);

      // Filter appointments for current provider
      const providerAppointments = allAppointments.filter(
        (appointment) => appointment.providerId === currentProvider.id
      );

      console.log(providerAppointments);

      setAppointments(providerAppointments);

      // Calculate today's appointments (fix: use date range to avoid timezone issues)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Start of tomorrow

      const todayApps = providerAppointments.filter((app) => {
        const appDate = new Date(app.appointmentDate);
        return appDate >= today && appDate < tomorrow;
      });
      setTodayAppointments(todayApps);
      console.log("Today’s Appointments:", todayApps);

      // Calculate this week's appointments (fix: zero out time)
      const currentDate = new Date();

      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      startOfWeek.setHours(0, 0, 0, 0); // Start of week

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999); // End of week

      const weekApps = providerAppointments.filter((app) => {
        const appDate = new Date(app.appointmentDate);
        return appDate >= startOfWeek && appDate <= endOfWeek;
      });
      setWeekAppointments(weekApps);
      console.log("This Week’s Appointments:", weekApps);

      console.log(weekApps);

      // Get unique patient IDs from today's appointments
      const patientIds: string[] = [
        ...new Set(todayApps.map((app) => app.patientId)),
      ];

      // Fetch patient details in batch
      const newPatientDetails = { ...patientDetails };
      const fetchPromises = patientIds.map(async (patientId: string) => {
        // Skip if we already have this patient's details
        if (newPatientDetails[patientId]) return;

        try {
          const response = await axios.get(
            `/api/services/app/Patient/Get?id=${patientId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          newPatientDetails[patientId] = response.data.result;
          console.log(newPatientDetails);
        } catch (err) {
          console.error(
            `Error fetching details for patient ${patientId}:`,
            err
          );
        }
      });

      await Promise.all(fetchPromises);
      setPatientDetails(newPatientDetails);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  }, [currentProvider]);

  useEffect(() => {
    if (currentProvider) {
      fetchAppointments();
    }
  }, [currentProvider, fetchAppointments]);

  // Helper function to get patient initials
  const getPatientInitials = (patientId: string): string => {
    const patient = patientDetails[patientId];
    if (!patient || !patient.user) return "??";

    const firstName = patient.user.name || "";
    const lastName = patient.user.surname || "";

    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Helper function to get patient full name
  const getPatientName = (patientId: string): string => {
    const patient = patientDetails[patientId];
    if (!patient || !patient.user) return "Unknown Patient";

    return `${patient.user.name || ""} ${patient.user.surname || ""}`.trim();
  };

  // Check if patient is new (first appointment)
  const isNewPatient = (patientId: string): boolean => {
    // Count appointments for this patient
    const patientAppointments = appointments.filter(
      (app) => app.patientId === patientId
    );
    return patientAppointments.length === 1;
  };

  if (loading || !currentProvider) {
    return (
      <div className="spin-container">
        <Spin spinning tip="Loading patient data..." />
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <WelcomeCard
        provider={currentProvider as Provider} // Use type assertion to fix type mismatch
        appointmentCount={todayAppointments.length}
      />

      <Row gutter={[24, 24]} className={styles.rowSpacing}>
        <Col xs={24} md={12}>
          <QuickActions />
        </Col>
        <Col xs={24} md={12}>
          <PracticeStats
            todayAppointments={todayAppointments}
            weekAppointments={weekAppointments}
          />
        </Col>
      </Row>

      <TodaysAppointments
        appointments={todayAppointments}
        getPatientInitials={getPatientInitials}
        getPatientName={getPatientName}
        isNewPatient={isNewPatient}
      />
    </div>
  );
}
