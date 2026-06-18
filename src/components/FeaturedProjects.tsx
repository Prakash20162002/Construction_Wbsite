'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import styles from './FeaturedProjects.module.css';
import ProjectDetailsModal, { Project } from './ProjectDetailsModal';

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
    client: 'Bhandari Enterprise Manufacturing Facility',
    sector: 'Manufacturing',
    summary: 'In-house high-precision fabrication of heavy structural steel components including columns, box girders, and customized truss members complying with IS:800 and AWS D1.1 standards.',
    highlights: ['1,200 MT steel fabricated', 'Ultrasonic and magnetic particle tested', '100% weld compliance rate', 'Just-in-time delivery to site'],
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
    client: 'National Logistics Corporation',
    sector: 'Logistics',
    summary: 'EPC execution of a large-scale pre-engineered industrial warehouse building complex. Built to withstand high wind loads and heavy EOT crane movements.',
    highlights: ['28,000 sqm covered area', 'Delivered 3 weeks ahead of schedule', 'AISC compliant steel erection', 'Full turnkey civil and superstructure package'],
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
    client: 'ChemProcess India Ltd',
    sector: 'Petrochemical',
    summary: 'Design, fabrication, and heavy lift erection of multi-level industrial pipe racks, chemical process equipment supports, and access platforms.',
    highlights: ['940 MT structural steel work', 'ASME B31.3 compliance for piping clearances', 'Multi-level high elevation structures', 'Corrosion-resistant epoxy coatings'],
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
    client: 'State Power Generation Corp',
    sector: 'Power',
    summary: 'Heavy structural erection and equipment mounting for a thermal power plant. Managed heavy lifts up to 50MT using specialized site cranes under stringent safety regulations.',
    highlights: ['2,200 MT total steel weight', '660 MW power plant support', 'Completed within tight shutdown windows', 'Full EPC project responsibility'],
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
    client: 'E-Commerce Logistics Pvt Ltd',
    sector: 'Logistics',
    summary: 'Turnkey industrial infrastructure development including land grading, foundation piling, grade slabs, and steel structural envelope for a premium distribution hub.',
    highlights: ['42,000 sqm development across Phase I & II', '18-month overall timeline met', 'Turnkey civil and structural engineering', 'High-durability vacuum dewatered flooring'],
  },
  {
    id: 'peb-factory-pune',
    slug: 'peb-factory-building-pune',
    category: 'PEB Erection',
    title: 'Pre-Engineered Factory Building',
    location: 'Pune, Maharashtra',
    scope: '680 MT Steel Erection',
    year: '2024',
    image: '/proj-industrial-bldg-v2.jpg',
    imageAlt: 'Industrial pre-engineered factory structure exterior',
    featured: false,
    tags: ['PEB', 'Overhead Cranes', 'Fast-Track'],
    client: 'Varroc Engineering Ltd',
    sector: 'Automotive',
    summary: 'Fabrication and erection of a state-of-the-art pre-engineered factory building with high-capacity overhead crane supports and high-durability floor systems.',
    highlights: ['680 MT structural steel erected', 'Overhead crane support systems', 'Completed in 120 days', 'Zero safety incidents'],
  },
  {
    id: 'cold-storage-haryana',
    slug: 'cold-storage-logistics-haryana',
    category: 'Civil Construction',
    title: 'Cold Storage & Logistics Facility',
    location: 'Kundli, Haryana',
    scope: '18,500 sqm Turnkey Project',
    year: '2022',
    image: '/proj-infrastructure.jpg',
    imageAlt: 'Large scale cold storage logistics facility under construction',
    featured: false,
    tags: ['Cold Storage', 'Piling & Foundation', 'Turnkey'],
    client: 'FreshFoods Logistics Ltd',
    sector: 'Food & Beverage',
    summary: 'Turnkey execution of a modern cold storage warehouse complex, including foundation piling, civil structure, structural steel roofing, and high-efficiency thermal insulation work.',
    highlights: ['18,500 sqm covered area', 'Precision temperature-controlled floor slab', 'Insulated wall cladding', 'Complete civil & steel package'],
  },
  {
    id: 'refinery-support-gujarat',
    slug: 'refinery-expansion-structures-gujarat',
    category: 'Industrial Manufacturing',
    title: 'Refinery Expansion Structurals',
    location: 'Jamnagar, Gujarat',
    scope: '1,500 MT Steel Fabrication',
    year: '2023',
    image: '/proj-pipe-rack.jpg',
    imageAlt: 'Refinery piping and heavy support structures at dusk',
    featured: false,
    tags: ['Refinery', 'High-Grade Steel', 'NDE Tested'],
    client: 'Reliance Industries Limited',
    sector: 'Petrochemical',
    summary: 'Manufacturing and on-site assembly of high-strength structural steel assemblies, reactor platforms, and heavy-duty pipe racks for refinery expansion projects.',
    highlights: ['1,500 MT high-grade steel fabricated', '100% weld ultrasonic inspection', 'Tight alignment tolerances met', 'Specialized polyurethane coatings'],
  },
] as const;

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
                <button
                  onClick={() => openModal(activeProj)}
                  className="btn btn--primary"
                  id="featured-project-primary"
                  aria-label={`View details for ${activeProj.title}`}
                >
                  View Project Details
                  <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </button>
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
