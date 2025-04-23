export interface TranscriptEntry {
    text: string;
    timestamp: string;
    isFinal: boolean;
  }
  
  export interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
  
  export interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  
  export interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  export interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
  
  export interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: Event) => void;
    onend: (event: Event) => void;
    onstart: (event: Event) => void;
    start(): void;
    stop(): void;
    abort(): void;
  }
  
  export interface WindowWithSpeechRecognition extends Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
  