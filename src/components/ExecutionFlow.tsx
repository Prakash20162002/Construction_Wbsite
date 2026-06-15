'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowDown } from 'lucide-react';
import styles from './ExecutionFlow.module.css';

const STAGES = [
  {
    number: '01',
    title: 'Manufacturing',
    headline: 'Industrial-Grade Manufacturing',
    description:
      'Production of industrial components, structural members, steel assemblies and custom engineered products to ASME, IS and client-specific standards — with complete documentation from material test reports to final inspection certificates.',
    tags: ['Structural Members', 'Pressure Vessels', 'Equipment Skids', 'Custom Assemblies'],
    image: '/stage-manufacturing.jpg',
    imageAlt: 'Modern industrial manufacturing facility with CNC machines and robotic welding arms',
    stat: { number: '2,400T', label: 'Annual Output' },
    href: '/capabilities/manufacturing',
  },
  {
    number: '02',
    title: 'Fabrication',
    headline: 'Precision Steel Fabrication',
    description:
      'Fabrication of structural steel, pipe systems, industrial platforms and heavy engineering structures using CNC plasma/flame cutting, MIG, TIG, SAW and FCAW welding — all inspected to IS:800, AISC 360 and AWS D1.1 requirements.',
    tags: ['Structural Steel', 'Pipe Systems', 'Industrial Platforms', 'Heavy Sections'],
    image: '/stage-fabrication.jpg',
    imageAlt: 'Steel fabrication workshop with welding sparks and overhead cranes',
    stat: { number: '200T', label: 'Max Single Order' },
    href: '/capabilities/steel-fabrication',
  },
  {
    number: '03',
    title: 'Erection',
    headline: 'On-Site Industrial Erection',
    description:
      'On-site erection and installation of steel structures, industrial plants, equipment and pipe racks — with crane-assisted heavy lifts up to 50MT, safety-certified crews, and 8 simultaneous active project sites across India.',
    tags: ['PEB Erection', 'Plant Structures', 'Pipe Racks', 'Heavy Lift'],
    image: '/stage-erection.jpg',
    imageAlt: 'Industrial steel erection with tower cranes at golden hour',
    stat: { number: '50MT', label: 'Max Crane Lift' },
    href: '/capabilities/structural-erection',
  },
  {
    number: '04',
    title: 'Civil Construction',
    headline: 'Industrial Civil Works',
    description:
      'Industrial buildings, RCC foundations, piling, hard-stand flooring and infrastructure development — executed as a fully integrated civil scope to IS:456, IS:2911 and site-specific engineering requirements.',
    tags: ['RCC Structures', 'Foundations & Piling', 'Industrial Flooring', 'Turnkey Civil'],
    image: '/stage-civil.jpg',
    imageAlt: 'Large industrial civil construction site with concrete pouring and cranes',
    stat: { number: '50,000', label: 'sqm Max Project' },
    href: '/capabilities/civil-construction',
  },
] as const;

export default function ExecutionFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.12 }
    );

    stageRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="execution"
      aria-labelledby="execution-heading"
    >
      {/* ── SECTION HEADER ────────────────────────────────────── */}
      <div className={styles.header}>
        <div className="container container--content">
          <div className={styles.headerInner}>
            <div className={styles.headerLeft}>
              <span className="overline">Project Execution Capability</span>
              <h2 id="execution-heading" className={styles.sectionTitle}>
                End-to-End Industrial<br />
                <span className={styles.titleAccent}>Execution</span>
              </h2>
            </div>
            <div className={styles.headerRight}>
              <p className={styles.sectionSub}>
                From manufacturing and fabrication to erection and civil construction,
                we execute complete industrial infrastructure projects under one roof.
              </p>
              <div className={styles.oneLiner}>
                <span className={styles.oneLinerLine} aria-hidden="true" />
                One partner for complete industrial execution.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROCESS FLOW ─────────────────────────────────────── */}
      <div className={styles.flow}>
        {/* Vertical timeline spine */}
        <div className={styles.spine} aria-hidden="true" />

        {STAGES.map((stage, i) => {
          const isEven = i % 2 === 1;
          return (
            <div
              key={stage.number}
              ref={(el) => { stageRefs.current[i] = el; }}
              className={`${styles.stage} ${isEven ? styles.stageReversed : ''}`}
              aria-label={`Stage ${stage.number}: ${stage.title}`}
            >
              {/* ── Node on spine ── */}
              <div className={styles.node} aria-hidden="true">
                <div className={styles.nodeRing} />
                <div className={styles.nodeDot} />
                <div className={styles.nodeNumber}>{stage.number}</div>
              </div>

              {/* ── Image Panel ── */}
              <div className={styles.imageWrap}>
                <div className={styles.imageInner}>
                  <Image
                    src={stage.image}
                    alt={stage.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className={styles.stageImage}
                    quality={85}
                  />
                  {/* Overlay */}
                  <div className={styles.imageOverlay} aria-hidden="true" />
                  {/* Stage label on image */}
                  <div className={styles.imageLabel} aria-hidden="true">
                    <span className={styles.imageLabelStage}>Stage {stage.number}</span>
                    <span className={styles.imageLabelTitle}>{stage.title}</span>
                  </div>
                  {/* Stat badge */}
                  <div className={styles.statBadge} aria-hidden="true">
                    <span className={styles.statNum}>{stage.stat.number}</span>
                    <span className={styles.statLabel}>{stage.stat.label}</span>
                  </div>
                </div>
              </div>

              {/* ── Content Panel ── */}
              <div className={styles.content}>
                {/* Stage marker */}
                <div className={styles.stageMarker}>
                  <span className={styles.stageNumLarge} aria-hidden="true">{stage.number}</span>
                  <span className={styles.stageTag}>{stage.title}</span>
                </div>

                <h3 className={styles.stageHeadline}>{stage.headline}</h3>

                <p className={styles.stageDesc}>{stage.description}</p>

                {/* Tags */}
                <div className={styles.tags} aria-label={`${stage.title} scope items`}>
                  {stage.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <Link
                  href={stage.href}
                  className={styles.stageLink}
                  id={`execution-stage-${stage.number}`}
                  aria-label={`Learn more about ${stage.title}`}
                >
                  View {stage.title} Capability
                  <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </div>

              {/* ── Connector arrow between stages ── */}
              {i < STAGES.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <ArrowDown size={20} strokeWidth={2} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── FOOTER STRIP ─────────────────────────────────────── */}
      <div className={styles.footerStrip}>
        <div className="container container--content">
          <div className={styles.footerInner}>
            <div className={styles.footerText}>
              <span className={styles.footerLabel}>The Result</span>
              <span className={styles.footerMessage}>
                A fully executed industrial project — on time, on spec, zero compromise.
              </span>
            </div>
            <Link
              href="/capabilities"
              className="btn btn--primary btn--lg"
              id="execution-full-capabilities"
            >
              Explore Full Capabilities
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
