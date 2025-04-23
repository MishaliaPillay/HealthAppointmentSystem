import React from "react";
import styles from "../face-analyzers/FaceAnalyzer.module.css";

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
