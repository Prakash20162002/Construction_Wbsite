import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, User, Square, Weight, Calendar, ChevronRight, ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import { PROJECTS, COMPANY } from '@/data/content';
import ProjectRatingWidget from '@/components/ProjectRatingWidget';
import styles from './project-detail.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) {
    return {
      title: 'Project Case Study Not Found | Bhandari Enterprise',
      description: 'The requested industrial project case study could not be found.',
    };
  }

  const isEasternRegion = 
    project.location.includes('West Bengal') || 
    project.location.includes('Jharkhand') || 
    project.location.includes('Odisha') || 
    project.location.includes('Bihar');

  let title = '';
  let description = '';

  if (isEasternRegion) {
    // Highly optimized regional title targeting Hooghly, Kolkata, Jamshedpur, Paradip, Gaya, etc.
    title = `${project.title} - ${project.location} | Industrial Construction`;
    description = `Case study: ${project.title} in ${project.location}. We deliver premium structural steel fabrication, mechanical plant erection, and civil works in West Bengal and nearby eastern states.`;
  } else {
    title = `${project.title} at ${project.location} | Bhandari Enterprise`;
    description = `Discover how we executed the ${project.title} project in ${project.location}. Turnkey industrial engineering, steel fabrication, and structural erection services.`;
  }

  // Ensure description is under 160 characters
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  return {
    title,
    description,
    keywords: [
      `${project.category} ${project.location}`,
      `${project.title} case study`,
      'steel fabrication Hooghly West Bengal',
      'industrial construction eastern India',
      'structural steel erection Kolkata',
      'Bhandari Enterprise projects',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_IN',
      siteName: 'Bhandari Enterprise',
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) {
    notFound();
  }

  const locationState = project.location.split(',').pop()?.trim() || '';

  return (
    <div className={styles.page}>
      {/* ─── HERO BANNER ─── */}
      <section className={styles.hero} aria-labelledby="project-title">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container container--content">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadLink}>Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href="/projects" className={styles.breadLink}>Projects</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className={styles.breadCurrent}>{project.title}</span>
          </nav>

          <div className={styles.heroContent}>
            <span className={styles.overline}>
              <span className={styles.overlineLine} />
              Industrial Case Study
            </span>
            <h1 id="project-title" className={styles.heroTitle}>
              {project.title}
            </h1>
            <div className={styles.heroMeta}>
              <span className={styles.catBadge}>{project.category}</span>
              <span className={styles.locationBadge}>
                <MapPin size={14} aria-hidden="true" />
                {project.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className={styles.statsStrip} aria-label="Project Statistics">
        <div className="container container--content">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Client</span>
              <span className={styles.statValue}>{project.client || 'Bhandari Enterprise'}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Location</span>
              <span className={styles.statValue}>{project.location.split(',')[0]}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Year Completed</span>
              <span className={styles.statValue}>{project.year}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Covered Area</span>
              <span className={styles.statValue}>{project.area || 'N/A'}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Steel Tonnage</span>
              <span className={styles.statValue}>{project.weight || 'Custom Specification'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT GRID ─── */}
      <section className={styles.mainContent}>
        <div className="container container--content">
          <div className={styles.contentGrid}>
            
            {/* Left Column: Case Study Details */}
            <div className={styles.primaryColumn}>
              <article className={styles.detailsBlock}>
                <h2 className={styles.sectionHeading}>Project Overview & Scope</h2>
                <p className={styles.bodyText}>
                  {project.summary}
                </p>
                <p className={styles.bodyText}>
                  This industrial facility was constructed using advanced pre-engineered steel members fabricated in our state-of-the-art facility in Konnagar, Hooghly, West Bengal. Structural members were designed to meet stringent IS:800 and AWS D1.1 engineering codes, ensuring maximum structural integrity, load-bearing capacity, and resilience.
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className={styles.highlightsBox}>
                    <h3 className={styles.boxTitle}>Key Project Achievements</h3>
                    <ul className={styles.highlightsList}>
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className={styles.highlightItem}>
                          <ShieldCheck size={18} className={styles.highlightCheck} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              {/* Before/After Gallery */}
              {project.imageBefore && project.imageAfter && (
                <article className={styles.galleryBlock}>
                  <h2 className={styles.sectionHeading}>Case Study: Execution Stages</h2>
                  <p className={styles.gallerySubtext}>
                    Compare the initial site construction/fabrication phase with the completed structural steel erection.
                  </p>
                  <div className={styles.beforeAfterGrid}>
                    <div className={styles.galleryCard}>
                      <span className={styles.stageLabel}>Initial Construction Stage</span>
                      <div className={styles.imageWrapper}>
                        <Image 
                          src={project.imageBefore} 
                          alt={`Initial construction stage of ${project.title}`}
                          fill
                          sizes="(max-width: 767px) 100vw, 400px"
                          className={styles.galleryImage}
                        />
                      </div>
                    </div>
                    <div className={styles.galleryCard}>
                      <span className={`${styles.stageLabel} ${styles.afterLabel}`}>Completed Structure</span>
                      <div className={styles.imageWrapper}>
                        <Image 
                          src={project.imageAfter} 
                          alt={`Completed structure of ${project.title}`}
                          fill
                          sizes="(max-width: 767px) 100vw, 400px"
                          className={styles.galleryImage}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* User Ratings Widget */}
              <ProjectRatingWidget projectId={project.id} projectTitle={project.title} />
            </div>

            {/* Right Column: Sidebar Spec Card & Action CTA */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Engineering Profile</h3>
                <div className={styles.specList}>
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Sector</span>
                    <span className={styles.specVal}>{project.sector}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Service Type</span>
                    <span className={styles.specVal}>{project.serviceType}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Tonnage Scale</span>
                    <span className={styles.specVal}>{project.scaleRange} MT</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Project Code</span>
                    <span className={styles.specVal}>BE-PRJ-{project.id.toUpperCase().substring(0, 6)}</span>
                  </div>
                </div>

                <div className={styles.tagStrip}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tagBadge}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Quick Contact Box */}
              <div className={styles.contactCard}>
                <h3 className={styles.contactTitle}>Have a Similar Project?</h3>
                <p className={styles.contactText}>
                  Get in touch with our project management team in West Bengal to discuss your engineering requirements.
                </p>
                <div className={styles.contactActions}>
                  <Link href="/contact" className="btn btn--primary btn--full">
                    Discuss Your Project <ChevronRight size={16} />
                  </Link>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className={styles.phoneLink}>
                    <Phone size={16} />
                    <span>Call our Project Desk: {COMPANY.phone}</span>
                  </a>
                </div>
              </div>

              <Link href="/projects" className={styles.backLink}>
                <ArrowLeft size={16} />
                <span>Back to Project Portfolio</span>
              </Link>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}
