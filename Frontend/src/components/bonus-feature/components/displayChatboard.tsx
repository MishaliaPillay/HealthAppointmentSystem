"use client";
import { useState } from "react";
import { analyzeHealthImage } from "../geminiService";

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
    <div
      style={{
        maxWidth: "56rem",
        margin: "1.5rem auto",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: "1px solid #dbeafe",
      }}
    >
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#2563eb",
        }}
      >
        Health Image Analysis
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontWeight: "500",
              marginBottom: "0.5rem",
              color: "#1d4ed8",
            }}
          >
            Upload an image:
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
            >
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            <span
              style={{
                marginLeft: "0.75rem",
                color: "#4b5563",
              }}
            >
              {selectedImage ? selectedImage.name : "No file selected"}
            </span>
          </div>
        </div>

        {imagePreview && (
          <div>
            <p
              style={{
                fontWeight: "500",
                marginBottom: "0.5rem",
                color: "#1d4ed8",
              }}
            >
              Preview:
            </p>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxHeight: "16rem",
                borderRadius: "0.375rem",
                border: "1px solid #bfdbfe",
              }}
            />
          </div>
        )}

        <div>
          <label
            style={{
              display: "block",
              fontWeight: "500",
              marginBottom: "0.5rem",
              color: "#1d4ed8",
            }}
          >
            Additional context:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #bfdbfe",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              height: "8rem",
              backgroundColor: "#eff6ff",
              outline: "none",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.2)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            placeholder="Example: The person appears sad, due to energy loss"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !selectedImage}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            fontWeight: "500",
            color: "white",
            backgroundColor:
              isLoading || !selectedImage ? "#93c5fd" : "#2563eb",
            cursor: isLoading || !selectedImage ? "not-allowed" : "pointer",
            border: "none",
            transition: "background-color 0.2s",
            boxShadow:
              isLoading || !selectedImage
                ? "none"
                : "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
          onMouseOver={(e) => {
            if (!isLoading && selectedImage) {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
            }
          }}
          onMouseOut={(e) => {
            if (!isLoading && selectedImage) {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }
          }}
        >
          {isLoading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>

      {error && (
        <p
          style={{
            marginTop: "1rem",
            color: "#dc2626",
            backgroundColor: "#fee2e2",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            border: "1px solid #fecaca",
          }}
        >
          {error}
        </p>
      )}

      {analysis && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            border: "1px solid #bfdbfe",
            borderRadius: "0.375rem",
            backgroundColor: "#eff6ff",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#2563eb",
            }}
          >
            Analysis Result
          </h2>
          <p
            style={{
              color: "#374151",
              whiteSpace: "pre-line",
            }}
          >
            {analysis}
          </p>
          <div
            style={{
              marginTop: "1rem",
              backgroundColor: "#dbeafe",
              padding: "1rem",
              border: "1px solid #bfdbfe",
              borderRadius: "0.375rem",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                color: "#1e40af",
              }}
            >
              <strong>Disclaimer:</strong> This analysis is for informational
              purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
