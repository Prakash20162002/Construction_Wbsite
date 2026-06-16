'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './FeaturedProjects.module.css';

const PROJECTS = [
  {
    id: 'steel-fabrication',
    slug: 'structural-steel-fabrication-chandigarh',
    category: 'Steel Fabrication',
    title: 'Structural Steel Fabrication',
    location: 'Konnagar, Hooghly, West Bengal',
    scope: '1,200 MT Structural Steel',
    year: '2024',
    image: '/proj-steel-fab-v2.jpg',
    imageAlt: 'Structural steel fabrication project at night with cranes',
    featured: true,
    tags: ['IS:800', 'AWS D1.1', 'NDE Certified'],
  },
  {
    id: 'industrial-building',
    slug: 'industrial-building-construction-ludhiana',
    category: 'Industrial Building',
    title: 'Industrial Building Construction',
    location: 'Ludhiana, Punjab',
    scope: '28,000 sqm PEB Complex',
    year: '2024',
    image: '/proj-industrial-bldg-v2.jpg',
    imageAlt: 'Industrial warehouse building at sunset with orange sky',
    featured: false,
    tags: ['Pre-Engineered', 'Turnkey', 'AISC'],
  },
  {
    id: 'pipe-rack',
    slug: 'pipe-rack-installation-gujarat',
    category: 'Pipe Rack Installation',
    title: 'Pipe Rack Installation',
    location: 'Ankleshwar, Gujarat',
    scope: '940 MT · Multi-Level Racks',
    year: '2023',
    image: '/proj-pipe-rack.jpg',
    imageAlt: 'Complex industrial pipe rack installation at a refinery at dusk',
    featured: false,
    tags: ['Petrochemical', 'ASME B31.3', 'Process Plant'],
  },
  {
    id: 'plant-erection',
    slug: 'mechanical-plant-erection-rajasthan',
    category: 'Mechanical Plant Erection',
    title: 'Mechanical Plant Erection',
    location: 'Suratgarh, Rajasthan',
    scope: '2,200 MT · Power Plant Structure',
    year: '2022',
    image: '/proj-plant-erection-v2.jpg',
    imageAlt: 'Industrial plant erection with cranes at golden hour',
    featured: false,
    tags: ['Heavy Lift', 'EPC', '50MT Crane'],
  },
  {
    id: 'infrastructure',
    slug: 'infrastructure-development-noida',
    category: 'Infrastructure Development',
    title: 'Industrial Infrastructure Development',
    location: 'Greater Noida, Delhi NCR',
    scope: '42,000 sqm · Phase I & II',
    year: '2023',
    image: '/proj-infrastructure.jpg',
    imageAlt: 'Aerial view of large industrial infrastructure construction site',
    featured: false,
    tags: ['Civil & Steel', 'Logistics Hub', 'Turnkey'],
  },
] as const;

export default function FeaturedProjects() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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

  const featured = PROJECTS[0];
  const grid = PROJECTS.slice(1);

  return (
    <section
      className={styles.section}
      id="featured-projects"
      aria-labelledby="projects-heading"
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

      {/* ── FEATURED CARD (HERO) ─────────────────────────────── */}
      <div className={styles.featuredWrap}>
        <div className="container container--content">
          <article
            ref={(el) => { cardRefs.current[0] = el; }}
            className={`${styles.featuredCard} ${styles.revealCard}`}
            aria-label={`Featured project: ${featured.title}`}
          >
            {/* Image */}
            <div className={styles.featuredImg}>
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 60vw"
                className={styles.featuredImgEl}
                quality={90}
              />
              <div className={styles.featuredImgOverlay} />
              {/* Floating year badge */}
              <div className={styles.yearBadge} aria-hidden="true">
                {featured.year}
              </div>
            </div>

            {/* Content */}
            <div className={styles.featuredContent}>
              <div className={styles.featuredCat}>{featured.category}</div>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>

              <div className={styles.featuredMeta}>
                <span className={styles.metaItem}>
                  <MapPin size={12} aria-hidden="true" />
                  {featured.location}
                </span>
                <span className={styles.metaScope}>{featured.scope}</span>
              </div>

              <div className={styles.featuredTags}>
                {featured.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <Link
                href={`/projects/${featured.slug}`}
                className={styles.projectLink}
                id="featured-project-primary"
                aria-label={`View details for ${featured.title}`}
              >
                View Project Details
                <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* ── PROJECT GRID ─────────────────────────────────────── */}
      <div className={styles.gridWrap}>
        <div className="container container--content">
          <div className={styles.projectGrid}>
            {grid.map((project, i) => (
              <article
                key={project.id}
                ref={(el) => { cardRefs.current[i + 1] = el; }}
                className={`${styles.projectCard} ${styles.revealCard}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                aria-label={`Project: ${project.title}`}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Image */}
                <div className={styles.cardImg}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className={`${styles.cardImgEl} ${activeIdx === i ? styles.cardImgZoom : ''}`}
                    quality={80}
                  />
                  <div className={`${styles.cardOverlay} ${activeIdx === i ? styles.cardOverlayActive : ''}`} />

                  {/* Category pill on image */}
                  <div className={styles.cardCatPill}>{project.category}</div>

                  {/* Year */}
                  <div className={styles.cardYear}>{project.year}</div>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>

                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <MapPin size={11} aria-hidden="true" />
                      {project.location}
                    </span>
                  </div>

                  <div className={styles.cardScope}>{project.scope}</div>

                  <div className={styles.cardTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.cardLink}
                    id={`project-card-${project.id}`}
                    aria-label={`View ${project.title} project details`}
                  >
                    View Details
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA BAND ──────────────────────────────────── */}
      <div className={styles.ctaBand}>
        <div className="container container--content">
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <span className={styles.ctaNum}>50+</span>
              <span className={styles.ctaLabel}>Projects delivered across India since 1998</span>
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
    </section>
  );
}
