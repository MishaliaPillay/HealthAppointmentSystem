"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Spin,
  Steps,
  Button,
  Form,
  DatePicker,
  Input,
  Alert,
} from "antd";
import {
  useLocationState,
  useLocationActions,
} from "../../../providers/institutionLocation-provider";
import {
  useProvidersInstitionActions,
  useProvidersInstitionState,
} from "../../../providers/providerInstituion-provider";
import { useAppointmentActions } from "../../../providers/appointment-provider";
import {
  IAppointment,
  IAppointments,
} from "../../../providers/appointment-provider/models";
import { useProviderActions } from "../../../providers/providerMedicPrac-provider";
import { usePatientActions } from "../../../providers/paitient-provider";
import { ProviderAvailabilityProvider } from "../../../providers/provider-availibility";
import {
  UserOutlined,
  PhoneOutlined,
  ExperimentOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import { useUserActions } from "@/providers/users-provider";
import {
  IInstitution,
  IProvider,
} from "@/providers/institutionLocation-provider/context";
import ProviderTimeSlots from "../provider-times/provider-timeslot";
import styles from "./booking.module.css";

const { Step } = Steps;

const specialties = [
  "Cardiology",
  "Doctor",
  "Dermatology",
  "Family Medicine",
  "Gastroenterology",
  "Internal Medicine",
  "Neurology",
  "Obstetrics",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology",
];
export interface IProviderCardDisplay {
  id: number;
  userId: number;
  userName: string;
  fullName: string;
  title: string;
  biography: string;
  phoneNumber: string;
  maxAppointmentsPerDay: number;
  qualification: string;
  speciality: string;
  yearsOfExperience: number;
}

const BookingComponent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<
    number | null
  >(null);
  const [selectedDoctor, setSelectedDoctor] =
    useState<Partial<IProvider> | null>(null);

  const [providerData, setProviderData] = useState<Partial<IProvider>>(null);
  const [currentPatientId, setCurrentPatientId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [appointmentForm] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { institutions, isPending: loadingInstitutions } = useLocationState();
  const { providers, isPending: loadingProviders } =
    useProvidersInstitionState();
  const { bookAppointment } = useAppointmentActions();
  const { getCurrentProvider } = useProviderActions();
  const { getProviderInInstitution } = useProvidersInstitionActions();
  const { getInstitutionsWithSpecialty } = useLocationActions();
  const { getCurrentUser } = useUserActions();
  const { getCurrentPatient } = usePatientActions();

  // Fetch current user/patient information on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("jwt");
        if (!token) return;

        const user = await getCurrentUser(token);
        const patient = await getCurrentPatient(user.id);

        if (patient?.id) {
          setCurrentPatientId(patient.id);
        }
      } catch (err) {
        console.error("Error fetching current user or patient:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSpecialtySelect = async (specialty: string) => {
    setSelectedSpecialty(specialty);
    await getInstitutionsWithSpecialty(specialty);
    setCurrentStep(1);
  };

  const handleInstitutionSelect = async (institutionId: number) => {
    setSelectedInstitutionId(institutionId);
    await getProviderInInstitution(institutionId);
    setCurrentStep(2);
  };

  const handleProviderSelect = async (doctor: IProvider) => {
    setSelectedDoctor(doctor);
    try {
      setLoading(true);
      const providerDetails = await getCurrentProvider(doctor.userId);

      setProviderData(providerDetails);
    } catch (error) {
      console.error("Error fetching provider details:", error);
    } finally {
      setLoading(false);
      setCurrentStep(3);
      appointmentForm.resetFields();
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    appointmentForm.setFieldsValue({
      appointmentTime: time,
    });
  };

  const handleAppointmentSubmit = async (values: IAppointment) => {
    if (!providerData?.id || !selectedDate || !selectedTime) {
      console.error("Missing required appointment data");
      return;
    }

    setIsSubmitting(true);
    try {
      const appointmentData: IAppointments = {
        appointmentDate: selectedDate.toDate(),
        appointmentTime: selectedTime,
        purpose: values.purpose,
        appointmentStatus: 1,
        providerId: providerData.id,
        patientId: currentPatientId,
      };

      await bookAppointment(appointmentData);
      setCurrentStep(4);
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProviders =
    providers?.result?.filter(
      (provider) => provider.speciality === selectedSpecialty
    ) || [];

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ProviderAvailabilityProvider>
      <div className={styles.bookingContainer}>
        <div className={styles.stepContainer}>
          <Steps current={currentStep}>
            <Step title="Specialty" />
            <Step title="Institution" />
            <Step title="Doctor" />
            <Step title="Appointment Details" />
            <Step title="Confirmation" />
          </Steps>
        </div>

        {currentStep === 0 && (
          <div>
            <h2 className={styles.sectionTitle}>Select a Specialty</h2>
            <div className={styles.specialtyButtonsContainer}>
              {specialties.map((spec) => (
                <Button
                  key={spec}
                  className={styles.specialtyButton}
                  onClick={() => handleSpecialtySelect(spec)}
                >
                  {spec}
                </Button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className={styles.sectionTitle}>
              Institutions with {selectedSpecialty} Specialists
            </h2>
            {loadingInstitutions ? (
              <div className={styles.spinnerContainer}>
                <Spin />
              </div>
            ) : (
              <Row gutter={[16, 16]}>
                {(institutions || []).map((inst: IInstitution) => (
                  <Col key={inst.institutionId} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      className={styles.institutionCard}
                      title={
                        <span className={styles.institutionCardTitle}>
                          {inst.institutionName}
                        </span>
                      }
                      onClick={() =>
                        handleInstitutionSelect(inst.institutionId)
                      }
                    >
                      <p className={styles.doctorInfo}>
                        <EnvironmentOutlined
                          className={styles.doctorInfoIcon}
                        />
                        {inst.address}
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div key={selectedInstitutionId}>
            <h2 className={styles.sectionTitle}>
              Doctors at Selected Institution
            </h2>
            {loadingProviders ? (
              <div className={styles.spinnerContainer}>
                <Spin />
              </div>
            ) : (
              <Row gutter={[16, 16]}>
                {(filteredProviders as IProviderCardDisplay[]).map((doc) => (
                  <Col key={doc.userId} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      className={styles.doctorCard}
                      title={
                        <span className={styles.doctorCardTitle}>
                          {doc.fullName}
                        </span>
                      }
                      onClick={() =>
                        handleProviderSelect(doc as unknown as IProvider)
                      }
                    >
                      <p className={styles.doctorInfo}>
                        <UserOutlined className={styles.doctorInfoIcon} />
                        Specialty: {doc.speciality}
                      </p>
                      <p className={styles.doctorInfo}>
                        <PhoneOutlined className={styles.doctorInfoIcon} />
                        Phone: {doc.phoneNumber}
                      </p>
                      <p className={styles.doctorInfo}>
                        <ExperimentOutlined className={styles.doctorInfoIcon} />
                        Experience: {doc.yearsOfExperience} years
                      </p>
                      <p className={styles.doctorInfo}>
                        <TrophyOutlined className={styles.doctorInfoIcon} />
                        Qualification: {doc.qualification}
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}

        {currentStep === 3 && selectedDoctor && (
          <div>
            <h2 className={styles.sectionTitle}>
              Book an Appointment with Dr. {selectedDoctor.fullName}
            </h2>
            <Card className={styles.appointmentSummaryCard}>
              <p className={styles.doctorInfo}>
                <UserOutlined className={styles.doctorInfoIcon} />
                Doctor: Dr. {selectedDoctor.fullName}
              </p>
              <p className={styles.doctorInfo}>
                <ExperimentOutlined className={styles.doctorInfoIcon} />
                Specialty: {selectedDoctor.speciality}
              </p>
            </Card>

            <Form
              form={appointmentForm}
              layout="vertical"
              onFinish={handleAppointmentSubmit}
              className={styles.appointmentForm}
            >
              <Form.Item
                name="appointmentDate"
                label="Appointment Date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    className={styles.datePicker}
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                    onChange={handleDateChange}
                  />
                </div>
              </Form.Item>

              {selectedDate && providerData && (
                <Form.Item
                  name="appointmentTime"
                  label="Appointment Time"
                  rules={[
                    { required: true, message: "Please select a time slot" },
                  ]}
                >
                  <div className={styles.timeSlotsContainer}>
                    <ProviderTimeSlots
                      providerId={providerData.id}
                      selectedDate={selectedDate.toDate()}
                      onSelectTimeSlot={handleTimeSelect}
                    />
                  </div>
                </Form.Item>
              )}

              {!selectedDate && (
                <Alert
                  message="Please select a date to view available time slots"
                  type="info"
                  showIcon
                  className={styles.alert}
                />
              )}

              <Form.Item
                name="purpose"
                label="Purpose of Appointment"
                rules={[
                  { required: true, message: "Please enter the purpose" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Describe the reason for your appointment"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  disabled={!selectedDate || !selectedTime}
                  className={styles.submitButton}
                >
                  Book Appointment
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        {currentStep === 4 && (
          <div className={styles.confirmationContainer}>
            <h2 className={styles.confirmationTitle}>
              Appointment Successfully Booked!
            </h2>
            <p className={styles.confirmationDetails}>
              Your appointment with Dr. {selectedDoctor?.fullName} has been
              scheduled for {selectedDate?.format("MMMM D, YYYY")} at{" "}
              {selectedTime}.
            </p>
            <p className={styles.confirmationDetails}>
              Please check your WhatsApp or SMS for confirmation details.
            </p>
            <Button
              type="primary"
              onClick={() => setCurrentStep(0)}
              className={styles.backButton}
            >
              Book Another Appointment
            </Button>
          </div>
        )}
      </div>
    </ProviderAvailabilityProvider>
  );
};

export default BookingComponent;
