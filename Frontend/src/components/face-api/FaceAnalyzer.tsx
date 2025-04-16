// components/bonusfeatures/FaceAnalyzer.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceAnalyzer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [emotion, setEmotion] = useState<string>("");
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load models
  const loadModels = async () => {
    try {
      const MODEL_URL = "/models"; // must be in the public folder
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
      console.log("Models loaded successfully");
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  // Start webcam
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Analyze face expressions
  const analyze = async () => {
    if (!videoRef.current || !modelsLoaded) return;

    try {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections?.expressions) {
        const sorted = Object.entries(detections.expressions).sort(
          ([, a], [, b]) => b - a
        );
        const topEmotion = sorted[0][0];
        setEmotion(topEmotion);
      }
    } catch (error) {
      console.error("Error analyzing face:", error);
    }
  };

  useEffect(() => {
    loadModels().then(() => {
      startVideo();
    });

    return () => {
      // Cleanup function
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!modelsLoaded) return;

    const interval = setInterval(analyze, 1000);
    return () => clearInterval(interval);
  }, [modelsLoaded]);

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} autoPlay muted width="400" height="300" />
      <div className="text-lg font-semibold">
        {modelsLoaded ? (
          <>
            Detected Emotion:{" "}
            <span className="text-blue-500">{emotion || "None detected"}</span>
          </>
        ) : (
          <>Loading models...</>
        )}
      </div>
    </div>
  );
};

// Only one default export per file
export default FaceAnalyzer;
