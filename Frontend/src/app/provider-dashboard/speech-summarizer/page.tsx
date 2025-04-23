
import React from "react";
import SpeechTranscriber from "../../../components/speech-recognition/SpeechRecognition";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Speech Recognition Demo</h1>
      </header>
      <main>
        <SpeechTranscriber />
      </main>
    </div>
  );
}

export default App;
