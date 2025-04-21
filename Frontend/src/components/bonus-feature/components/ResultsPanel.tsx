// src/components/FaceAnalyzer/components/ResultsPanel.tsx
import React from "react";
import styles from "../FaceAnalyzer.module.css";
import { EmotionDisplay } from "./EmotionDisplay";
import { WellnessInsights } from "./WellnessInsights";

interface ResultsPanelProps {
  cameraActive: boolean;
  emotion: string;
  confidenceScore: number;
  hasScanned: boolean;
  wellnessScore: number | null;
  wellnessTip: string;
}

export const ResultsPanel = ({
  cameraActive,
  emotion,
  confidenceScore,
  hasScanned,
  wellnessScore,
  wellnessTip,
}: ResultsPanelProps) => {
  return (
    <div
      className={styles.resultsContainer}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <EmotionDisplay
        cameraActive={cameraActive}
        emotion={emotion}
        confidenceScore={confidenceScore}
      />

      <WellnessInsights
        cameraActive={cameraActive}
        hasScanned={hasScanned}
        emotion={emotion}
        wellnessScore={wellnessScore}
        wellnessTip={wellnessTip}
      />
    </div>
  );
};
