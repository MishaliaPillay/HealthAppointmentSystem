"use client";
import { Select, Button, Alert, Typography } from "antd";
const { Option } = Select;
const { Title, Paragraph } = Typography;

import React, { useState, useEffect, useRef } from "react";

import jsPDF from "jspdf";

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

const callSummarizationAPI = async (text: string): Promise<string> => {
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
};

const SpeechTranscriber: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [supportsSpeechRecognition, setSupportsSpeechRecognition] =
    useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const [summary, setSummary] = useState<string>("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "ja-JP", name: "Japanese" },
  ];

  useEffect(() => {
    isMountedRef.current = true;
    const windowWithSpeech = window as unknown as WindowWithSpeechRecognition;
    const SpeechRecognitionAPI =
      windowWithSpeech.SpeechRecognition ||
      windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setSupportsSpeechRecognition(false);
      setError(
        "Your browser does not support the Web Speech API. Try using Chrome or Edge."
      );
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
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
        setSummary("");
      }
      setCurrentTranscript(interimTranscript);
    };

    recognition.onerror = (event: any) => {
      if (!isMountedRef.current) return;
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (!isMountedRef.current) return;
      if (isRecording && !error) {
        try {
          recognition.start();
        } catch {
          setIsRecording(false);
        }
      } else {
        setIsRecording(false);
      }
    };

    recognitionRef.current = recognition;
    return () => {
      isMountedRef.current = false;
      recognitionRef.current?.stop();
    };
  }, [selectedLanguage]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    try {
      isRecording
        ? recognitionRef.current.stop()
        : recognitionRef.current.start();
      setError(null);
    } catch (err) {
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

  const generateSummary = async () => {
    if (transcripts.length === 0) {
      setSummaryError("No transcripts to summarize");
      return;
    }

    setIsSummarizing(true);
    setSummaryError(null);

    try {
      const fullText = transcripts.map((entry) => entry.text).join(" ");
      const inputWithContext = transcripts.map((entry) => entry.text).join(" ");
      if (fullText.split(" ").length < 10) {
        setSummaryError(
          "Text is too short for summarization. Please record more content."
        );
        setIsSummarizing(false);
        return;
      }

      const summaryText = await callSummarizationAPI(inputWithContext);
      if (isMountedRef.current) setSummary(summaryText);
    } catch (err: any) {
      if (isMountedRef.current) {
        if (err.message?.includes("429")) {
          setSummaryError("API rate limit exceeded. Please try again later.");
        } else {
          setSummaryError(err.message || "Failed to generate summary");
        }
      }
    } finally {
      if (isMountedRef.current) setIsSummarizing(false);
    }
  };

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
    y += lines.length * 10;
    doc.save(`summary-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const handleLanguageChange = (value: string) => {
    if (isRecording && recognitionRef.current) recognitionRef.current.stop();
    setSelectedLanguage(value);
  };

  if (!supportsSpeechRecognition) {
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
              No transcripts yet. Click "Start Recording" to begin.
            </Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechTranscriber;
