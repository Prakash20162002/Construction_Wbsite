'use client';

import { useEffect, useRef } from 'react';
import styles from './StatsStrip.module.css';

const STATS = [
  {
    number: '26',
    suffix: '+',
    label: 'Years Experience',
    sub: 'Est. 1998',
  },
  {
    number: '50',
    suffix: '+',
    label: 'Projects Completed',
    sub: 'Across India',
  },
  {
    number: '150',
    suffix: '+',
    label: 'Skilled Workforce',
    sub: 'Permanent & Contract',
  },
  {
    number: '100',
    suffix: '%',
    label: 'Quality Commitment',
    sub: 'West Bengal, India',
  },
];

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateStat(el: HTMLElement, target: number, suffix: string, duration = 1800) {
  const start = performance.now();
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const val = Math.round(easeOut(progress) * target);
    el.textContent = val.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export default function StatsStrip() {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          numRefs.current.forEach((el, i) => {
            if (el) {
              const stat = STATS[i];
              animateStat(el, parseInt(stat.number), stat.suffix);
            }
          });
        }
      },
      { threshold: 0.3 }
    );

    if (numRefs.current[0]) {
      observer.observe(numRefs.current[0].closest('section') as Element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.strip}
      id="company-statistics"
      aria-labelledby="stats-heading"
    >
      {/* Background industrial texture layer */}
      <div className={styles.bgTexture} aria-hidden="true">
        <div className={styles.bgGrid} />
        <div className={styles.bgLines} />
      </div>

      <div className={`container container--content ${styles.inner}`}>

        {/* Section label */}
        <div className={styles.topRow}>
          <div className={styles.labelGroup}>
            <span className={styles.labelLine} aria-hidden="true" />
            <span id="stats-heading" className={styles.label}>
              Company Statistics
            </span>
          </div>
          <p className={styles.tagline}>
            Numbers that reflect 26 years of industrial execution.
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.grid} role="list">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={styles.statCard}
              role="listitem"
            >
              {/* Accent corner */}
              <span className={styles.corner} aria-hidden="true" />

              <div className={styles.statTop}>
                <span
                  className={styles.statNum}
                  ref={(el) => { numRefs.current[i] = el; }}
                  aria-label={`${stat.number}${stat.suffix} ${stat.label}`}
                >
                  {stat.number}{stat.suffix}
                </span>
              </div>

              <div className={styles.statBottom}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statSub}>{stat.sub}</span>
              </div>

              <div className={styles.statDivider} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
