// app/page.tsx or any route page
import FaceAnalyzer from "../../../components/bonus-feature/FaceAnalyzer";

export default function Homhhe() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Emotion Detection</h1>
      <FaceAnalyzer />
    </div>
  );
}
