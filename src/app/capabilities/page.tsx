import Link from 'next/link';
import { ChevronRight, Download } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionCTA from '@/components/SectionCTA';
import type { Metadata } from 'next';
import styles from './capabilities.module.css';

export const metadata: Metadata = {
  title: 'Capabilities — Full-Spectrum Industrial Engineering | Bhandari Enterprise',
  description: 'Steel fabrication, structural erection, manufacturing and civil construction capabilities. IS:800, AWS compliant. Konnagar, West Bengal, India.',
};

const SERVICES_DETAIL = [
  {
    id: 'steel-fabrication',
    number: '01',
    title: 'Steel Fabrication',
    category: 'Core Competency',
    description: [
      'Bhandari\'s fabrication division operates at the intersection of structural engineering and precision manufacturing. Every component — from a simple gusset plate to a complex truss assembly — is engineered to exact tolerances before a single cut is made.',
      'Our CNC-driven workflow eliminates human error in the cutting phase. Qualified welders using MIG, TIG, SAW, and SMAW processes deliver consistent weld quality backed by in-process NDT inspection at every critical joint.',
      'Final products undergo complete dimensional verification, hardness testing, coating thickness measurement, and holiday detection before dispatch — ensuring what leaves our yard meets the design intent to the last millimetre.',
    ],
    features: [
      'CNC plasma and flame cutting (up to 100mm thickness)',
      'MIG / TIG / SAW / SMAW / FCAW welding',
      'Structural I-beams, trusses, columns, base plates',
      'Complex assemblies and custom fabricated profiles',
      'Shot blasting (Sa 2.5) and multi-coat painting system',
      'Dimensional control with CMM inspection',
      'IS:800, AISC 360, AWS D1.1 compliant',
      'Third-party NDE and PMI testing available',
    ],
    standards: ['IS:800', 'AISC 360', 'AWS D1.1', 'IS:9595'],
    stats: [
      { number: '2,400T', label: 'Annual Capacity' },
      { number: '200T', label: 'Max Single Order' },
      { number: '100mm', label: 'Max Cut Thickness' },
    ],
  },
  {
    id: 'structural-erection',
    number: '02',
    title: 'Structural Erection',
    category: 'Site Execution',
    description: [
      'Our erection division handles projects where complexity, timeline, and safety are non-negotiable. We erect pre-engineered buildings, industrial sheds, multi-storey steel frames, pipe racks, and heavy process plant structures across India.',
      'Every erection project begins with a site-specific lift plan, sequence drawing, and safety method statement. Our crane operators and riggers are certified, and we maintain a zero-tolerance approach to unsafe lifting practices.',
      'With 8 active project sites running simultaneously and 250+ erection specialists on our rolls, we deliver large-scale steel structures within committed schedules without compromising on safety or quality.',
    ],
    features: [
      'Pre-engineered buildings (PEB) — supply and erect',
      'Industrial warehouses and cold storage structures',
      'Multi-storey industrial steel frames',
      'Crane-assisted heavy erection (up to 50 MT)',
      'Pipe rack and equipment platform erection',
      'Anchor bolt setting and base plate grouting',
      'Safety-certified erection crews (NEBOSH/IOSH)',
      'Night-shift and accelerated schedule capabilities',
    ],
    standards: ['IS:800 Erection', 'IS:7215', 'BOCW Act'],
    stats: [
      { number: '8', label: 'Active Sites Simultaneously' },
      { number: '50T', label: 'Max Crane Lift' },
      { number: '250+', label: 'Erection Specialists' },
    ],
  },
  {
    id: 'civil-construction',
    number: '03',
    title: 'Civil Construction',
    category: 'Ground-Up Execution',
    description: [
      'Our civil division provides the concrete foundation — literally — for every industrial structure we erect. From initial geotechnical review to final flooring and drainage, we manage the complete civil scope in-house.',
      'Industrial civil work demands a different level of precision than commercial construction. Our engineers design and execute foundations for crane loads, dynamic equipment, heavy storage, and seismic requirements — accounting for every operational load the structure will ever see.',
      'We execute civil and structural steel work as integrated scopes, eliminating the interface risks that plague multi-contractor industrial projects and ensuring a single point of accountability for the client.',
    ],
    features: [
      'Reinforced cement concrete (RCC) structures',
      'Piling: bored, driven, micro-pile systems',
      'Mat foundations and raft slabs for heavy equipment',
      'Industrial hard-stand and flooring (VDF, polished)',
      'Pre-stressed concrete beams and slabs',
      'Drainage, underground utilities, and sumps',
      'Grouting of base plates and equipment pedestals',
      'Turnkey civil package delivery (up to 50,000 sqm)',
    ],
    standards: ['IS:456', 'IS:2911', 'IS:1343', 'IS:13920'],
    stats: [
      { number: '50,000', label: 'sqm Max Single Project' },
      { number: 'IS:456', label: 'Design Standard' },
      { number: '100%', label: 'In-House Execution' },
    ],
  },
  {
    id: 'manufacturing',
    number: '04',
    title: 'Manufacturing',
    category: 'Precision Engineering',
    description: [
      'Bhandari\'s manufacturing division produces engineered equipment and process structures to ASME, IS, and client-specific standards. This is not commodity fabrication — it is precision-engineered, inspection-witnessed, code-compliant manufacturing.',
      'Our shop floor is equipped with the tooling, WPS/PQR documentation, and qualified welders required for ASME Section VIII pressure vessel work, piping components, and complex process plant structures.',
      'Each manufactured item is delivered with a complete documentation package: material test reports (MTR), weld maps, PWHT charts, NDE reports, dimensional inspection reports, and hydrostatic test certificates as applicable.',
    ],
    features: [
      'ASME Section VIII pressure vessels (Division 1)',
      'Process plant structures and pipe racks',
      'Equipment skids (complete package units)',
      'Storage tanks (API 650, IS:803)',
      'Chimneys, stacks, and ducting systems',
      'Pre-insulated piping spools',
      'Post-weld heat treatment (PWHT) in-house',
      'Complete documentation package with every delivery',
    ],
    standards: ['ASME Sec VIII', 'API 650', 'IS:2825', 'IS:803'],
    stats: [
      { number: '50T', label: 'Max Vessel Weight' },
      { number: 'ASME', label: 'Code Qualification' },
      { number: '100%', label: 'NDE Inspected' },
    ],
  },
  {
    id: 'project-management',
    number: '05',
    title: 'Project Management',
    category: 'EPC & PMC Services',
    description: [
      'For clients who need a single point of responsibility, Bhandari offers full Engineering, Procurement, and Construction (EPC) contracts — and Project Management Consultancy (PMC) services for clients who retain direct vendor contracts.',
      'Our project management team uses earned value management (EVM), CPM scheduling, and multi-discipline coordination to keep complex industrial projects on time and within budget. We have delivered EPC contracts valued up to ₹500 Cr.',
      'Every project is assigned a dedicated Project Manager supported by resident engineers for each discipline. Weekly progress reports, risk registers, and change management logs are maintained throughout the project lifecycle.',
    ],
    features: [
      'Full EPC contract delivery',
      'PMC and owner\'s engineer services',
      'Detailed engineering and draughting',
      'Procurement: vendor selection, order management',
      'CPM scheduling with critical path tracking',
      'Earned value management (EVM) reporting',
      'Multi-discipline site coordination',
      'Commissioning and handover support',
    ],
    standards: ['PMBOK', 'IS:15883', 'Client-specific QMS'],
    stats: [
      { number: '₹500Cr', label: 'Max EPC Value Delivered' },
      { number: '8', label: 'Simultaneous Projects' },
      { number: '100%', label: 'On-Time Delivery Rate*' },
    ],
  },
  {
    id: 'industrial-maintenance',
    number: '06',
    title: 'Industrial Maintenance',
    category: 'Asset Management',
    description: [
      'Industrial structures and equipment degrade. Our maintenance division provides planned inspection programmes, structural integrity assessments, and emergency repair services to keep client facilities operating safely.',
      'We offer annual maintenance contracts (AMC) for steel structures, process plants, and manufacturing facilities — including scheduled shutdowns, turnaround management, and run-and-maintain services.',
      'Emergency response teams are on standby 24/7 for critical structural failures, corrosion breakthroughs, and storm damage — with full site mobilisation within 4 hours across North India.',
    ],
    features: [
      'Annual Maintenance Contracts (AMC)',
      'Structural integrity assessment and RBI planning',
      'Corrosion protection and rehabilitation',
      'Plant turnaround and shutdown management',
      'NDT-based condition monitoring',
      'Emergency repair and stabilisation',
      'Welding repairs (coded procedures)',
      '24/7 emergency callout across North India',
    ],
    standards: ['IS:800', 'API 580', 'RBI Methodology'],
    stats: [
      { number: '24/7', label: 'Emergency Response' },
      { number: '4hrs', label: 'North India Mobilisation' },
      { number: 'AMC', label: 'Available Contract Type' },
    ],
  },
];

