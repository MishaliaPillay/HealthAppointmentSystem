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
                src="/images/logo.jpg"
                alt="Next.js logo"
                width={480}
                height={420}
                priority
              />
            </div>
            <h1 className={styles.brandTitle}>Welcome to our platform</h1>
            <p className={styles.brandDescription}>
              Join thousands of users who trust our secure and easy-to-use
              platform.
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
