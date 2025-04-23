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

import dayjs from "dayjs";
import { useUserActions } from "@/providers/users-provider";
import {
  IInstitution,
  IProvider,
} from "@/providers/institutionLocation-provider/context";
import ProviderTimeSlots from "../provider-times/provider-timeslot";

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
      console.log("doctor ", doctor);
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
    console.log("curre", currentPatientId);
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

  console.log(institutions);

  if (loading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  return (
    <ProviderAvailabilityProvider>
      <div className="p-6">
        <Steps current={currentStep} className="mb-6">
          <Step title="Specialty" />
          <Step title="Institution" />
          <Step title="Doctor" />
          <Step title="Appointment Details" />
          <Step title="Confirmation" />
        </Steps>
        {currentStep === 0 && (
          <div>
            <h2 className="mb-4">Select a Specialty</h2>
            <Row gutter={[16, 16]}>
              {specialties.map((spec) => (
                <Col key={spec}>
                  <Button
                    type="primary"
                    onClick={() => handleSpecialtySelect(spec)}
                  >
                    {spec}
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className="mb-4">
              Institutions with {selectedSpecialty} Specialists
            </h2>
            {loadingInstitutions ? (
              <Spin />
            ) : (
              <Row gutter={[16, 16]}>
                {(institutions || []).map((inst: IInstitution) => (
                  <Col key={inst.institutionId} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      title={inst.institutionName}
                      onClick={() =>
                        handleInstitutionSelect(inst.institutionId)
                      }
                    >
                      <p>Address: {inst.address}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
        {currentStep === 2 && (
          <div key={selectedInstitutionId}>
            <h2 className="mb-4">Doctors at Selected Institution</h2>
            {loadingProviders ? (
              <Spin />
            ) : (
              <Row gutter={[16, 16]}>
                {(filteredProviders as IProviderCardDisplay[]).map((doc) => (
                  <Col key={doc.userId} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      title={doc.fullName}
                      onClick={() =>
                        handleProviderSelect(doc as unknown as IProvider)
                      } // cast only where needed
                    >
                      <p>Specialty: {doc.speciality}</p>
                      <p>Phone: {doc.phoneNumber}</p>
                      <p>Experience: {doc.yearsOfExperience} years</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
        {currentStep === 3 && selectedDoctor && (
          <div>
            <h2 className="mb-4">
              Book an Appointment with Dr. {selectedDoctor.fullName}
            </h2>
            <Card className="mb-4">
              <p>Doctor: {selectedDoctor.fullName}</p>
              <p>Specialty: {selectedDoctor.speciality}</p>
            </Card>

            <Form
              form={appointmentForm}
              layout="vertical"
              onFinish={handleAppointmentSubmit}
            >
              <Form.Item
                name="appointmentDate"
                label="Appointment Date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                  onChange={handleDateChange}
                />
              </Form.Item>

              {selectedDate && providerData && (
                <Form.Item
                  name="appointmentTime"
                  label="Appointment Time"
                  rules={[
                    { required: true, message: "Please select a time slot" },
                  ]}
                >
                  <ProviderTimeSlots
                    providerId={providerData.id}
                    selectedDate={selectedDate.toDate()}
                    onSelectTimeSlot={handleTimeSelect}
                  />
                </Form.Item>
              )}

              {!selectedDate && (
                <Alert
                  message="Please select a date to view available time slots"
                  type="info"
                  showIcon
                  className="mb-4"
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
                >
                  Book Appointment
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {currentStep === 4 && (
          <div className="text-center">
            <h2 className="mb-4">Appointment Successfully Booked!</h2>
            <p>
              Your appointment with Dr. {selectedDoctor?.fullName} has been
              scheduled for {selectedDate?.format("MMMM D, YYYY")} at{" "}
              {selectedTime}.
            </p>
            <p>Please check your WhatsApp and SMS for confirmation details.</p>
            <Button type="primary" onClick={() => setCurrentStep(0)}>
              Book Another Appointment
            </Button>
          </div>
        )}
      </div>
    </ProviderAvailabilityProvider>
  );
};

export default BookingComponent;
