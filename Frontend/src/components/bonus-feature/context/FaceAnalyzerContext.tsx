// src/components/FaceAnalyzer/context/FaceAnalyzerContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import {
  CameraState,
  EmotionData,
  WellnessData,
  FaceAnalysisState,
} from "../face-analyzers/types";

interface FaceAnalyzerContextType {
  camera: CameraState;
  analysis: FaceAnalysisState;
  emotion: EmotionData;
  wellness: WellnessData;
  toggleCamera: () => void;
}

const FaceAnalyzerContext = createContext<FaceAnalyzerContextType | undefined>(
  undefined
);

interface FaceAnalyzerProviderProps {
  children: ReactNode;
  value: FaceAnalyzerContextType;
}

export const FaceAnalyzerProvider = ({
  children,
  value,
}: FaceAnalyzerProviderProps) => {
  return (
    <FaceAnalyzerContext.Provider value={value}>
      {children}
    </FaceAnalyzerContext.Provider>
  );
};

export const useFaceAnalyzerContext = () => {
  const context = useContext(FaceAnalyzerContext);
  if (context === undefined) {
    throw new Error(
      "useFaceAnalyzerContext must be used within a FaceAnalyzerProvider"
    );
  }
  return context;
};
