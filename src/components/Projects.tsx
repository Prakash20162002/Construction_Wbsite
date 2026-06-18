'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Weight, Square, ChevronRight } from 'lucide-react';
import { PROJECTS } from '@/data/content';
import styles from './Projects.module.css';

// Industrial SVG placeholder images by category
const placeholderColors: Record<string, string> = {
  warehouse: '#1E3550',
  factory: '#132238',
  plant: '#1A2E45',
  logistics: '#162840',
  power: '#0F2035',
  storage: '#1B3048',
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.projects}`} id="projects" ref={sectionRef}>
      <div className="container container--content">
        {/* Header */}
        <div className={styles.header}>
          <div className="reveal">
            <span className="overline">Portfolio</span>
            <h2 className={styles.heading}>Featured Projects</h2>
          </div>
          <div className="reveal">
            <p className={styles.subheading}>
              A selection of landmark industrial and infrastructure projects
              delivered across India.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`${styles.grid} reveal-group`}>
          {PROJECTS.map((project, i) => {
            const bgColor = placeholderColors[project.category.toLowerCase().split(' ')[0]] || '#1E3550';
            const isFeatured = i === 0;
            return (
              <article
                key={project.id}
                className={`reveal ${styles.card} ${isFeatured ? styles.featured : ''}`}
                id={`project-${project.id}`}
                aria-label={project.title}
              >
                {/* Visual */}
                <div className={styles.cardVisual} aria-hidden="true">
                  <ProjectSVG color={bgColor} index={i} />
                  <div className={styles.cardOverlay} />

                  {/* Category badge */}
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{project.category}</span>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>

                  <div className={styles.cardSpecs}>
                    <span className={styles.spec}>
                      <MapPin size={12} aria-hidden="true" />
                      {project.location}
                    </span>
                    {project.area && (
                      <span className={styles.spec}>
                        <Square size={12} aria-hidden="true" />
                        {project.area}
                      </span>
                    )}
                    <span className={styles.spec}>
                      <Weight size={12} aria-hidden="true" />
                      {project.weight}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All */}
        <div className={`reveal ${styles.viewAll}`}>
          <a href="#contact" className="btn btn--secondary btn--lg" id="projects-cta">
            Discuss Your Project
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

// SVG industrial placeholder visual
function ProjectSVG({ color, index }: { color: string; index: number }) {
  const patterns = [
    // Warehouse: horizontal beams
    <svg key="w" width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={color} />
      <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(232,80,0,0.3)" strokeWidth="2" />
      <line x1="0" y1="160" x2="400" y2="160" stroke="rgba(232,80,0,0.2)" strokeWidth="2" />
      <line x1="200" y1="0" x2="200" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <rect x="40" y="100" width="320" height="60" fill="none" stroke="rgba(232,80,0,0.2)" strokeWidth="1" />
      <line x1="0" y1="240" x2="400" y2="240" stroke="rgba(232,80,0,0.4)" strokeWidth="3" />
      <rect x="60" y="200" width="280" height="40" fill="rgba(12,24,41,0.5)" />
    </svg>,
    // Factory: vertical columns
    <svg key="f" width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={color} />
      {[40, 100, 160, 220, 280, 340].map((x) => (
        <rect key={x} x={x} y={20} width={8} height={220} fill="rgba(232,80,0,0.2)" />
      ))}
      <rect x="20" y="200" width="360" height="8" fill="rgba(232,80,0,0.35)" />
      <rect x="20" y="100" width="360" height="4" fill="rgba(255,255,255,0.1)" />
      <polygon points="40,200 200,40 360,200" fill="none" stroke="rgba(232,80,0,0.15)" strokeWidth="1" />
    </svg>,
    // Plant: pipes and curves
    <svg key="p" width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={color} />
      <circle cx="200" cy="130" r="90" fill="none" stroke="rgba(232,80,0,0.15)" strokeWidth="2" />
      <circle cx="200" cy="130" r="50" fill="none" stroke="rgba(232,80,0,0.2)" strokeWidth="2" />
      <line x1="0" y1="130" x2="400" y2="130" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <line x1="200" y1="0" x2="200" y2="260" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="160" y="90" width="80" height="80" fill="rgba(12,24,41,0.6)" stroke="rgba(232,80,0,0.3)" strokeWidth="1" />
    </svg>,
    // Logistics: grid
    <svg key="l" width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={color} />
      {[0, 1, 2, 3, 4, 5].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}-${c}`} x={10 + c * 80} y={10 + r * 42} width={70} height={32} fill="rgba(255,255,255,0.04)" stroke="rgba(232,80,0,0.15)" strokeWidth="1" />
        ))
      )}
      <line x1="0" y1="0" x2="400" y2="260" stroke="rgba(232,80,0,0.08)" strokeWidth="1" />
    </svg>,
    // Power: towers
    <svg key="pw" width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={color} />
      <polygon points="160,20 200,220 240,220 280,20" fill="none" stroke="rgba(232,80,0,0.25)" strokeWidth="2" />
      <line x1="160" y1="80" x2="240" y2="80" stroke="rgba(232,80,0,0.3)" strokeWidth="2" />
      <line x1="150" y1="130" x2="250" y2="130" stroke="rgba(232,80,0,0.25)" strokeWidth="2" />
      <line x1="140" y1="180" x2="260" y2="180" stroke="rgba(232,80,0,0.2)" strokeWidth="2" />
      <rect x="0" y="218" width="400" height="8" fill="rgba(232,80,0,0.3)" />
    </svg>,
    // Storage: arches
    <svg key="s" width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={color} />
      <path d="M 20 220 Q 200 20 380 220" fill="none" stroke="rgba(232,80,0,0.25)" strokeWidth="3" />
      <path d="M 60 220 Q 200 60 340 220" fill="none" stroke="rgba(232,80,0,0.15)" strokeWidth="2" />
      <rect x="20" y="218" width="360" height="6" fill="rgba(232,80,0,0.35)" />
      {[80, 160, 240, 320].map((x) => (
        <line key={x} x1={x} y1="220" x2={x} y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      ))}
    </svg>,
  ];

  return <>{patterns[index % patterns.length]}</>;
}
