"use client";
import { Select, Button, Alert, Typography } from "antd";
const { Option } = Select;
const { Title, Paragraph } = Typography;

import React, { useState, useEffect, useRef } from "react";

import jsPDF from "jspdf";

// TypeScript interfaces for Speech Recognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: (event: Event) => void;
  onstart: (event: Event) => void;
  onnomatch?: (event: Event) => void;
  onaudiostart?: (event: Event) => void;
  onaudioend?: (event: Event) => void;
  start(): void;
  stop(): void;
  abort(): void;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
}

interface TranscriptEntry {
  text: string;
  timestamp: string;
  isFinal: boolean;
}

const HF_API_TOKEN = "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";
const SUMMARY_MODEL = "facebook/bart-large-cnn";

const callSummarizationAPI = async (text: string) => {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${SUMMARY_MODEL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HF_API_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            max_length: 150,
            min_length: 30,
            do_sample: false,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    return result[0].summary_text;
  } catch (error) {
    throw error;
  }
};

const SpeechTranscriber: React.FC = () => {
  // State for controlling recording and storing transcripts
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [supportsSpeechRecognition, setSupportsSpeechRecognition] =
    useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  // State for AI summarization
  const [summary, setSummary] = useState<string>("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Reference to store the recognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef<boolean>(true);

  // List of available languages
  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "ja-JP", name: "Japanese" },
  ];

  // Initialize speech recognition
  useEffect(() => {
    // Set mounted status
    isMountedRef.current = true;

    // Check for browser support
    const windowWithSpeech = window as unknown as WindowWithSpeechRecognition;
    const SpeechRecognitionAPI =
      windowWithSpeech.SpeechRecognition ||
      windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setSupportsSpeechRecognition(false);
      setError(
        "Your browser does not support the Web Speech API. Try using Chrome or Edge."
      );
      return undefined;
    }

    // Initialize the recognition instance
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      if (isMountedRef.current) setIsRecording(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (!isMountedRef.current) return;

      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        const timestamp = new Date().toLocaleTimeString();
        setTranscripts((prev) => [
          ...prev,
          { text: finalTranscript, timestamp, isFinal: true },
        ]);

        // Clear any previous summary when new content is added
        setSummary("");
      }

      setCurrentTranscript(interimTranscript);
    };

    interface SpeechRecognitionErrorEvent extends Event {
      error: string;
      message?: string;
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (!isMountedRef.current) return;

      console.error("Speech recognition error:", event.error);
      setError(`Speech recognition error: ${event.error}`);
      if (event.error === "not-allowed") {
        setError(
          "Microphone access denied. Please allow microphone access and try again."
        );
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (!isMountedRef.current) return;

      console.log("Speech recognition ended");
      // Only auto-restart if we're still supposed to be recording
      // and if there's no error
      if (isRecording && !error) {
        try {
          recognition.start();
        } catch (e) {
          console.error("Failed to restart speech recognition:", e);
          setIsRecording(false);
        }
      } else {
        setIsRecording(false);
      }
    };

    recognitionRef.current = recognition;

    // Clean up
    return () => {
      isMountedRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("Error stopping speech recognition:", e);
        }
      }
    };
  }, [selectedLanguage]); // Re-initialize when language changes

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    try {
      if (isRecording) {
        recognitionRef.current.stop();
      } else {
        setError(null);
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error("Error toggling recording:", err);
      setError(`Failed to ${isRecording ? "stop" : "start"} recording: ${err}`);
      setIsRecording(false);
    }
  };

  const clearTranscripts = () => {
    setTranscripts([]);
    setCurrentTranscript("");
    setSummary("");
    setSummaryError(null);
  };

  // Generate a summary using Hugging Face Inference API
  const generateSummary = async () => {
    if (transcripts.length === 0) {
      setSummaryError("No transcripts to summarize");
      return;
    }

    setIsSummarizing(true);
    setSummaryError(null);

    try {
      const fullText = transcripts.map((entry) => entry.text).join(" ");
      const contextHint =
        "Summarize the conversation between a doctor and a patient. Include only relevant medical content: symptoms discussed, diagnoses made, and treatments or advice given. Exclude filler words, instructions, or commentary.";

      const inputWithContext = `INSTRUCTION: ${contextHint}\n\nTRANSCRIPT:\n${fullText}`;
      if (fullText.split(" ").length < 10) {
        setSummaryError(
          "Text is too short for summarization. Please record more content."
        );
        setIsSummarizing(false);
        return;
      }

      const summaryText = await callSummarizationAPI(inputWithContext);
      if (isMountedRef.current) {
        setSummary(summaryText);
      }
    } catch (err) {
      console.error("Error generating summary:", err);
      if (isMountedRef.current) {
        if (err.message?.includes("429")) {
          setSummaryError("API rate limit exceeded. Please try again later.");
        } else if (err.message?.includes("401")) {
          setSummaryError("API authorization failed. Check your API token.");
        } else {
          setSummaryError(`Failed to generate summary: ${err.message || err}`);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setIsSummarizing(false);
      }
    }
  };

  // Export summary as text
  const exportSummary = () => {
    if (!summary) {
      setSummaryError("No summary to export");
      return;
    }

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    let y = 10;
    doc.setFontSize(16);
    doc.text("Conversation Summary", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 10, y);
    y += 10;

    const splitSummary = doc.splitTextToSize(summary, 180);
    doc.text(splitSummary, 10, y);
    y += splitSummary.length * 10;

    doc.setFontSize(16);
    doc.text("Full Transcript", 10, y);
    y += 10;

    doc.setFontSize(12);
    transcripts.forEach((entry) => {
      const line = `[${entry.timestamp}] ${entry.text}`;
      const lines = doc.splitTextToSize(line, 180);
      doc.text(lines, 10, y);
      y += lines.length * 10;

      // Add new page if space is running out
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save(
      `conversation-summary-${new Date().toISOString().slice(0, 10)}.pdf`
    );
  };
  const handleLanguageChange = (value: string) => {
    // If recording, stop it before changing language
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setSelectedLanguage(value);
  };

  if (!supportsSpeechRecognition) {
    return (
      <Alert
        message="Browser Not Supported"
        description="Your browser does not support speech recognition. Please try using Chrome, Edge, or another modern browser."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <Title level={2}>Conversation Transcriber & Summarizer</Title>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <label htmlFor="language-select">Language: </label>
          <Select
            id="language-select"
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
        </div>

        <Button
          onClick={toggleRecording}
          type={isRecording ? "primary" : "default"}
          danger={isRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        <Button
          onClick={clearTranscripts}
          disabled={isRecording || transcripts.length === 0}
        >
          Clear All
        </Button>

        <Button
          onClick={generateSummary}
          disabled={isRecording || transcripts.length === 0 || isSummarizing}
          loading={isSummarizing}
          type="primary"
        >
          Generate Summary
        </Button>

        {summary && (
          <Button onClick={exportSummary} type="default">
            Export Summary
          </Button>
        )}
      </div>

      {error && (
        <Alert
          message="Error"
          description={
            <>
              <p>{error}</p>
              {error.includes("microphone access") && (
                <p>
                  Please check your browser settings and ensure microphone
                  access is enabled.
                </p>
              )}
            </>
          }
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
          message="Summary Export Error"
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
