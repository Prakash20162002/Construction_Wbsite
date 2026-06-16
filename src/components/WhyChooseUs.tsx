'use client';

import { useRef, useEffect } from 'react';
import { CheckCircle2, Cpu, HardHat, Clock4, Shield, Award, Wrench } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const FEATURES = [
  {
    icon: Cpu,
    title: 'End-To-End Execution',
    desc: 'Single point of responsibility from manufacturing through commissioning — no subcontracting of critical scopes.',
    accent: true,
  },
  {
    icon: HardHat,
    title: 'Skilled Workforce',
    desc: '150+ certified engineers, welders, and erection specialists with heavy industrial domain expertise.',
    accent: false,
  },
  {
    icon: Clock4,
    title: 'On-Time Delivery',
    desc: 'Structured project management with milestone tracking, daily progress reports, and proactive risk mitigation.',
    accent: false,
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    desc: 'In-process inspections, NDE testing, and full material traceability at every fabrication stage.',
    accent: false,
  },
  {
    icon: Wrench,
    title: '26+ Years Experience',
    desc: 'Deep domain knowledge accumulated since 1998 across 50+ industrial projects nationwide.',
    accent: false,
  },
  {
    icon: Shield,
    title: 'Safety First',
    desc: 'Zero-compromise safety culture with mandatory toolbox talks and PTW systems on every site.',
    accent: false,
  },
] as const;

export default function WhyChooseUs() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.section}
      id="why-choose-us"
      aria-labelledby="why-heading"
    >
      <div className="container container--content">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="overline">Why Bhandari Enterprise</span>
            <h2 id="why-heading" className={styles.title}>
              Why <span className={styles.titleAccent}>Choose Us</span>
            </h2>
          </div>
          <p className={styles.subtitle}>
            Six reasons why India's leading industrial groups trust us for
            mission-critical infrastructure projects.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid} role="list">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <article
                key={feat.title}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`${styles.card} ${feat.accent ? styles.cardAccent : ''} ${styles.revealCard}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
                role="listitem"
                aria-label={feat.title}
              >
                {/* Number */}
                <div className={styles.cardNum} aria-hidden="true">
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className={styles.iconWrap} aria-hidden="true">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <div className={styles.checkRow}>
                    <CheckCircle2
                      size={16}
                      strokeWidth={2}
                      className={styles.checkIcon}
                      aria-hidden="true"
                    />
                    <h3 className={styles.cardTitle}>{feat.title}</h3>
                  </div>
                  <p className={styles.cardDesc}>{feat.desc}</p>
                </div>

                {/* Bottom accent bar */}
                <div className={styles.cardBar} aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
