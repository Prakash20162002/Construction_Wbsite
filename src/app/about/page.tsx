import PageHero from '@/components/PageHero';
import SectionCTA from '@/components/SectionCTA';
import { COMPANY, STATS, CERTIFICATIONS } from '@/data/content';
import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us — 26 Years of Industrial Excellence | Bhandari Enterprise',
  description: 'Bhandari Enterprise: Established 1998 in Konnagar, West Bengal. Expert steel fabrication, erection, and civil construction services.',
};

const TIMELINE = [
  { year: '1998', event: 'Founded in Konnagar, Hooghly, West Bengal by the Bhandari family with a focus on precision steel fabrication.' },
  { year: '2003', event: 'Secured first large-scale PEB erection contract. Expanded to 80+ workforce and 2,000 sqm fabrication facility.' },
  { year: '2008', event: 'Expanded fabrication operations and delivered first multi-state projects. Crossed ₹10 Cr annual turnover milestone.' },
  { year: '2012', event: 'Expanded fabrication capacity with second CNC bay. First government infrastructure project completed.' },
  { year: '2016', event: 'Completed 50th major project. Diversified into civil construction and manufacturing for process plants.' },
  { year: '2020', event: 'Strengthened site safety systems and expanded civil construction capability across West Bengal.' },
  { year: '2022', event: 'Annual steel fabrication capacity expanded. Active projects across multiple states simultaneously.' },
  { year: '2024', event: '50+ projects delivered. 120+ skilled workforce. 26 years of uninterrupted industrial excellence.' },
];


const MVV = [
  {
    label: 'Mission',
    icon: '◈',
    statement: "To engineer and construct industrial structures that define India's manufacturing and infrastructure backbone — with uncompromising precision, safety, and speed.",
  },
  {
    label: 'Vision',
    icon: '◎',
    statement: "To be South Asia's most trusted industrial engineering company — known for delivering projects that push the boundaries of scale, complexity, and quality.",
  },
  {
    label: 'Values',
    icon: '◇',
    statement: 'Precision in every weld. Safety on every site. Integrity in every commitment. Partnership with every client. Excellence in every outcome.',
  },
];

const FACILITY_SPECS = [
  { label: 'Location', value: 'Konnagar, Hooghly, West Bengal' },
  { label: 'Covered Fabrication Area', value: '18,000 sq.m' },
  { label: 'Annual Capacity', value: '2,400 MT of steel fabricated' },
  { label: 'Craneage', value: 'Up to 50 MT single lift (EOT cranes)' },
  { label: 'Cutting Equipment', value: 'CNC plasma, CNC flame, band saw, circular saw' },
  { label: 'Welding Processes', value: 'MIG, TIG, SAW, SMAW, FCAW' },
  { label: 'Surface Treatment', value: 'Shot blasting (Sa 2.5), spray painting (SSKM booths)' },
  { label: 'NDE Capabilities', value: 'UT, RT, MPI, DPT, Visual (in-house)' },
];

const WORKFORCE_STATS = [
  { number: '150+', label: 'Total Workforce' },
  { number: '60+', label: 'Certified Welders (ASME/IS)' },
  { number: '8', label: 'Simultaneous Active Sites' },
  { number: '24/7', label: 'Site Operations Capability' },
];

