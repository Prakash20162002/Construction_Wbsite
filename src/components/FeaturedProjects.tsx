'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/content';
import styles from './FeaturedProjects.module.css';
import ProjectDetailsModal, { Project } from './ProjectDetailsModal';

export default function FeaturedProjects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Autoplay intervals for showcase
  useEffect(() => {
    if (isHovered || isModalOpen) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, isModalOpen]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleProjectSelect = (idx: number) => {
    setActiveIdx(idx);
    setTimeout(() => {
      const showcaseEl = document.getElementById('main-project-showcase');
      if (showcaseEl) {
        showcaseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const activeProj = PROJECTS[activeIdx];

  return (
    <section
      className={styles.section}
      id="featured-projects"
      aria-labelledby="projects-heading"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── HEADER ──────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className="container container--content">
          <div className={styles.headerInner}>
            <div>
              <span className="overline">Recent Industrial Works</span>
              <h2 id="projects-heading" className={styles.sectionTitle}>
                Our <span className={styles.titleAccent}>Projects</span>
              </h2>
            </div>
            <div className={styles.headerRight}>
              <p className={styles.sectionSub}>
                A selection of completed industrial projects demonstrating our
                end-to-end execution capability across steel, civil and process disciplines.
              </p>
              <Link
                href="/projects"
                className={styles.viewAll}
                id="featured-projects-view-all"
              >
                View All Projects
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── DUAL AUTO-SLIDING ROWS (Upper left-to-right, Lower right-to-left) ── */}
      <div className={styles.marqueeSection}>
        <div className={styles.marqueeRowContainer}>
          {/* Row 1: Left to Right */}
          <div className={styles.marqueeRow}>
            <div className={`${styles.marqueeTrack} ${styles.leftToRight}`}>
              {/* Set 1 */}
              {PROJECTS.map((proj, idx) => (
                <div
                  key={`${proj.id}-r1-1`}
                  className={`${styles.gridCard} ${idx === activeIdx ? styles.gridCardActive : ''}`}
                  onClick={() => handleProjectSelect(idx)}
                >
                  <div className={styles.cardImgWrap}>
                    <Image
                      src={proj.image}
                      alt={proj.imageAlt}
                      fill
                      sizes="(max-width: 767px) 80vw, 300px"
                      className={styles.cardThumbnail}
                      quality={75}
                    />
                    <div className={styles.cardOverlay} />
                    {idx === activeIdx && <div className={styles.activeGlow} />}
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardCat}>{proj.category}</span>
                    <h5 className={styles.cardTitle}>{proj.title}</h5>
                    <span className={styles.cardLoc}>
                      <MapPin size={11} aria-hidden="true" />
                      {proj.location.split(',')[0]}
                    </span>
                  </div>
                </div>
              ))}
              {/* Set 2 (Duplicated for seamless loop) */}
              {PROJECTS.map((proj, idx) => (
                <div
                  key={`${proj.id}-r1-2`}
                  className={`${styles.gridCard} ${idx === activeIdx ? styles.gridCardActive : ''}`}
                  onClick={() => handleProjectSelect(idx)}
                >
                  <div className={styles.cardImgWrap}>
                    <Image
                      src={proj.image}
                      alt={proj.imageAlt}
                      fill
                      sizes="(max-width: 767px) 80vw, 300px"
                      className={styles.cardThumbnail}
                      quality={75}
                    />
                    <div className={styles.cardOverlay} />
                    {idx === activeIdx && <div className={styles.activeGlow} />}
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardCat}>{proj.category}</span>
                    <h5 className={styles.cardTitle}>{proj.title}</h5>
                    <span className={styles.cardLoc}>
                      <MapPin size={11} aria-hidden="true" />
                      {proj.location.split(',')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className={styles.marqueeRow}>
            <div className={`${styles.marqueeTrack} ${styles.rightToLeft}`}>
              {/* Set 1 (Reversed for visual variation) */}
              {[...PROJECTS].reverse().map((proj) => {
                const idx = PROJECTS.findIndex((p) => p.id === proj.id);
                return (
                  <div
                    key={`${proj.id}-r2-1`}
                    className={`${styles.gridCard} ${idx === activeIdx ? styles.gridCardActive : ''}`}
                    onClick={() => handleProjectSelect(idx)}
                  >
                    <div className={styles.cardImgWrap}>
                      <Image
                        src={proj.image}
                        alt={proj.imageAlt}
                        fill
                        sizes="(max-width: 767px) 80vw, 300px"
                        className={styles.cardThumbnail}
                        quality={75}
                      />
                      <div className={styles.cardOverlay} />
                      {idx === activeIdx && <div className={styles.activeGlow} />}
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardCat}>{proj.category}</span>
                      <h5 className={styles.cardTitle}>{proj.title}</h5>
                      <span className={styles.cardLoc}>
                        <MapPin size={11} aria-hidden="true" />
                        {proj.location.split(',')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* Set 2 (Duplicated for seamless loop) */}
              {[...PROJECTS].reverse().map((proj) => {
                const idx = PROJECTS.findIndex((p) => p.id === proj.id);
                return (
                  <div
                    key={`${proj.id}-r2-2`}
                    className={`${styles.gridCard} ${idx === activeIdx ? styles.gridCardActive : ''}`}
                    onClick={() => handleProjectSelect(idx)}
                  >
                    <div className={styles.cardImgWrap}>
                      <Image
                        src={proj.image}
                        alt={proj.imageAlt}
                        fill
                        sizes="(max-width: 767px) 80vw, 300px"
                        className={styles.cardThumbnail}
                        quality={75}
                      />
                      <div className={styles.cardOverlay} />
                      {idx === activeIdx && <div className={styles.activeGlow} />}
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardCat}>{proj.category}</span>
                      <h5 className={styles.cardTitle}>{proj.title}</h5>
                      <span className={styles.cardLoc}>
                        <MapPin size={11} aria-hidden="true" />
                        {proj.location.split(',')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN SHOWCASE (Now positioned below the sliding selectors) ── */}
      <div id="main-project-showcase" className={styles.mainShowcase}>
        <div className="container container--content">
          <div className={styles.showcaseInner}>
            {/* Left side details */}
            <div className={styles.showcaseDetails}>
              <span className={styles.showcaseCat}>{activeProj.category}</span>
              <h3 className={styles.showcaseTitle}>{activeProj.title}</h3>

              <div className={styles.showcaseMeta}>
                <span className={styles.metaItem}>
                  <MapPin size={13} aria-hidden="true" />
                  {activeProj.location}
                </span>
                <span className={styles.metaScope}>{activeProj.scope}</span>
              </div>

              <p className={styles.showcaseDesc}>{activeProj.summary}</p>

              <div className={styles.showcaseTags}>
                {activeProj.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.showcaseActions}>
                <Link
                  href={`/projects/${activeProj.id}`}
                  className="btn btn--primary"
                  id="featured-project-primary"
                  aria-label={`View details for ${activeProj.title}`}
                >
                  View Case Study
                  <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right side visual slide */}
            <div className={styles.showcaseVisual}>
              <div className={styles.imageFrame}>
                {PROJECTS.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className={`${styles.imageSlide} ${idx === activeIdx ? styles.imageSlideActive : ''}`}
                    aria-hidden={idx !== activeIdx}
                  >
                    <Image
                      src={proj.image}
                      alt={proj.imageAlt}
                      fill
                      loading="eager"
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className={styles.slideImage}
                      quality={85}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.yearBadge} aria-hidden="true">
                {activeProj.year}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA BAND ──────────────────────────────────── */}
      <div className={styles.ctaBand}>
        <div className="container container--content">
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <span className={styles.ctaNum}>50+</span>
              <span className={styles.ctaLabel}>Projects delivered across India since 2006</span>
            </div>
            <Link
              href="/projects"
              className="btn btn--primary btn--lg"
              id="featured-projects-cta"
            >
              Explore Full Portfolio
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── PROJECT DETAILS MODAL ────────────────────────────── */}
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}
