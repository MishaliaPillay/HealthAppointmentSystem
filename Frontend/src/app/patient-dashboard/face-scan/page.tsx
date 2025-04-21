import HealthAnalysisComponent from "@/components/bonus-feature/components/displayChatboard";
import FaceAnalyzer from "../../../components/bonus-feature/FaceAnalyzer";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Emotion Detection</h1>
      <FaceAnalyzer />
      <div>
        <HealthAnalysisComponent />
      </div>
    </div>
  );
}
