'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle, Users, Target, Hammer } from 'lucide-react';
import { CERTIFICATIONS } from '@/data/content';
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
    desc: 'Over 400 trained engineers, welders, and erection specialists — certified and safety-compliant.',
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
                <span className={styles.headingAccent}>Since 1998</span>
              </h2>
            </div>
            <div className={`reveal ${styles.headerText}`}>
              <p>
                For over two decades, Bhandari Enterprise has been the trusted partner
                for India's largest industrial groups. We combine precision engineering
                with industrial-scale manufacturing capability to deliver structures
                that define infrastructure.
              </p>
              <p>
                From our state-of-the-art fabrication yard in Konnagar, Hooghly, we serve
                clients across petrochemical, power, logistics, manufacturing, and
                civil infrastructure sectors.
              </p>
              <a href="#contact" className="btn btn--primary" style={{ marginTop: 'var(--space-6)' }}>
                Work With Us
              </a>
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

        <div className="divider" style={{ margin: 'var(--space-16) 0' }} />

        {/* Certifications */}
        <div className={styles.certsSection} id="certifications">
          <div className="reveal">
            <span className="overline">Quality & Safety Certifications</span>
            <h3 className={styles.certsHeading}>Our Standards & Compliance</h3>
          </div>
          <div className={`${styles.certsGrid} reveal-group`}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.code} className={`reveal ${styles.certCard}`}>
                <CheckCircle size={20} className={styles.certCheck} aria-hidden="true" />
                <div>
                  <div className={styles.certCode}>{cert.code}</div>
                  <div className={styles.certTitle}>{cert.title}</div>
                  <div className={styles.certBody}>{cert.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
