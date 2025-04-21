"use client";
import React, { useState } from "react";
import { Card, Col, Row, Spin, Steps, Button } from "antd";
import {
  useLocationState,
  useLocationActions,
} from "../../../providers/institutionLocation-provider";
import {
  useProvidersInstitionActions,
  useProvidersInstitionState,
} from "../../../providers/providerInstituion-provider";

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

interface IInstitution {
  institutionId: number;
  institutionName: string;
  address: string;
}

interface Provider {
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

  const { institutions, isPending: loadingInstitutions } =
    useLocationState() as unknown as {
      institutions: IInstitution[];
      isPending: boolean;
    };

  const { providers, isPending: loadingProviders } =
    useProvidersInstitionState();

  const { getProviderInInstitution } = useProvidersInstitionActions();
  const { getInstitutionsWithSpecialty } = useLocationActions();

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

  const filteredProviders: Provider[] | undefined = providers?.result.filter(
    (provider) => provider.speciality === selectedSpecialty
  );

  return (
    <div className="p-6">
      <Steps current={currentStep} className="mb-6">
        <Step title="Specialty" />
        <Step title="Institution" />
        <Step title="Doctor" />
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
              {(institutions || []).map((inst) => (
                <Col key={inst.institutionId} xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    title={inst.institutionName}
                    onClick={() => handleInstitutionSelect(inst.institutionId)}
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
              {(filteredProviders || []).map((doc: Provider) => (
                <Col key={doc.userId} xs={24} sm={12} md={8}>
                  <Card title={doc.fullName}>
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
    </div>
  );
};

export default BookingComponent;
