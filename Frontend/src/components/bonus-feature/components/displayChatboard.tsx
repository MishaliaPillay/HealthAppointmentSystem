"use client";
import { useState } from "react";
import { analyzeHealthImage } from "../geminiService";
import { useStyles } from "../../../app/patient-dashboard/styles/aiStyle/style";

export default function HealthAnalysisComponent() {
  const { styles } = useStyles();
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

      // Creating a preview
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting the states
    setError("");
    setAnalysis("");

    // Validating the image
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeHealthImage(selectedImage, prompt);
      setAnalysis(result);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Health Image Analysis</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Upload an image:</label>
          <div className={styles.fileInputContainer}>
            <label className={styles.fileInputLabel}>
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </label>
            <span className={styles.fileInputText}>
              {selectedImage ? selectedImage.name : "No file selected"}
            </span>
          </div>
        </div>

        {imagePreview && (
          <div>
            <p className={styles.previewContainer}>Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.previewImage}
            />
          </div>
        )}

        <div>
          <label className={styles.label}>Additional context:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={styles.textarea}
            placeholder="Example: The person appears sad, it may be due to energy loss"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !selectedImage}
          className={styles.button}
        >
          {isLoading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {analysis && (
        <div className={styles.analysisContainer}>
          <h2 className={styles.analysisTitle}>Analysis Result</h2>
          <p className={styles.analysisText}>{analysis}</p>
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              <strong>Disclaimer:</strong> This analysis is for informational
              purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
