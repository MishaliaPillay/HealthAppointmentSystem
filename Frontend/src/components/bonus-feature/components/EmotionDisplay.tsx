
import React from "react";

interface EmotionDisplayProps {
  cameraActive: boolean;
  emotion: string;
  confidenceScore: number;
}

export const EmotionDisplay = ({
  cameraActive,
  emotion,
  confidenceScore,
}: EmotionDisplayProps) => {
  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      <h3
        style={{
          color: "#1e40af",
          fontWeight: 500,
          fontSize: "1rem",
          margin: "0 0 0.75rem 0",
        }}
      >
        Your Emotional State
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              margin: "0 0 0.25rem 0",
            }}
          >
            Current Emotion:
          </p>
          {cameraActive ? (
            emotion ? (
              <p
                style={{
                  color: "#2563eb",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </p>
            ) : (
              <p
                style={{
                  color: "#2563eb",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Analyzing...
              </p>
            )
          ) : (
            <p
              style={{
                color: "#6b7280",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              Start camera to detect emotions
            </p>
          )}
        </div>

        <ConfidenceBar
          cameraActive={cameraActive}
          confidenceScore={confidenceScore}
        />
      </div>
    </div>
  );
};

interface ConfidenceBarProps {
  cameraActive: boolean;
  confidenceScore: number;
}

const ConfidenceBar = ({
  cameraActive,
  confidenceScore,
}: ConfidenceBarProps) => {
  return (
    <div>
      <p
        style={{
          color: "#6b7280",
          fontSize: "0.875rem",
          margin: "0 0 0.25rem 0",
        }}
      >
        Detection Confidence:
      </p>
      <div
        style={{
          width: "100%",
          height: "0.625rem",
          backgroundColor: "#e5e7eb",
          borderRadius: "0.25rem",
          marginTop: "0.25rem",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#2563eb",
            borderRadius: "0.25rem",
            transition: "width 0.3s ease",
            width: `${cameraActive ? confidenceScore : 0}%`,
          }}
        ></div>
      </div>
      <p
        style={{
          textAlign: "right",
          color: "#6b7280",
          fontSize: "0.75rem",
          margin: "0.25rem 0 0 0",
        }}
      >
        {cameraActive ? `${confidenceScore}%` : "0%"}
      </p>
    </div>
  );
};
