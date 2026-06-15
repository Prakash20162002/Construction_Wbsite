import { Download } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionCTA from '@/components/SectionCTA';
import type { Metadata } from 'next';
import styles from './quality-safety.module.css';

export const metadata: Metadata = {
  title: 'Quality & Safety — Bhandari Enterprise',
  description: 'Zero-defect fabrication and zero-harm site operations. Our quality management and site safety systems are built into every project we execute.',
};

const SAFETY_STATS = [
  { number: '0', label: 'Lost Time Injuries', sub: '5 consecutive years' },
  { number: '4.2M+', label: 'Safe Man-Hours', sub: 'Without LTI' },
  { number: '100%', label: 'PPE Compliance', sub: 'All active sites' },
  { number: '48', label: 'Safety Audits / Year', sub: 'Internal + Third-Party' },
];

const NDE_METHODS = [
  { code: 'UT', name: 'Ultrasonic Testing', use: 'Weld defect detection, thickness measurement', equipment: 'Olympus OmniScan MX2' },
  { code: 'RT', name: 'Radiographic Testing', use: 'Internal weld defects, porosity detection', equipment: 'Ir-192 Gamma Source (3rd party)' },
  { code: 'MPI', name: 'Magnetic Particle Inspection', use: 'Surface and near-surface defects in ferromagnetic materials', equipment: 'In-house yoke + bench unit' },
  { code: 'DPT', name: 'Dye Penetrant Testing', use: 'Surface discontinuities in all materials', equipment: 'Approved consumable kits' },
  { code: 'VT', name: 'Visual Testing', use: 'Primary method — all welds, dimensions, fit-up', equipment: 'AWS CWI certified inspectors' },
  { code: 'PMI', name: 'Positive Material ID', use: 'Alloy verification of incoming material', equipment: 'Olympus Vanta XRF gun' },
];

const TESTING_EQUIPMENT = [
  { item: 'Brinell / Vickers hardness tester', use: 'Post-weld hardness verification' },
  { item: 'Coating thickness gauge (Elcometer)', use: 'DFT measurement per SSPC' },
  { item: 'Holiday detector (Elcometer 266)', use: 'Pinhole detection in coatings' },
  { item: 'Weld gauge set', use: 'Weld profile and size measurement' },
  { item: 'Pressure test pump + gauges', use: 'Hydrotest of pressure vessels / pipe' },
  { item: 'CMM arm (Renishaw)', use: 'Dimensional verification of fabricated components' },
];

const DOWNLOAD_DOCS = [
  { name: 'Quality Policy Statement', size: '180 KB', format: 'PDF' },
  { name: 'HSE Policy Statement', size: '165 KB', format: 'PDF' },
  { name: 'ISO 9001:2015 Certificate', size: '320 KB', format: 'PDF' },
  { name: 'ISO 45001:2018 Certificate', size: '310 KB', format: 'PDF' },
  { name: 'Capability Statement', size: '2.4 MB', format: 'PDF' },
];

const QMS_STEPS = [
  { step: '01', label: 'Design Review', desc: 'Engineering drawings reviewed against spec' },
  { step: '02', label: 'Material Inspection', desc: 'MTR verification + incoming visual QC' },
  { step: '03', label: 'In-Process QC', desc: 'ITP checkpoints at every critical stage' },
  { step: '04', label: 'NDE Inspection', desc: 'UT/MPI/DPT as per WPS and code requirements' },
  { step: '05', label: 'Final Inspection', desc: 'Dimensional, visual, coating check — full report' },
  { step: '06', label: 'Dispatch Clearance', desc: 'Release note + complete documentation package' },
];

const CODES_COMPLIANCE = [
  { code: 'IS:800', title: 'General Construction in Steel', body: 'Bureau of Indian Standards' },
  { code: 'IS:456', title: 'Plain & Reinforced Concrete', body: 'Bureau of Indian Standards' },
  { code: 'ASME Sec VIII', title: 'Pressure Vessel Fabrication', body: 'ASME International' },
  { code: 'AWS D1.1', title: 'Structural Welding — Steel', body: 'American Welding Society' },
  { code: 'AISC 360', title: 'Specification for Structural Steel', body: 'AISC' },
  { code: 'IS:2911', title: 'Pile Foundation Design', body: 'Bureau of Indian Standards' },
  { code: 'BOCW Act', title: 'Building & Other Construction Workers', body: 'Ministry of Labour, India' },
  { code: 'NFPA 101', title: 'Life Safety Code', body: 'National Fire Protection Association' },
  { code: 'IS:9595', title: 'Metal Arc Welding of Carbon Steel', body: 'Bureau of Indian Standards' },
];