const EQUIPMENT = [
  { category: 'Cutting', items: ['CNC plasma cutter (up to 100mm)', 'CNC flame cutter (up to 150mm)', 'Band saw (structural sections)', 'Circular saw (plate, flat bar)'] },
  { category: 'Welding', items: ['SAW (submerged arc) machine ×4', 'MIG/MAG stations ×20+', 'TIG stations ×8', 'SMAW sets ×30+'] },
  { category: 'Lifting', items: ['EOT crane — 30T ×2', 'EOT crane — 15T ×4', 'Hydraulic mobile crane — 100T', 'Forklift — 5T ×3'] },
  { category: 'Inspection / NDE', items: ['UT flaw detector (Olympus)', 'Magnetic particle (MPI) kit', 'DPT inspection kits', 'PMI gun (alloy verification)'] },
  { category: 'Surface Prep', items: ['Shot blasting machine (Sa 2.5)', 'Airless spray painting ×6', 'Coating thickness gauge', 'Holiday detector (Elcometer)'] },
];

const CODES = [
  { code: 'IS:800', title: 'General Construction in Steel', body: 'Bureau of Indian Standards' },
  { code: 'IS:456', title: 'Plain & Reinforced Concrete', body: 'Bureau of Indian Standards' },
  { code: 'ASME Sec VIII', title: 'Pressure Vessel Fabrication', body: 'ASME International' },
  { code: 'AWS D1.1', title: 'Structural Welding Code — Steel', body: 'American Welding Society' },
  { code: 'AISC 360', title: 'Specification for Structural Steel', body: 'AISC' },
  { code: 'IS:2911', title: 'Design & Construction of Pile Foundations', body: 'Bureau of Indian Standards' },
  { code: 'API 650', title: 'Welded Steel Tanks for Oil Storage', body: 'American Petroleum Institute' },
  { code: 'IS:2825', title: 'Unfired Pressure Vessels', body: 'Bureau of Indian Standards' },
  { code: 'IS:9595', title: 'Metal Arc Welding of Carbon Steels', body: 'Bureau of Indian Standards' },
];

