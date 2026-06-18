'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionCTA from '@/components/SectionCTA';
import styles from './projects.module.css';
import ProjectDetailsModal, { Project } from '@/components/ProjectDetailsModal';

const ALL_PROJECTS = [
  {
    id: 'steel-fabrication',
    title: 'Structural Steel Fabrication',
    category: 'Steel Fabrication',
    sector: 'Manufacturing',
    serviceType: 'Manufacturing',
    location: 'Konnagar, Hooghly, West Bengal',
    area: '12,000 sq.m',
    weight: '1,200 MT',
    year: '2024',
    scaleRange: '>1000',
    client: 'Bhandari Enterprise Manufacturing Facility',
    image: '/proj-steel-fab-v2.jpg',
    imageBefore: '/stage-fabrication.jpg',
    imageAfter: '/proj-steel-fab-v2.jpg',
    summary: 'In-house high-precision fabrication of heavy structural steel components including columns, box girders, and customized truss members complying with IS:800 and AWS D1.1 standards.',
    highlights: ['1,200 MT steel fabricated', 'Ultrasonic and magnetic particle tested', '100% weld compliance rate', 'Just-in-time delivery to site'],
    featured: true,
  },
  {
    id: 'industrial-building',
    title: 'Industrial Building Construction',
    category: 'Industrial Building',
    sector: 'Logistics',
    serviceType: 'Civil',
    location: 'Ludhiana, Punjab',
    area: '28,000 sq.m',
    weight: '1,200 MT',
    year: '2024',
    scaleRange: '>1000',
    client: 'National Logistics Corporation',
    image: '/proj-industrial-bldg-v2.jpg',
    imageBefore: '/stage-civil.jpg',
    imageAfter: '/proj-industrial-bldg-v2.jpg',
    summary: 'EPC execution of a large-scale pre-engineered industrial warehouse complex. Built to withstand high wind loads and heavy EOT crane movements.',
    highlights: ['28,000 sqm covered area', 'Delivered 3 weeks ahead of schedule', 'AISC compliant steel erection', 'Full turnkey civil and superstructure package'],
    featured: false,
  },
  {
    id: 'pipe-rack',
    title: 'Pipe Rack Installation',
    category: 'Pipe Rack Installation',
    sector: 'Petrochemical',
    serviceType: 'Erection',
    location: 'Ankleshwar, Gujarat',
    area: 'Multi-Level',
    weight: '940 MT',
    year: '2023',
    scaleRange: '500-1000',
    client: 'ChemProcess India Ltd',
    image: '/proj-pipe-rack.jpg',
    imageBefore: '/stage-erection.jpg',
    imageAfter: '/proj-pipe-rack.jpg',
    summary: 'Design, fabrication, and heavy lift erection of multi-level industrial pipe racks, chemical process equipment supports, and access platforms.',
    highlights: ['940 MT structural steel work', 'ASME B31.3 compliance for piping clearances', 'Multi-level high elevation structures', 'Corrosion-resistant epoxy coatings'],
    featured: false,
  },
  {
    id: 'plant-erection',
    title: 'Mechanical Plant Erection',
    category: 'Mechanical Plant Erection',
    sector: 'Power',
    serviceType: 'Erection',
    location: 'Suratgarh, Rajasthan',
    area: 'Large-Scale',
    weight: '2,200 MT',
    year: '2022',
    scaleRange: '>1000',
    client: 'State Power Generation Corp',
    image: '/proj-plant-erection-v2.jpg',
    imageBefore: '/stage-civil.jpg',
    imageAfter: '/proj-plant-erection-v2.jpg',
    summary: 'Heavy structural erection and equipment mounting for a thermal power plant. Managed heavy lifts up to 50MT using specialized site cranes under stringent safety regulations.',
    highlights: ['2,200 MT total steel weight', '660 MW power plant support', 'Completed within tight shutdown windows', 'Full EPC project responsibility'],
    featured: false,
  },
  {
    id: 'infrastructure',
    title: 'Industrial Infrastructure Development',
    category: 'Infrastructure Development',
    sector: 'Logistics',
    serviceType: 'Civil',
    location: 'Greater Noida, Delhi NCR',
    area: '42,000 sq.m',
    weight: '1,800 MT',
    year: '2023',
    scaleRange: '>1000',
    client: 'E-Commerce Logistics Pvt Ltd',
    image: '/proj-infrastructure.jpg',
    imageBefore: '/stage-civil.jpg',
    imageAfter: '/proj-infrastructure.jpg',
    summary: 'Turnkey industrial infrastructure development including land grading, foundation piling, grade slabs, and steel structural envelope for a premium distribution hub.',
    highlights: ['42,000 sqm development across Phase I & II', '18-month overall timeline met', 'Turnkey civil and structural engineering', 'High-durability vacuum dewatered flooring'],
    featured: false,
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
    client: 'Varroc Engineering Ltd',
    image: '/stage-manufacturing-1.jpg',
    imageBefore: '/stage-manufacturing-1.jpg',
    imageAfter: '/stage-manufacturing-2.jpg',
    summary: 'Fabrication and erection of a state-of-the-art pre-engineered factory building with high-capacity overhead crane supports and high-durability floor systems.',
    highlights: ['680 MT structural steel erected', 'Overhead crane support systems', 'Completed in 120 days', 'Zero safety incidents'],
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
    client: 'FreshFoods Logistics Ltd',
    image: '/stage-civil.jpg',
    imageBefore: '/stage-civil.jpg',
    imageAfter: '/proj-infrastructure.jpg',
    summary: 'Turnkey execution of a modern cold storage warehouse complex, including foundation piling, civil structure, structural steel roofing, and high-efficiency thermal insulation work.',
    highlights: ['18,500 sqm covered area', 'Precision temperature-controlled floor slab', 'Insulated wall cladding', 'Complete civil & steel package'],
    featured: false,
  },
  {
    id: 'refinery-support-gujarat',
    title: 'Refinery Expansion Structurals',
    category: 'Industrial Manufacturing',
    sector: 'Petrochemical',
    serviceType: 'Manufacturing',
    location: 'Jamnagar, Gujarat',
    area: '15,000 sq.m',
    weight: '1,500 MT',
    year: '2023',
    scaleRange: '>1000',
    client: 'Reliance Industries Limited',
    image: '/stage-erection.jpg',
    imageBefore: '/stage-erection.jpg',
    imageAfter: '/proj-pipe-rack.jpg',
    summary: 'Manufacturing and on-site assembly of high-strength structural steel assemblies, reactor platforms, and heavy-duty pipe racks for refinery expansion projects.',
    highlights: ['1,500 MT high-grade steel fabricated', '100% weld ultrasonic inspection', 'Tight alignment tolerances met', 'Specialized polyurethane coatings'],
    featured: false,
  },
  {
    id: 'heavy-manufacturing-bengal',
    title: 'Heavy Machine Manufacturing Shed',
    category: 'Steel Fabrication',
    sector: 'Manufacturing',
    serviceType: 'Manufacturing',
    location: 'Kolkata, West Bengal',
    area: '8,500 sq.m',
    weight: '850 MT',
    year: '2024',
    scaleRange: '500-1000',
    client: 'Bengal Heavy Machinery Ltd',
    image: '/stage-fabrication.jpg',
    imageBefore: '/stage-fabrication.jpg',
    imageAfter: '/stage-manufacturing-1.jpg',
    summary: 'Fabrication and erection of heavy-duty machine tool manufacturing shed with double-tier crane runways, specialized gantry girder assemblies, and thermal-insulated sheet siding.',
    highlights: ['850 MT steel fabrication', 'Double-tier crane runway integration', 'Designed for 50T overhead crane capacity', '100% UT weld inspection achieved'],
    featured: false,
  },
  {
    id: 'machinery-skids-asansol',
    title: 'Process Compressor Skids',
    category: 'Industrial Manufacturing',
    sector: 'Power',
    serviceType: 'Manufacturing',
    location: 'Asansol, West Bengal',
    area: '4,500 sq.m',
    weight: '450 MT',
    year: '2023',
    scaleRange: '<500',
    client: 'Eastern Gas & Power Corp',
    image: '/stage-manufacturing-2.jpg',
    imageBefore: '/stage-manufacturing-2.jpg',
    imageAfter: '/stage-manufacturing-1.jpg',
    summary: 'Modular fabrication and stress-relieving of structural steel skids for heavy rotating machinery, including compressor foundation frames and turbine baseplates.',
    highlights: ['450 MT high-tolerance skid structures', 'Vibration-damping structural design', 'In-house precision face milling', 'Stress relief heat treatment certified'],
    featured: false,
  },
  {
    id: 'cement-tower-durgapur',
    title: 'Cement Plant Preheater Tower',
    category: 'Mechanical Plant Erection',
    sector: 'Manufacturing',
    serviceType: 'Erection',
    location: 'Durgapur, West Bengal',
    area: 'Multi-Level',
    weight: '1,850 MT',
    year: '2024',
    scaleRange: '>1000',
    client: 'Durgapur Cement Industries',
    image: '/proj-cement-tower.png',
    imageBefore: '/stage-erection.jpg',
    imageAfter: '/proj-cement-tower.png',
    summary: 'Precision assembly and high-elevation erection of a 90-meter tall multi-level cement plant preheater tower structure including heavy equipment platforms and duct supports.',
    highlights: ['1,850 MT high-strength steel erected', '90m elevation assembly', 'Completed in active operating plant environment', 'Strict heavy-lift crane plan validation'],
    featured: false,
  },
  {
    id: 'substation-erection-bihar',
    title: '765kV Substation Steel Gantries',
    category: 'Structural Erection',
    sector: 'Power',
    serviceType: 'Erection',
    location: 'Gaya, Bihar',
    area: 'Large-Scale',
    weight: '720 MT',
    year: '2023',
    scaleRange: '500-1000',
    client: 'Power Grid Corporation of India',
    image: '/proj-substation.png',
    imageBefore: '/stage-civil.jpg',
    imageAfter: '/proj-substation.png',
    summary: 'Fabrication, hot-dip galvanizing, and site erection of critical high-voltage transmission gantries, tower structures, and equipment supports for a 765kV power substation.',
    highlights: ['720 MT galvanized steel work', 'Hot-dip galvanizing complying with IS:2629', 'Zero structural mismatches during assembly', 'Strict clearance alignment tolerances met'],
    featured: false,
  },
  {
    id: 'chemical-piping-odisha',
    title: 'Process Pipe & Equipment Racks',
    category: 'Pipe Rack Installation',
    sector: 'Petrochemical',
    serviceType: 'Erection',
    location: 'Paradip, Odisha',
    area: 'Multi-Level',
    weight: '1,100 MT',
    year: '2023',
    scaleRange: '>1000',
    client: 'Odisha Petrochemical Ltd',
    image: '/proj-piping-details.png',
    imageBefore: '/stage-fabrication.jpg',
    imageAfter: '/proj-piping-details.png',
    summary: 'Turnkey fabrication, integration, and erection of process piping manifolds, high-elevation pipe rack modules, and associated instrumentation access bridges.',
    highlights: ['1,100 MT structural steel elements', 'Stainless steel process piping integration', 'ASME B31.3 inspection compliance', 'Radiography testing of all pipe joints'],
    featured: false,
  },
  {
    id: 'peb-warehouse-jamshedpur',
    title: 'Automotive Parts Warehouse',
    category: 'Industrial Building',
    sector: 'Automotive',
    serviceType: 'Civil',
    location: 'Jamshedpur, Jharkhand',
    area: '32,000 sq.m',
    weight: '1,200 MT',
    year: '2024',
    scaleRange: '>1000',
    client: 'Tata Motors Vendor Park',
    image: '/proj-warehouse-interior.png',
    imageBefore: '/stage-civil.jpg',
    imageAfter: '/proj-warehouse-interior.png',
    summary: 'Design-build execution of a premium automotive parts storage and dispatch warehouse with FM Global-compliant fire layout, high load concrete floors, and multi-span PEB structure.',
    highlights: ['32,000 sqm enclosed area', 'High-strength steel structural members', 'FM Global fire safety code compliance', 'Completed 4 weeks ahead of schedule'],
    featured: false,
  },
];

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
                      <button
                        onClick={() => openModal(project as any)}
                        className={styles.cardCta}
                        aria-label={`View case study for ${project.title}`}
                      >
                        View Case Study
                        <ChevronRight size={14} aria-hidden="true" />
                      </button>
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
              <button
                onClick={() => openModal(FEATURED)}
                className="btn btn--primary btn--lg"
                id="featured-case-study-cta"
                style={{ cursor: 'pointer' }}
              >
                Read Full Case Study
                <ChevronRight size={18} aria-hidden="true" />
              </button>
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
