"use client";
import { useState } from "react";
import { analyzeHealthImage } from "../face-analyzers/geminiService";
import { useStyles } from "../../../app/patient-dashboard/styles/aiStyle/style";
import jsPDF from "jspdf";
import { Button, Typography, Divider, Space, Card } from "antd"; // Added more Ant Design components
import {
  DownloadOutlined,
  SoundOutlined,
  FileImageOutlined,
} from "@ant-design/icons"; // Added FileImageOutlined

const { Title, Text, Paragraph } = Typography;

// Reading the text using SpeechSynthesis API
const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

// Generating and downloading the analysis report as PDF
const downloadReportAsPDF = (content, fileName = "AI_Health_Report.pdf") => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Health Image Analysis Report", 10, 20);

  // Add date
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 10, 30);

  // Add divider
  doc.line(10, 35, 200, 35);

  // Add content
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 45);

  // Add disclaimer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Disclaimer: This analysis is for informational purposes only and does not constitute medical advice.",
    10,
    doc.internal.pageSize.height - 20
  );

  doc.save(fileName);
};

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
      <Title level={2} className={styles.title}>
        Health Image Analysis
      </Title>
      <Divider />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <Title level={4} className={styles.label}>
            Upload an image
          </Title>
          <div className={styles.fileInputContainer}>
            <label className={styles.fileInputLabel}>
              <FileImageOutlined /> Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </label>
            <Text className={styles.fileInputText}>
              {selectedImage ? selectedImage.name : "No file selected"}
            </Text>
          </div>
        </div>

        {imagePreview && (
          <div>
            <Title level={5} className={styles.previewContainer}>
              Preview
            </Title>
            <Card
              bordered={false}
              style={{ marginBottom: "20px" }}
              bodyStyle={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.previewImage}
              />
            </Card>
          </div>
        )}

        <div>
          <Title level={4} className={styles.label}>
            Additional context
          </Title>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={styles.textarea}
            placeholder="Example: The person appears sad, it may be due to energy loss"
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoading || !selectedImage}
          className={styles.button}
          size="large"
        >
          {isLoading ? "Analyzing..." : "Analyze Image"}
        </Button>
      </form>

      {error && (
        <div className={styles.errorContainer}>
          <Text type="danger" className={styles.errorMessage}>
            {error}
          </Text>
        </div>
      )}

      {analysis && (
        <Card className={styles.analysisContainer}>
          <Title level={3} className={styles.analysisTitle}>
            Analysis Results
          </Title>
          <Divider />

          <div className={styles.analysisContent}>
            <Paragraph className={styles.analysisText}>{analysis}</Paragraph>
          </div>

          <Divider />

          <div className={styles.disclaimer}>
            <Text type="secondary" italic className={styles.disclaimerText}>
              <strong>Disclaimer:</strong> This analysis is for informational
              purposes only and does not constitute medical advice.
            </Text>
          </div>

          <Space className={styles.buttonContainer} size="middle">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => downloadReportAsPDF(analysis)}
              className={styles.button}
            >
              Download PDF
            </Button>
            <Button
              type="default"
              icon={<SoundOutlined />}
              onClick={() => speakText(analysis)}
              className={styles.button}
            >
              Text to Speech
            </Button>
          </Space>
        </Card>
      )}
    </div>
  );
}
