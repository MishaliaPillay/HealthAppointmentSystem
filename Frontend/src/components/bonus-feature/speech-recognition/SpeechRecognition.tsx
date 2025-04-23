"use client";
import { Select, Button, Alert, Typography } from "antd";
const { Option } = Select;
const { Title, Paragraph } = Typography;

import jsPDF from "jspdf";
import React, { useState } from "react";
import { useSpeechRecognition } from "../../../utils/useSpeechRecognition";
import { useSummarizer } from "../../../utils/useSummarizer";

const languages = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ja-JP", name: "Japanese" },
];

const SpeechTranscriber: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const {
    isRecording,
    transcripts,
    currentTranscript,
    error,
    isSupported,
    toggleRecording,
    clear,
  } = useSpeechRecognition(selectedLanguage);

  const {
    summary,
    isSummarizing,
    summaryError,
    generateSummary,
    setSummary,
    setSummaryError,
  } = useSummarizer();

  const exportSummary = () => {
    if (!summary) return;
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(16);
    doc.text("Conversation Summary", 10, y);
    y += 10;
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(summary, 180);
    doc.text(lines, 10, y);
    doc.save(`summary-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const handleLanguageChange = (value: string) => {
    if (isRecording) toggleRecording(); // stop before changing
    setSelectedLanguage(value);
    setSummary("");
    setSummaryError(null);
  };

  if (!isSupported) {
    return (
      <Alert
        message="Browser Not Supported"
        description="Try using Chrome or Edge."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <Title level={2}>Conversation Transcriber & Summarizer</Title>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          disabled={isRecording}
          style={{ width: 200 }}
        >
          {languages.map((lang) => (
            <Option key={lang.code} value={lang.code}>
              {lang.name}
            </Option>
          ))}
        </Select>

        <Button
          onClick={toggleRecording}
          type={isRecording ? "primary" : "default"}
          danger={isRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        <Button
          onClick={() => {
            clear();
            setSummary("");
            setSummaryError(null);
          }}
          disabled={isRecording || transcripts.length === 0}
        >
          Clear All
        </Button>

        <Button
          onClick={() => generateSummary(transcripts)}
          disabled={isRecording || transcripts.length === 0 || isSummarizing}
          loading={isSummarizing}
          type="primary"
        >
          Generate Summary
        </Button>

        {summary && <Button onClick={exportSummary}>Export Summary</Button>}
      </div>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginTop: "1rem" }}
        />
      )}

      <div style={{ marginTop: "1rem" }}>
        {isRecording ? (
          <Paragraph type="warning">
            🔴 <strong>Recording...</strong>
          </Paragraph>
        ) : (
          <Paragraph type="secondary">Ready to record</Paragraph>
        )}
      </div>

      {summary && (
        <div style={{ marginTop: "2rem" }}>
          <Title level={3}>AI-Generated Summary</Title>
          <Paragraph>{summary}</Paragraph>
        </div>
      )}

      {summaryError && (
        <Alert
          message="Summary Error"
          description={summaryError}
          type="error"
          showIcon
          style={{ marginTop: "1rem" }}
        />
      )}

      <div style={{ marginTop: "2rem" }}>
        <Title level={3}>Transcript</Title>
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          {transcripts.map((entry, index) => (
            <Paragraph key={index}>
              <strong>{entry.timestamp}:</strong> {entry.text}
            </Paragraph>
          ))}
          {currentTranscript && (
            <Paragraph type="secondary">{currentTranscript}</Paragraph>
          )}
          {transcripts.length === 0 && !currentTranscript && (
            <Paragraph type="secondary">
              No transcripts yet. Click &quot;Start Recording&quot; to begin.
            </Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechTranscriber;
