'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'hidden'>('loading');

  useEffect(() => {
    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem('be_loaded');
    if (alreadyShown) {
      setPhase('hidden');
      return;
    }

    // Animate progress bar over ~4.5s
    const totalDuration = 4500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const raw = elapsed / totalDuration;
      // Ease-out curve — fast start, slow finish
      const eased = 1 - Math.pow(1 - Math.min(raw, 1), 2.5);
      setProgress(Math.min(Math.round(eased * 100), 99));

      if (elapsed < totalDuration) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setPhase('complete');
          sessionStorage.setItem('be_loaded', '1');
          // After fade-out, fully hide
          setTimeout(() => setPhase('hidden'), 700);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`${styles.screen} ${phase === 'complete' ? styles.fadeOut : ''}`}
      aria-live="polite"
      aria-label="Loading Bhandari Enterprise"
      role="status"
    >
      {/* Background grid */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgLines} aria-hidden="true" />

      {/* Center content */}
      <div className={styles.center}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/logo-v2.png"
            alt="Bhandari Enterprise"
            width={280}
            height={280}
            priority
            className={styles.logo}
          />
          <div className={styles.logoGlint} aria-hidden="true" />
        </div>

        {/* Tag line */}
        <div className={styles.tagline}>
          <span className={styles.taglineAccent}>Industrial Engineering</span>
          {' '}Solutions
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrap} aria-hidden="true">
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
            {/* Moving light sweep */}
            <div
              className={styles.progressGlow}
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className={styles.progressLabel}>
            <span className={styles.progressText}>Initialising</span>
            <span className={styles.progressNum}>{progress}%</span>
          </div>
        </div>

        {/* Corner marks */}
        <div className={styles.cornerTL} aria-hidden="true" />
        <div className={styles.cornerBR} aria-hidden="true" />
      </div>

      {/* Bottom brand strip */}
      <div className={styles.bottomStrip} aria-hidden="true" suppressHydrationWarning>
        <span className={styles.bottomBrand}>BHANDARI ENTERPRISE</span>
        <span className={styles.bottomDivider} />
        <span className={styles.bottomSub} suppressHydrationWarning>
          EST. 2006 · KONNAGAR, WEST BENGAL
        </span>
      </div>
    </div>
  );
}
