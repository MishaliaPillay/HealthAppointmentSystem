// src/components/FaceAnalyzer/FaceAnalyzer.tsx
"use client";

import React, { useState } from "react";
import styles from "./FaceAnalyzer.module.css";
import { Header } from "./components/Header";
import { ControlPanel } from "./components/ControlPanel";
import { ErrorMessage } from "./components/ErrorMessage";
import { CameraDisplay } from "./components/CameraDisplay";
import { ResultsPanel } from "./components/ResultsPanel";
import { InstructionsPanel } from "./components/InstructionsPanel";
import { useFaceDetection } from "./hooks/useFaceDetection";
import { useCamera } from "./hooks/useCamera";

const FaceAnalyzer = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    videoRef,
    canvasRef,
    cameraActive,
    videoReady,
    toggleCamera,
    handleVideoPlay,
  } = useCamera(setError);

  const {
    modelsLoaded,
    emotion,
    confidenceScore,
    hasScanned,
    wellnessScore,
    wellnessTip,
  } = useFaceDetection(videoRef, canvasRef, cameraActive, videoReady);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <ControlPanel
          modelsLoaded={modelsLoaded}
          cameraActive={cameraActive}
          toggleCamera={toggleCamera}
        />

        {error && <ErrorMessage message={error} />}

        <div className={styles.mainContent}>
          <CameraDisplay
            videoRef={videoRef}
            canvasRef={canvasRef}
            cameraActive={cameraActive}
            modelsLoaded={modelsLoaded}
            handleVideoPlay={handleVideoPlay}
          />

          <ResultsPanel
            cameraActive={cameraActive}
            emotion={emotion}
            confidenceScore={confidenceScore}
            hasScanned={hasScanned}
            wellnessScore={wellnessScore}
            wellnessTip={wellnessTip}
          />
        </div>

        <InstructionsPanel />
      </div>
    </div>
  );
};

export default FaceAnalyzer;
