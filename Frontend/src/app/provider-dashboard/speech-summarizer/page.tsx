import React from "react";
import SpeechTranscriber from "../../../components/bonus-feature/speech-recognition/SpeechRecognition";
import styles from "./speech.module.css"; // Import CSS module

function Speech() {
  return (
    <div className={styles.Speech}>
      <main className={styles.SpeechMain}>
        <div className={styles.Introduction}>
          <h2>Track Your Meetings Efficiently</h2>
          <p>
            Ready to enhance your meeting productivity? Click{" "}
            <strong>Start Recording</strong> to begin transcribing your
            discussions in real-time. As the conversation progresses, our AI
            will summarize the key points to help you stay on top of your
            meetings.
          </p>
          <p>
            Once you&apos;re done, simply hit <strong>Export Summary</strong> to
            generate a PDF version of the meeting summary for easy sharing and
            review.
          </p>
        </div>
        <SpeechTranscriber />
      </main>
    </div>
  );
}

export default Speech;