export default function QualitySafetyPage() {
  return (
    <>
      <PageHero
        overline="Quality & Safety"
        title="Quality Built In."
        titleAccent="Safety Non-Negotiable."
        lead="Zero-defect fabrication and zero-harm site operations — our quality and safety systems are embedded into every shift, every project, every site."
        breadcrumbs={[{ label: 'Quality & Safety' }]}
      />

      {/* QMS Overview */}
      <section className={`section ${styles.qms}`} id="quality" aria-labelledby="qms-heading">
        <div className="container container--content">
          <div className={styles.qmsGrid}>
            <div className={styles.qmsLeft}>
              <span className="overline">Quality Management System</span>
              <h2 id="qms-heading" className={styles.sectionHeading}>
                Zero-Defect Fabrication Process
              </h2>
              <p className={styles.qmsDesc}>
                Every fabricated component follows a documented Inspection Test Plan (ITP).
                Non-conformance Reports (NCR) trigger immediate hold, root-cause analysis,
                and corrective action before work resumes. Our quality system is not a
                box-ticking exercise — it is embedded in every shift.
              </p>
              <p className={styles.qmsDesc}>
                Our QMS is third-party audited by Bureau Veritas against ISO 9001:2015.
                Annual surveillance audits confirm continuous compliance. Internal audits
                run quarterly across all operational divisions.
              </p>
            </div>
            {/* QMS Process Flow */}
            <div className={styles.qmsFlow} aria-label="Quality control process steps">
              {QMS_STEPS.map((step, i) => (
                <div key={step.step} className={styles.qmsStep}>
                  <div className={styles.qmsStepNum}>{step.step}</div>
                  <div className={styles.qmsStepContent}>
                    <div className={styles.qmsStepLabel}>{step.label}</div>
                    <div className={styles.qmsStepDesc}>{step.desc}</div>
                  </div>
                  {i < QMS_STEPS.length - 1 && (
                    <div className={styles.qmsArrow} aria-hidden="true">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Stats */}
      <section className={styles.safetyStats} id="safety-statistics" aria-labelledby="stats-heading">
        <div className="container container--content">
          <h2 id="stats-heading" className="sr-only">Safety statistics</h2>
          <div className={styles.safetyStatsGrid}>
            {SAFETY_STATS.map((s) => (
              <div key={s.label} className={styles.safetyStatCard}>
                <span className={styles.safetyStatNum}>{s.number}</span>
                <span className={styles.safetyStatLabel}>{s.label}</span>
                <span className={styles.safetyStatSub}>{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NDE & Testing */}
      <section className={`section ${styles.nde}`} id="inspection" aria-labelledby="nde-heading">
        <div className="container container--content">
          <span className="overline">Inspection Capabilities</span>
          <h2 id="nde-heading" className={styles.sectionHeading}>
            Non-Destructive Examination & Testing
          </h2>
          <div className={styles.ndeGrid}>
            <div>
              <h3 className={styles.ndeSubHead}>NDE Methods</h3>
              <div className={styles.ndeTable}>
                {NDE_METHODS.map((m) => (
                  <div key={m.code} className={styles.ndeRow}>
                    <div className={styles.ndeCode}>{m.code}</div>
                    <div className={styles.ndeInfo}>
                      <div className={styles.ndeName}>{m.name}</div>
                      <div className={styles.ndeUse}>{m.use}</div>
                      <div className={styles.ndeEquip}>{m.equipment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={styles.ndeSubHead}>Testing Equipment</h3>
              <div className={styles.testTable}>
                {TESTING_EQUIPMENT.map((t) => (
                  <div key={t.item} className={styles.testRow}>
                    <div className={styles.testItem}>{t.item}</div>
                    <div className={styles.testUse}>{t.use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Codes & Standards */}
      <section className={`section ${styles.codes}`} id="compliance" aria-labelledby="codes-heading">
        <div className="container container--content">
          <span className="overline">Regulatory Compliance</span>
          <h2 id="codes-heading" className={styles.sectionHeading}>
            Codes & Standards We Comply With
          </h2>
          <div className={styles.codesGrid}>
            {CODES_COMPLIANCE.map((c) => (
              <div key={c.code} className={styles.codeCard}>
                <span className={styles.codeNum}>{c.code}</span>
                <span className={styles.codeTitle}>{c.title}</span>
                <span className={styles.codeBody}>{c.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Downloads */}
      <section className={`section ${styles.docs}`} id="documents" aria-labelledby="docs-heading">
        <div className="container container--content">
          <span className="overline">Compliance Documentation</span>
          <h2 id="docs-heading" className={styles.sectionHeading}>Download Policy Documents</h2>
          <div className={styles.docsList} role="list">
            {DOWNLOAD_DOCS.map((doc) => (
              <div key={doc.name} className={styles.docRow} role="listitem">
                <div className={styles.docIcon} aria-hidden="true">
                  <Download size={16} />
                </div>
                <div className={styles.docInfo}>
                  <span className={styles.docName}>{doc.name}</span>
                  <span className={styles.docMeta}>{doc.format} · {doc.size}</span>
                </div>
                <a
                  href={`/docs/${doc.name.toLowerCase().replace(/\s/g, '-')}.pdf`}
                  className="btn btn--secondary btn--sm"
                  aria-label={`Download ${doc.name} (${doc.size})`}
                  id={`download-${doc.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        heading="Need Compliance Documentation for Vendor Registration?"
        subtext="Contact our Quality team for expedited document provision, third-party audit access, and site safety method statements."
        primaryCta={{ label: 'Contact Quality Team', href: '/contact' }}
        secondaryCta={{ label: 'View Our Projects', href: '/projects' }}
      />
    </>
  );
}
