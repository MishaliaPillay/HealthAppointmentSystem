"use client";
import Image from "next/image";
import LoginPage from "./login/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.authContainer}>
          <div className={styles.brandSide}>
            <div className="blurred-image-wrapper">
              <Image
                className={styles.logo}
                src="/images/home.jpg"
                alt="Next.js logo"
                width={380}
                height={320}
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <h1 className={styles.brandTitle}>Welcome </h1>
            <p className={styles.brandDescription}>
              Your secure gateway to smarter healthcare. Easily connect with
              providers, manage appointments, and stay in control of your health
              — all in one place.
            </p>
          </div>
          <div className={styles.formSide}>
            <LoginPage />
          </div>
        </div>
      </main>
    </div>
  );
}
