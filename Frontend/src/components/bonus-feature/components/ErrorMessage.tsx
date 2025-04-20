// src/components/FaceAnalyzer/components/ErrorMessage.tsx
import React from "react";
import styles from "../FaceAnalyzer.module.css";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={styles.errorMessage}>
      <p>{message}</p>
    </div>
  );
};
