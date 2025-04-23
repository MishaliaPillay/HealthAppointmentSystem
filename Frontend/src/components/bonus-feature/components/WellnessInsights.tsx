
import React from "react";

interface WellnessInsightsProps {
  cameraActive: boolean;
  hasScanned: boolean;
  emotion: string;
  wellnessScore: number | null;
  wellnessTip: string;
}

export const WellnessInsights = ({
  cameraActive,
  hasScanned,
  emotion,
  wellnessScore,
  wellnessTip,
}: WellnessInsightsProps) => {
  return (
    <div
      style={{
        backgroundColor: "#eff6ff",
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
        Wellbeing Insights
      </h3>

      {cameraActive ? (
        hasScanned && emotion && wellnessScore !== null ? (
          <WellnessContent
            wellnessScore={wellnessScore}
            wellnessTip={wellnessTip}
          />
        ) : (
          <AnalyzingState />
        )
      ) : (
        <InactiveState />
      )}
    </div>
  );
};

interface WellnessContentProps {
  wellnessScore: number;
  wellnessTip: string;
}

const WellnessContent = ({
  wellnessScore,
  wellnessTip,
}: WellnessContentProps) => {
  return (
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
          Emotional Wellness Score:
        </p>
        <div
          style={{
            width: "100%",
            height: "1rem",
            backgroundColor: "#e5e7eb",
            borderRadius: "0.25rem",
            marginTop: "0.5rem",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "0.25rem",
              transition: "width 0.3s ease",
              width: `${wellnessScore}%`,
              backgroundColor:
                wellnessScore >= 80
                  ? "#10b981"
                  : wellnessScore >= 60
                  ? "#0ea5e9"
                  : wellnessScore >= 40
                  ? "#eab308"
                  : "#ef4444",
            }}
          ></div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "#6b7280",
            marginTop: "0.25rem",
          }}
        >
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "0.75rem",
          borderRadius: "0.25rem",
          borderLeft: "4px solid #2563eb",
        }}
      >
        <p
          style={{
            color: "#374151",
            fontSize: "0.875rem",
            fontWeight: 500,
            margin: "0 0 0.25rem 0",
          }}
        >
          Wellness Tip:
        </p>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          {wellnessTip}
        </p>
      </div>
    </div>
  );
};

const AnalyzingState = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "6rem",
      }}
    >
      <p
        style={{
          color: "#6b7280",
          textAlign: "center",
          margin: 0,
        }}
      >
        Analyzing your emotional state...
      </p>
    </div>
  );
};

const InactiveState = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "6rem",
      }}
    >
      <p
        style={{
          color: "#6b7280",
          textAlign: "center",
          margin: 0,
        }}
      >
        Start camera to get wellbeing insights
      </p>
    </div>
  );
};
