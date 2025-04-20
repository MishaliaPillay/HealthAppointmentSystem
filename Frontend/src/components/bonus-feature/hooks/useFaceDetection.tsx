// src/components/FaceAnalyzer/hooks/useFaceDetection.tsx
import { useState, useEffect, useRef, RefObject } from "react";
import * as faceapi from "face-api.js";

export const useFaceDetection = (
  videoRef: RefObject<HTMLVideoElement>,
  _canvasRef: RefObject<HTMLCanvasElement>,
  cameraActive: boolean,
  videoReady: boolean
) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [emotion, setEmotion] = useState<string>("");
  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const [wellnessScore, setWellnessScore] = useState<number | null>(null);
  const [wellnessTip, setWellnessTip] = useState<string>("");

  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load AI models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL =
          "https://justadudewhohacks.github.io/face-api.js/models";

        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);

        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  // Start/stop analysis when camera or video ready status changes
  useEffect(() => {
    if (cameraActive && videoReady && modelsLoaded) {
      startAnalysis();
      setIsScanning(true);
    } else if (!cameraActive || !videoReady) {
      stopAnalysis();
      setIsScanning(false);
    }

    return () => {
      stopAnalysis();
    };
  }, [cameraActive, videoReady, modelsLoaded]);

  const startAnalysis = () => {
    // Clear any existing interval first
    stopAnalysis();

    analysisIntervalRef.current = setInterval(analyze, 1000);
  };

  const stopAnalysis = () => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
  };

  const analyze = async () => {
    if (!videoRef.current || !modelsLoaded || !videoReady) {
      return;
    }

    try {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections?.expressions) {
        const sorted = Object.entries(detections.expressions).sort(
          // src/components/FaceAnalyzer/hooks/useFaceDetection.tsx (continued)
          ([, a], [, b]) => b - a
        );
        const topEmotion = sorted[0][0];
        const confidence = Math.round(sorted[0][1] * 100);

        setEmotion(topEmotion);
        setConfidenceScore(confidence);
        setHasScanned(true);

        // Set wellness score based on emotion
        let score = 0;
        let tip = "";

        switch (topEmotion) {
          case "happy":
            score = 90;
            tip =
              "Your positive mood is excellent! Try to share your happiness with others today.";
            break;
          case "neutral":
            score = 70;
            tip =
              "You seem balanced today. Take a moment for a brief mindfulness exercise to maintain this calm.";
            break;
          case "sad":
            score = 40;
            tip =
              "Consider reaching out to a friend or trying a mood-lifting activity you enjoy.";
            break;
          case "angry":
            score = 30;
            tip =
              "Try some deep breathing exercises or step away from stressors for a few minutes.";
            break;
          case "fearful":
            score = 35;
            tip =
              "Remind yourself that you're safe. Consider talking through your concerns with someone you trust.";
            break;
          case "disgusted":
            score = 45;
            tip =
              "Try shifting your focus to something pleasant or calming to reset your emotional state.";
            break;
          case "surprised":
            score = 60;
            tip =
              "Take a moment to process what surprised you and use it as an opportunity for reflection.";
            break;
          default:
            score = 50;
            tip =
              "Remember to check in with your emotions regularly throughout the day.";
        }

        setWellnessScore(score);
        setWellnessTip(tip);
      } else {
        setEmotion("None detected");
      }
    } catch (error) {
      console.error("Error analyzing face:", error);
    }
  };

  return {
    modelsLoaded,
    emotion,
    confidenceScore,
    isScanning,
    hasScanned,
    wellnessScore,
    wellnessTip,
  };
};
