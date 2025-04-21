// src/components/FaceAnalyzer/types.ts
export interface EmotionData {
  emotion: string;
  confidenceScore: number;
}

export interface WellnessData {
  score: number | null;
  tip: string;
}

export interface CameraState {
  active: boolean;
  ready: boolean;
}

export interface FaceAnalysisState {
  modelsLoaded: boolean;
  isScanning: boolean;
  hasScanned: boolean;
}
