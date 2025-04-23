import { useState } from "react";
import { callSummarizationAPI } from "./summarizer";
import { TranscriptEntry } from "./summarytypes";

export const useSummarizer = () => {
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const generateSummary = async (transcripts: TranscriptEntry[]) => {
    setIsSummarizing(true);
    setSummaryError(null);

    try {
      const fullText = transcripts.map((entry) => entry.text).join(" ");

      if (fullText.split(" ").length < 10) {
        setSummaryError(
          "Text is too short for summarization. Please record more content."
        );
        setIsSummarizing(false);
        return;
      }

      const summaryText = await callSummarizationAPI(fullText);
      setSummary(summaryText);
    } catch (err) {
      if (err.message?.includes("429")) {
        setSummaryError("API rate limit exceeded. Please try again later.");
      } else {
        setSummaryError(err.message || "Failed to generate summary.");
      }
    } finally {
      setIsSummarizing(false);
    }
  };

  return {
    summary,
    isSummarizing,
    summaryError,
    generateSummary,
    setSummary,
    setSummaryError,
  };
};
