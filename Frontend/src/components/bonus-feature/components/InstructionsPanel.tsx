
import React from "react";

export const InstructionsPanel = () => {
  return (
    <div
      style={{
        marginTop: "1.5rem",
        backgroundColor: "#eef2ff",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      <h3
        style={{
          color: "#4338ca",
          fontWeight: 500,
          fontSize: "1rem",
          margin: "0 0 0.75rem 0",
        }}
      >
        Emotional Wellbeing Check:
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "0.75rem",
        }}
      >
        <InstructionStep
          step="1"
          description="Ensure you're in a well-lit environment for accurate detection"
        />
        <InstructionStep
          step="2"
          description="Position yourself clearly in the frame for best results"
        />
        <InstructionStep
          step="3"
          description="Review your results and follow the personalized wellbeing tips"
        />
      </div>
      <p
        style={{
          marginTop: "1rem",
          color: "#4338ca",
          fontSize: "0.75rem",
          fontStyle: "italic",
        }}
      >
        Regular emotional check-ins can help you monitor patterns and improve
        your overall mental wellbeing.
      </p>
    </div>
  );
};

interface InstructionStepProps {
  step: string;
  description: string;
}

const InstructionStep = ({ step, description }: InstructionStepProps) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "0.75rem",
        borderRadius: "0.25rem",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          color: "#4338ca",
          fontWeight: 500,
          fontSize: "0.875rem",
          marginBottom: "0.25rem",
        }}
      >
        Step {step}
      </div>
      <p
        style={{
          color: "#6b7280",
          fontSize: "0.875rem",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
};
