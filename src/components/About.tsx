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
              <p>
                From our facility in Konnagar, Hooghly, Bhandari Enterprise has built a reputation for quality, reliability, and skilled craftsmanship. Backed by a dedicated team of experienced workers and a commitment to excellence, we provide precision fabrication and engineering solutions for industrial and infrastructure projects across West Bengal. Every project reflects our focus on hard work, attention to detail, and delivering results that our clients can depend on.

              </p>
              <a href="#featured-projects" className="btn btn--primary" style={{ marginTop: 'var(--space-6)', alignSelf: 'flex-start' }}>
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
      </div>
    </section>
  );
}
