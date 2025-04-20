// src/components/FaceAnalyzer/components/ControlPanel.tsx
import React from "react";
import styles from "../FaceAnalyzer.module.css";

interface ControlPanelProps {
  modelsLoaded: boolean;
  cameraActive: boolean;
  toggleCamera: () => void;
}

export const ControlPanel = ({
  modelsLoaded,
  cameraActive,
  toggleCamera,
}: ControlPanelProps) => {
  return (
    <div className={styles.controls}>
      <div className={styles.statusIndicator}>
        <div
          className={`${styles.statusDot} ${
            modelsLoaded && cameraActive
              ? styles.statusReady
              : styles.statusLoading
          }`}
        ></div>
        <span className={styles.statusText}>
          {!modelsLoaded
            ? "Initializing AI models..."
            : !cameraActive
            ? "Camera inactive"
            : "Analysis active"}
        </span>
      </div>

      <button
        onClick={toggleCamera}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: "pointer",
          border: "none",
          color: "white",
          backgroundColor: cameraActive ? "#dc2626" : "#2563eb",
          transition: "background-color 0.2s",
        }}
      >
        {cameraActive ? "Stop Camera" : "Start Camera"}
      </button>
    </div>
  );
};
