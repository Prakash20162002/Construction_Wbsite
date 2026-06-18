'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionCTA from '@/components/SectionCTA';
import { PROJECTS } from '@/data/content';
import styles from './projects.module.css';
import ProjectDetailsModal, { Project } from '@/components/ProjectDetailsModal';

const ALL_PROJECTS = PROJECTS;

const SECTORS = ['All Sectors', 'Petrochemical', 'Power', 'Logistics', 'Manufacturing', 'Government', 'Pharmaceuticals', 'Automotive'];
const SERVICES = ['All Services', 'Erection', 'Manufacturing', 'Civil'];
const SCALES = ['All Scales', '<500', '500-1000', '>1000'];
const YEARS = ['All Years', '2024', '2023', '2022'];

const FEATURED = ALL_PROJECTS.find((p) => p.featured)!;

export default function ProjectsPage() {
  const [sector, setSector] = useState('All Sectors');
  const [service, setService] = useState('All Services');
  const [scale, setScale] = useState('All Scales');
  const [year, setYear] = useState('All Years');
  const [visible, setVisible] = useState(9);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const filtered = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      if (sector !== 'All Sectors' && p.sector !== sector) return false;
      if (service !== 'All Services' && p.serviceType !== service) return false;
      if (scale !== 'All Scales' && p.scaleRange !== scale) return false;
      if (year !== 'All Years' && p.year !== year) return false;
      return true;
    });
  }, [sector, service, scale, year]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <>
      <PageHero
        overline="Project Portfolio"
        title="50+ Projects."
        titleAccent="Every Sector. Across India."
        breadcrumbs={[{ label: 'Projects' }]}
        stats={[
          { number: '50+', label: 'Projects Completed' },
          { number: '15+', label: 'States Covered' },
          { number: '2,400T', label: 'Steel Annually' },
          { number: '2,200T', label: 'Largest Single Project' },
        ]}
      />

      {/* Filter Bar */}
      <div className={styles.filterBar} role="search" aria-label="Filter projects">
        <div className="container container--content">
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="filter-sector">Sector</label>
              <select
                id="filter-sector"
                className={styles.filterSelect}
                value={sector}
                onChange={(e) => { setSector(e.target.value); setVisible(9); }}
              >
                {SECTORS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="filter-service">Service</label>
              <select
                id="filter-service"
                className={styles.filterSelect}
                value={service}
                onChange={(e) => { setService(e.target.value); setVisible(9); }}
              >
                {SERVICES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="filter-scale">Scale (MT)</label>
              <select
                id="filter-scale"
                className={styles.filterSelect}
                value={scale}
                onChange={(e) => { setScale(e.target.value); setVisible(9); }}
              >
                {SCALES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="filter-year">Year</label>
              <select
                id="filter-year"
                className={styles.filterSelect}
                value={year}
                onChange={(e) => { setYear(e.target.value); setVisible(9); }}
              >
                {YEARS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.resultCount} aria-live="polite" aria-atomic="true">
              Showing <strong>{Math.min(shown.length, filtered.length)}</strong> of <strong>{filtered.length}</strong> projects
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <section className={`section ${styles.grid}`} aria-labelledby="projects-grid-heading">
        <h2 id="projects-grid-heading" className="sr-only">Project listings</h2>
        <div className="container container--content">
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>No projects match your filters. Try adjusting the criteria above.</p>
              <button
                className="btn btn--secondary"
                onClick={() => { setSector('All Sectors'); setService('All Services'); setScale('All Scales'); setYear('All Years'); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className={styles.projectGrid} role="list">
                {shown.map((project, index) => (
                  <article key={project.id} className={styles.projectCard} role="listitem">
                    {/* Project Image */}
                    <div className={styles.cardVisual}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className={styles.cardImage}
                        quality={80}
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className={styles.cardImageOverlay} />
                      <span className={styles.cardVisualLabel}>{project.category}</span>
                      <span className={styles.cardYear}>{project.year}</span>
                    </div>
                    {/* Content */}
                    <div className={styles.cardBody}>
                      <span className={styles.cardSector}>{project.sector}</span>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <div className={styles.cardLocation}>
                        <MapPin size={12} aria-hidden="true" />
                        {project.location}
                      </div>
                      <div className={styles.cardSpecs}>
                        <span className={styles.cardSpec}>
                          <span className={styles.cardSpecKey}>Area</span>
                          <span className={styles.cardSpecVal}>{project.area}</span>
                        </span>
                        <span className={styles.cardSpec}>
                          <span className={styles.cardSpecKey}>Steel</span>
                          <span className={styles.cardSpecVal}>{project.weight}</span>
                        </span>
                      </div>
                      <Link
                        href={`/projects/${project.id}`}
                        className={styles.cardCta}
                        aria-label={`View case study for ${project.title}`}
                      >
                        View Case Study
                        <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className={styles.loadMoreWrap}>
                  <button
                    className="btn btn--secondary btn--lg"
                    onClick={() => setVisible((v) => v + 6)}
                    id="load-more-projects"
                  >
                    Load More Projects ({filtered.length - visible} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Case Study */}
      <section className={`section ${styles.featured}`} aria-labelledby="featured-heading">
        <div className="container container--content">
          <span className="overline">Featured Case Study</span>
          <h2 id="featured-heading" className={styles.featuredHeading}>
            In-Depth Project Profile
          </h2>
          <div className={styles.featuredGrid}>
            <div className={styles.featuredVisual} aria-hidden="true">
              <div className={styles.featuredPattern} />
              <div className={styles.featuredOverlay}>
                <span className={styles.featuredCatPill}>{FEATURED.category}</span>
                <span className={styles.featuredVisualTitle}>{FEATURED.title}</span>
              </div>
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredMeta}>
                <span className={styles.featuredYear}>{FEATURED.year}</span>
                <span className={styles.featuredLocation}>
                  <MapPin size={12} aria-hidden="true" /> {FEATURED.location}
                </span>
              </div>
              <h3 className={styles.featuredTitle}>{FEATURED.title}</h3>
              <p className={styles.featuredSummary}>{FEATURED.summary}</p>
              <div className={styles.featuredHighlights}>
                {FEATURED.highlights.map((h) => (
                  <div key={h} className={styles.featuredHighlight}>
                    <span className={styles.featureDot} aria-hidden="true" />
                    {h}
                  </div>
                ))}
              </div>
              <Link
                href={`/projects/${FEATURED.id}`}
                className="btn btn--primary btn--lg"
                id="featured-case-study-cta"
                style={{ cursor: 'pointer' }}
              >
                Read Full Case Study
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionCTA
        heading="Have a Similar Project?"
        subtext="Share your requirements with our project team. We'll assess feasibility and provide a detailed technical and commercial proposal."
        primaryCta={{ label: 'Discuss Your Project', href: '/contact' }}
        secondaryCta={{ label: 'View Our Capabilities', href: '/capabilities' }}
      />

      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
}
