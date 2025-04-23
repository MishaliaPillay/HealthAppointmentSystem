import { useEffect, useRef, useState } from "react";
import {
  TranscriptEntry,
  SpeechRecognition,
  SpeechRecognitionEvent,
  WindowWithSpeechRecognition,
  SpeechRecognitionErrorEvent,
} from "./summarytypes";

export const useSpeechRecognition = (language: string) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isMountedRef = useRef(true);

  useEffect((): (() => void) => {
    // specify the return type as a function that returns void
    isMountedRef.current = true;

    const windowWithSpeech = window as unknown as WindowWithSpeechRecognition;
    const SpeechRecognitionAPI =
      windowWithSpeech.SpeechRecognition ||
      windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      setError("Your browser does not support Web Speech API.");
      return () => {}; // ensure return of a cleanup function
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (isMountedRef.current) setIsRecording(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (!isMountedRef.current) return;

      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      if (final) {
        const timestamp = new Date().toLocaleTimeString();
        setTranscripts((prev) => [
          ...prev,
          { text: final, timestamp, isFinal: true },
        ]);
      }

      setCurrentTranscript(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
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
  }, [language]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    try {
      if (isRecording) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
      setError(null);
    } catch (err) {
      setError(`Failed to ${isRecording ? "stop" : "start"} recording: ${err}`);
      setIsRecording(false);
    }
  };

  const clear = () => {
    setTranscripts([]);
    setCurrentTranscript("");
  };

  return {
    isRecording,
    transcripts,
    currentTranscript,
    error,
    isSupported,
    toggleRecording,
    clear,
  };
};
