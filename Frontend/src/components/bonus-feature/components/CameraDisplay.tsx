// src/components/FaceAnalyzer/components/CameraDisplay.tsx
import React, { RefObject } from "react";
import styles from "../FaceAnalyzer.module.css";

interface CameraDisplayProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  cameraActive: boolean;
  modelsLoaded: boolean;
  handleVideoPlay: () => void;
}

export const CameraDisplay = ({
  videoRef,
  canvasRef,
  cameraActive,
  modelsLoaded,
  handleVideoPlay,
}: CameraDisplayProps) => {
  return (
    <div
      className={styles.cameraContainer}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/3",
        backgroundColor: "#f3f4f6",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="100%"
        height="100%"
        style={{
          display: cameraActive ? "block" : "none",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onPlay={handleVideoPlay}
        // onLoadedMetadata={() => console.log("Video metadata loaded")}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: cameraActive ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {cameraActive ? (
        <CameraOverlay />
      ) : (
        <CameraPlaceholder modelsLoaded={modelsLoaded} />
      )}
    </div>
  );
};

const CameraOverlay = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          right: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.25rem",
        }}
      >
        <div
          style={{
            height: "0.5rem",
            width: "0.5rem",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
        <span>REC</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.25rem",
        }}
      >
        <div
          style={{
            height: "0.5rem",
            width: "0.5rem",
            borderRadius: "50%",
            backgroundColor: "#10b981",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
        <span>Analyzing</span>
      </div>
    </>
  );
};

const CameraPlaceholder = ({ modelsLoaded }: { modelsLoaded: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        <svg
          style={{
            margin: "0 auto",
            height: "3rem",
            width: "3rem",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p
          style={{
            marginTop: "0.25rem",
          }}
        >
          {modelsLoaded
            ? "Camera inactive - Click 'Start Camera'"
            : "Loading AI models..."}
        </p>
      </div>
    </div>
  );
};