export default function AboutPage() {
  const certs = CERTIFICATIONS as { code: string; title: string; body: string }[];
  return (
    <>
      <PageHero
        overline="Est. 1998 · Konnagar, West Bengal"
        title="Built On Precision."
        titleAccent="Trusted By Industry."
        lead="26 years of delivering steel fabrication, erection, manufacturing and civil construction across India's most demanding sectors."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Company Story — Timeline */}
      <section className={`section ${styles.story}`} id="history" aria-labelledby="story-heading">
        <div className="container container--content">
          <div className={styles.storyGrid}>
            <div className={styles.storyLeft}>
              <span className="overline">Our Journey</span>
              <h2 id="story-heading" className={styles.storyHeading}>
                26 Years of<br />Engineering Milestones
              </h2>
              <p className={styles.storyLead}>
                From a single fabrication bay in Konnagar, Hooghly to a pan-India industrial engineering
                company — Bhandari Enterprise has grown by consistently delivering what others said
                couldn&apos;t be done on time, on budget, without compromise.
              </p>
              <div className={styles.storyStats}>
                {STATS.map((s) => (
                  <div key={s.label} className={styles.storyStat}>
                    <span className={styles.storyStatNum}>{s.number}</span>
                    <span className={styles.storyStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className={styles.timeline} aria-label="Company history timeline">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className={styles.timelineItem}>
                  <div className={styles.timelineYear}>{item.year}</div>
                  <div className={styles.timelineDot} aria-hidden="true" />
                  <div className={styles.timelineContent}>{item.event}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>


      {/* Manufacturing Facility */}
      <section className={`section ${styles.facility}`} id="facility" aria-labelledby="facility-heading">
        <div className="container container--content">
          <div className={styles.facilityGrid}>
            <div className={styles.facilityLeft}>
              <span className="overline">Our Facility</span>
              <h2 id="facility-heading" className={styles.sectionHeading}>
                State-of-the-Art<br />Fabrication Facility
              </h2>
              <p className={styles.facilityLead}>
                Our Konnagar facility operates across 18,000 sqm with industry-leading equipment,
                ensuring every component meets precision tolerances before it leaves our yard.
              </p>
              <dl className={styles.specTable}>
                {FACILITY_SPECS.map((spec) => (
                  <div key={spec.label} className={styles.specRow}>
                    <dt className={styles.specLabel}>{spec.label}</dt>
                    <dd className={styles.specValue}>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Facility visual grid */}
            <div className={styles.facilityRight} aria-hidden="true">
              <div className={styles.facilityVisualGrid}>
                {['FABRICATION BAY', 'CNC CUTTING', 'WELDING SHOP', 'QC LAB', 'PAINTING BOOTH', 'DISPATCH YARD'].map((label) => (
                  <div key={label} className={styles.facilityCell}>
                    <span className={styles.facilityCellLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workforce Stats */}
      <section className={`section ${styles.workforce}`} id="workforce" aria-labelledby="workforce-heading">
        <div className="container container--content">
          <span className="overline">Our People</span>
          <h2 id="workforce-heading" className={`${styles.sectionHeading} ${styles.workforceHeading}`}>
            150+ Specialists. One Standard.
          </h2>
          <div className={styles.workforceGrid}>
            {WORKFORCE_STATS.map((s) => (
              <div key={s.label} className={styles.workforceCard}>
                <span className={styles.workforceNum}>{s.number}</span>
                <span className={styles.workforceLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <p className={styles.workforcePara}>
            Every member of our workforce undergoes rigorous safety and technical training.
            Welders are certified to ASME and IS code standards. Site engineers carry
            NEBOSH or IOSH safety qualifications. We invest in our people because our
            clients invest their projects in us.
          </p>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className={`section ${styles.mvv}`} id="mission-vision" aria-labelledby="mvv-heading">
        <div className="container container--content">
          <span className="overline">What Drives Us</span>
          <h2 id="mvv-heading" className={styles.sectionHeading}>Mission, Vision & Values</h2>
          <div className={`${styles.mvvGrid} reveal-group`}>
            {MVV.map((item) => (
              <div key={item.label} className={`reveal ${styles.mvvCard}`}>
                <div className={styles.mvvIcon} aria-hidden="true">{item.icon}</div>
                <h3 className={styles.mvvLabel}>{item.label}</h3>
                <p className={styles.mvvStatement}>{item.statement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Compliance — only show if there are certifications */}
      {certs.length > 0 && (
        <section className={`section ${styles.certs}`} id="certifications" aria-labelledby="cert-heading">
          <div className="container container--content">
            <span className="overline">Quality & Compliance</span>
            <h2 id="cert-heading" className={styles.sectionHeading}>Our Standards & Compliance</h2>
            <div className={`${styles.certGrid} reveal-group`}>
              {certs.map((cert) => (
                <div key={cert.code} className={`reveal ${styles.certCard}`}>
                  <div className={styles.certCheck} aria-hidden="true">✓</div>
                  <div className={styles.certCode}>{cert.code}</div>
                  <div className={styles.certTitle}>{cert.title}</div>
                  <div className={styles.certBody}>{cert.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SectionCTA
        heading="Discuss Your Project Requirements"
        subtext="Our senior project engineers are available to assess your requirements and provide a detailed technical proposal."
        primaryCta={{ label: 'Start a Conversation', href: '/contact' }}
        secondaryCta={{ label: 'View Our Capabilities', href: '/capabilities' }}
      />
    </>
  );
}
