// src/components/FaceAnalyzer/components/Header.tsx
import React from "react";
import styles from "../FaceAnalyzer.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Emotional Wellbeing Analysis</h2>
      <p className={styles.subtitle}>
        Understanding your emotions is the first step toward better mental
        health
      </p>
    </div>
  );
};
