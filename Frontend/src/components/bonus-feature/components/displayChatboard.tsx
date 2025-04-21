import { useState } from "react";

export default function HealthAnalysisComponent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setError("");
    setAnalysis("");

    // Validate image
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    // Process image
    setIsLoading(true);
    try {
      // Simulated analysis for the demo
      setTimeout(() => {
        setAnalysis(
          "This person appears to be in good health with normal posture. Their facial expression indicates they may be experiencing mild stress. Regular exercise and mindfulness practices could be beneficial. No immediate medical attention appears necessary."
        );
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm mt-6">
      <h1 className="text-2xl font-semibold text-center mb-8 text-blue-700">
        Health Image Analysis
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Upload an image of a person:
          </label>
          <div className="flex items-center">
            <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <span className="ml-3 text-gray-500">
              {selectedImage ? selectedImage.name : "No file selected"}
            </span>
          </div>
        </div>

        {imagePreview && (
          <div>
            <p className="font-medium mb-2 text-gray-700">Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-64 rounded border"
            />
          </div>
        )}

        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Additional context:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border p-2 rounded h-32 bg-gray-50"
            placeholder="Example: The person appears sad, due to energy loss *****just testing..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !selectedImage}
          className={`px-6 py-2 rounded-md font-medium ${
            isLoading || !selectedImage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {analysis && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            Analysis Result
          </h2>
          <p className="text-gray-700">{analysis}</p>
          <div className="mt-4 bg-yellow-50 p-3 border border-yellow-100 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This analysis is for informational
              purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