const SECTORS = [
  'Petrochemical', 'Oil & Gas', 'Power Generation', 'Pharmaceuticals',
  'Logistics & Warehousing', 'Cold Storage', 'Food Processing',
  'Manufacturing', 'Infrastructure', 'Government / Public Works',
  'Mining & Minerals', 'Defence',
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        overline="Engineering Capabilities"
        title="Full-Spectrum Industrial"
        titleAccent="Engineering."
        lead="From detailed engineering drawings to the final bolt — Bhandari delivers complete industrial structures with a single point of responsibility."
        breadcrumbs={[{ label: 'Capabilities' }]}
      />

      {/* Capability Navigator */}
      <nav className={styles.capNav} aria-label="Jump to capability section">
        <div className="container container--content">
          <div className={styles.capNavInner}>
            {SERVICES_DETAIL.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={styles.capNavItem}>
                <span className={styles.capNavNum}>{s.number}</span>
                <span className={styles.capNavLabel}>{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Service Detail Blocks */}
      {SERVICES_DETAIL.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`section ${styles.serviceBlock} ${i % 2 === 1 ? styles.serviceBlockAlt : ''}`}
          aria-labelledby={`${service.id}-heading`}
        >
          <div className="container container--content">
            <div className={styles.serviceGrid}>
              {/* Left */}
              <div className={styles.serviceLeft}>
                <div className={styles.serviceNum}>{service.number}</div>
                <span className="overline">{service.category}</span>
                <h2 id={`${service.id}-heading`} className={styles.serviceTitle}>
                  {service.title}
                </h2>
                {service.description.map((para, j) => (
                  <p key={j} className={styles.servicePara}>{para}</p>
                ))}
                <div className={styles.standardsPills} aria-label="Applicable standards">
                  {service.standards.map((std) => (
                    <span key={std} className={styles.stdPill}>{std}</span>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className={styles.serviceRight}>
                {/* Stats */}
                <div className={styles.serviceStats}>
                  {service.stats.map((s) => (
                    <div key={s.label} className={styles.serviceStat}>
                      <span className={styles.serviceStatNum}>{s.number}</span>
                      <span className={styles.serviceStatLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
                {/* Features */}
                <div className={styles.featuresCard}>
                  <h3 className={styles.featuresTitle}>Key Capabilities</h3>
                  <ul className={styles.featuresList}>
                    {service.features.map((f) => (
                      <li key={f} className={styles.featureItem}>
                        <span className={styles.featureDot} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/capabilities/${service.id}`}
                    className={`btn btn--primary btn--full ${styles.serviceEnquireBtn}`}
                    id={`enquire-${service.id}`}
                  >
                    Enquire for {service.title}
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Equipment Register */}
      <section className={`section ${styles.equipment}`} aria-labelledby="equipment-heading">
        <div className="container container--content">
          <span className="overline">Technical Infrastructure</span>
          <h2 id="equipment-heading" className={styles.equipHeading}>
            Equipment Register
          </h2>
          <div className={styles.equipGrid}>
            {EQUIPMENT.map((cat) => (
              <div key={cat.category} className={styles.equipCategory}>
                <h3 className={styles.equipCatTitle}>{cat.category}</h3>
                <ul className={styles.equipList}>
                  {cat.items.map((item) => (
                    <li key={item} className={styles.equipItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Codes & Standards */}
      <section className={`section ${styles.codes}`} aria-labelledby="codes-heading">
        <div className="container container--content">
          <span className="overline">Compliance Framework</span>
          <h2 id="codes-heading" className={styles.codesHeading}>
            Codes & Standards We Work To
          </h2>
          <div className={styles.codesGrid}>
            {CODES.map((c) => (
              <div key={c.code} className={styles.codeCard}>
                <span className={styles.codeNum}>{c.code}</span>
                <span className={styles.codeTitle}>{c.title}</span>
                <span className={styles.codeBody}>{c.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Statement Download */}
      <section className={styles.download} aria-labelledby="download-heading">
        <div className="container container--content">
          <div className={styles.downloadInner}>
            <div>
              <h2 id="download-heading" className={styles.downloadHeading}>
                Download Our Capability Statement
              </h2>
              <p className={styles.downloadSub}>
                8-page capability document for procurement teams and EPC contractors. Includes company profile, facility specs, certifications, and project references.
              </p>
            </div>
            <a
              href="/capability-statement.pdf"
              className="btn btn--primary btn--lg"
              id="download-cap-stmt"
              aria-label="Download capability statement PDF"
            >
              <Download size={18} aria-hidden="true" />
              Download PDF (2.4 MB)
            </a>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className={`section ${styles.sectors}`} aria-labelledby="sectors-heading">
        <div className="container container--content">
          <span className="overline">Industries We Serve</span>
          <h2 id="sectors-heading" className={styles.sectorsHeading}>Project Types by Sector</h2>
          <div className={styles.sectorsGrid} role="list" aria-label="Sectors served">
            {SECTORS.map((s) => (
              <span key={s} className={styles.sectorTag} role="listitem">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        heading="Need a Multi-Discipline Solution?"
        subtext="Our project team will assess your requirements and recommend the right combination of our capabilities for your project scope."
        primaryCta={{ label: 'Request a Technical Proposal', href: '/contact' }}
        secondaryCta={{ label: 'View Our Projects', href: '/projects' }}
      />
    </>
  );
}
