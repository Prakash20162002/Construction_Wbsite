'use client';

import { useEffect, useRef } from 'react';
import { Users, Target, Hammer } from 'lucide-react';
import styles from './About.module.css';

const pillars = [
  {
    icon: Target,
    title: 'Precision Engineering',
    desc: 'Every component is engineered to exact tolerances with advanced CNC cutting, robotic welding, and CMM inspection.',
  },
  {
    icon: Users,
    title: 'Expert Workforce',
    desc: 'Over 150 trained engineers, welders, and erection specialists — certified and safety-compliant.',
  },
  {
    icon: Hammer,
    title: 'End-to-End Capability',
    desc: 'From design and fabrication to erection and commissioning — complete project ownership under one roof.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section section--mid ${styles.about}`} id="about" ref={sectionRef}>
      <div className={`container container--content`}>
        {/* Header */}
        <div className={styles.header}>
          <div className="reveal">
            <span className="overline">About Bhandari Enterprise</span>
          </div>
          <div className={styles.headerGrid}>
            <div>
              <h2 className={`reveal ${styles.heading}`}>
                Building India's Industrial Backbone
                <span className={styles.headingAccent}>Since 2006</span>
              </h2>
            </div>
            <div className={`reveal ${styles.headerText}`}>
              <p style={{ marginBottom: 'var(--space-4)' }}>
                <strong>Heritage & Foundation (Est. 2006):</strong> Founded by the Bhandari family with a signature fabrication bay in Konnagar, Hooghly, West Bengal, we set out to bridge the gap in regional heavy engineering with precision steel fabrication. Over nearly two decades of dedicated execution, we have stayed committed to high-standard manufacturing and structural safety.
              </p>
              <p style={{ marginBottom: 'var(--space-4)' }}>
                <strong>Scale & Infrastructure:</strong> Today, our operations span a state-of-the-art 18,000 sqm covered manufacturing facility. Equipped with advanced CNC plasma cutters, automated welding equipment, and 50 MT EOT cranes, we carry out massive steel fabrication and processing jobs to support key industrial projects across India.
              </p>
              <p style={{ marginBottom: 'var(--space-6)' }}>
                <strong>Uncompromised Standards:</strong> With a dedicated permanent workforce of over 150 certified engineers, ASME-compliant welders, and site managers, we maintain zero-defect standards. We are proud to be a trusted engineering partner for India’s largest conglomerates including Tata Steel, L&T, and Reliance.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <a href="#featured-projects" className="btn btn--primary">
                  Work With Us
                </a>
                <a href="/about" className="btn btn--secondary">
                  Read Complete Heritage & Specs
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" style={{ margin: 'var(--space-16) 0' }} />

        {/* Pillars */}
        <div className={`${styles.pillars} reveal-group`}>
          {pillars.map((p) => (
            <div key={p.title} className={`reveal ${styles.pillar}`}>
              <div className={styles.pillarIcon}>
                <p.icon size={32} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
