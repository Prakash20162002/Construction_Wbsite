'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionCTA from '@/components/SectionCTA';
import styles from './projects.module.css';

const ALL_PROJECTS = [
  {
    id: 'industrial-warehouse-ludhiana',
    title: 'Industrial Warehouse Complex',
    category: 'Steel Fabrication & Erection',
    sector: 'Logistics',
    serviceType: 'Erection',
    location: 'Ludhiana, Punjab',
    area: '28,000 sq.m',
    weight: '1,200 MT',
    year: '2024',
    scaleRange: '>1000',
    client: 'National Logistics Corporation',
    image: '/proj-industrial-bldg-v2.jpg',
    summary: 'Design and erection of a 28,000 sqm multi-bay logistics warehouse with 12m clear height, 30T EOT crane provision, and insulated roofing system — completed 3 weeks ahead of schedule.',
    highlights: ['28,000 sqm covered area', '1,200 MT structural steel', '3 weeks ahead of schedule', 'Zero safety incidents'],
    featured: true,
  },
  {
    id: 'peb-factory-pune',
    title: 'Pre-Engineered Factory Building',
    category: 'PEB Erection',
    sector: 'Manufacturing',
    serviceType: 'Erection',
    location: 'Pune, Maharashtra',
    area: '15,000 sq.m',
    weight: '680 MT',
    year: '2024',
    scaleRange: '500-1000',
    client: 'Automotive Components Ltd',
    image: '/stage-manufacturing.jpg',
    summary: 'Full supply-and-erect PEB project for an automotive components manufacturer. Included mezzanine levels, overhead crane bays, and pre-engineered office block.',
    highlights: ['15,000 sqm factory floor', '680 MT steel', 'Mezzanine + crane bays', 'IS:800 compliant design'],
    featured: false,
  },
  {
    id: 'chemical-plant-gujarat',
    title: 'Chemical Process Plant Structure',
    category: 'Manufacturing & Erection',
    sector: 'Petrochemical',
    serviceType: 'Manufacturing',
    location: 'Ankleshwar, Gujarat',
    area: 'Multi-Level',
    weight: '940 MT',
    year: '2023',
    scaleRange: '500-1000',
    client: 'ChemProcess India Ltd',
    image: '/proj-pipe-rack.jpg',
    summary: 'Multi-level process plant structure including pipe racks, equipment platforms, access stairs, and pressure vessel support frames for a large chemical manufacturing facility.',
    highlights: ['6-level process structure', '940 MT fabricated', 'ASME pressure vessels', 'Corrosion-resistant coatings'],
    featured: false,
  },
  {
    id: 'logistics-hub-noida',
    title: 'Logistics Hub — Phase I & II',
    category: 'Civil & Steel',
    sector: 'Logistics',
    serviceType: 'Civil',
    location: 'Greater Noida, Delhi NCR',
    area: '42,000 sq.m',
    weight: '1,800 MT',
    year: '2023',
    scaleRange: '>1000',
    client: 'E-Commerce Logistics Pvt Ltd',
    image: '/proj-infrastructure.jpg',
    summary: 'Two-phase EPC delivery of a mega-distribution hub. Phase I: civil, foundations, and ground slab. Phase II: steel superstructure and building envelope across 42,000 sqm.',
    highlights: ['42,000 sqm — 2 phases', '1,800 MT structural steel', 'Full EPC contract', '18-month delivery'],
    featured: false,
  },
  {
    id: 'power-plant-rajasthan',
    title: 'Power Plant Supporting Structure',
    category: 'Industrial Manufacturing',
    sector: 'Power',
    serviceType: 'Manufacturing',
    location: 'Suratgarh, Rajasthan',
    area: 'Large-Scale',
    weight: '2,200 MT',
    year: '2022',
    scaleRange: '>1000',
    client: 'State Power Generation Corp',
    image: '/proj-plant-erection-v2.jpg',
    summary: 'Complete structural steel supporting framework for a 660 MW thermal power plant — including turbine hall, boiler house structure, coal bunker support, and ESP housing.',
    highlights: ['2,200 MT steel fabricated', '660 MW plant support', 'Turbine + boiler structures', 'Corrosion protection system'],
    featured: false,
  },
  {
    id: 'cold-storage-haryana',
    title: 'Cold Storage & Logistics Facility',
    category: 'Civil Construction',
    sector: 'Logistics',
    serviceType: 'Civil',
    location: 'Kundli, Haryana',
    area: '18,500 sq.m',
    weight: '520 MT',
    year: '2022',
    scaleRange: '500-1000',
    client: 'AgroFreeze Storage Ltd',
    image: '/stage-civil.jpg',
    summary: 'End-to-end civil and structural package for a multi-chamber cold storage facility with controlled atmosphere rooms, solar-ready roofing, and dock leveller provisions.',
    highlights: ['18,500 sqm facility', 'CA room construction', 'Solar-ready roof structure', 'Grade A cold storage'],
    featured: false,
  },
  {
    id: 'govt-warehouse-up',
    title: 'Government Grain Storage Silos',
    category: 'Civil & Steel',
    sector: 'Government',
    serviceType: 'Civil',
    location: 'Lucknow, Uttar Pradesh',
    area: '8 × 1,000 MT capacity',
    weight: '380 MT',
    year: '2022',
    scaleRange: '<500',
    client: 'Food Corporation of India',
    image: '/stage-erection.jpg',
    summary: 'Design and construction of eight concrete grain storage silos each with 1,000 MT capacity, including aeration systems, extraction conveyors, and site civil works.',
    highlights: ['8,000 MT total storage', 'FCI government project', 'Aeration + extraction', 'Phased delivery'],
    featured: false,
  },
  {
    id: 'pharma-plant-himachal',
    title: 'Pharmaceutical Manufacturing Block',
    category: 'Civil & Steel',
    sector: 'Pharmaceuticals',
    serviceType: 'Civil',
    location: 'Baddi, Himachal Pradesh',
    area: '6,500 sq.m',
    weight: '290 MT',
    year: '2023',
    scaleRange: '<500',
    client: 'PharmaBuild Infrastructure Ltd',
    image: '/stage-fabrication.jpg',
    summary: 'Precision civil and structural package for a GMP-compliant pharmaceutical manufacturing block. Included cleanroom slab, epoxy flooring, MEP-embedded civil works, and false ceiling provisions.',
    highlights: ['GMP-compliant structure', 'Epoxy flooring system', 'Cleanroom slab accuracy ±2mm', 'WHO/GMP compliant'],
    featured: false,
  },
];

const SECTORS = ['All Sectors', 'Petrochemical', 'Power', 'Logistics', 'Manufacturing', 'Government', 'Pharmaceuticals'];
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
                {shown.map((project) => (
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
    </>
  );
}
