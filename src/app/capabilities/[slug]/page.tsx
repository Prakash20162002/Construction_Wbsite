import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, ArrowLeft, Phone } from 'lucide-react';
import { SERVICES, COMPANY } from '@/data/content';
import styles from './capability.module.css';

// Map slug → service data
function getService(slug: string) {
  return SERVICES.find((s) => s.id === slug) ?? null;
}

// Icon lookup
const CAPABILITY_DETAIL: Record<string, {
  overview: string;
  scope: string[];
  standards: string[];
  equipment: string[];
  relatedProjects: string[];
}> = {
  'steel-fabrication': {
    overview:
      'Our steel fabrication facility operates over 40,000 sq.ft of covered workshop space equipped with CNC cutting machines, welding bays, and precision assembly areas. We manufacture structural steel components to tolerances required by IS:800, AWS D1.1 and AISC standards.',
    scope: [
      'Primary & secondary structural steel members',
      'Built-up sections, plate girders & trusses',
      'Industrial platforms, staircases & handrails',
      'Custom profiles and clad sheets',
      'Pipe supports and equipment skids',
    ],
    standards: ['IS:800', 'AWS D1.1', 'AISC LRFD', 'IS:2062 Gr. B/C', 'NDE Certified Welds'],
    equipment: ['CNC Plasma Cutter', 'Sub-Arc Welding (SAW)', 'MIG/TIG Stations ×24', 'Shot Blasting Plant', '20T EOT Crane'],
    relatedProjects: ['Industrial Warehouse Complex', 'Logistics Hub Phase I & II'],
  },
  'structural-erection': {
    overview:
      'Our erection division has successfully erected over 50+ steel structures across industrial, commercial, and infrastructure sectors. With a fleet of mobile cranes, trained riggers, and certified erection supervisors, we deliver safe, on-schedule erection of complex assemblies.',
    scope: [
      'Pre-engineered building (PEB) erection',
      'Multi-storey industrial shed erection',
      'Equipment setting & alignment',
      'Pipe rack and trestle erection',
      'Offshore & heavy-lift erection',
    ],
    standards: ['IS:800', 'AISC CoP', 'OSHA 1926', 'IS:9595 Weld Procedure', 'BOCW Act Compliant'],
    equipment: ['50T All-Terrain Crane', '25T Pick-&-Carry Crane', 'Mobile Scaffolding', 'RT Crane ×3', 'Fall Arrest Systems'],
    relatedProjects: ['Pre-Engineered Factory Building', 'Power Plant Supporting Structure'],
  },
  'civil-construction': {
    overview:
      'Our civil construction wing undertakes complete RCC and industrial construction from foundation design to final handover. We work with leading structural consultants and deliver projects to IS:456, IS:13920 and NBC standards.',
    scope: [
      'Foundations — isolated, raft, pile',
      'RCC industrial buildings & warehouses',
      'Equipment foundations & plinths',
      'Roads, drains & site development',
      'Waterproofing & grouting works',
    ],
    standards: ['IS:456', 'IS:13920', 'NBC 2016', 'IS:383 Aggregates', 'IS:2911 Piling'],
    equipment: ['Batching Plant 30m³/hr', 'Transit Mixers ×6', 'Tower Crane', 'Hydraulic Piling Rig', 'Formwork Systems'],
    relatedProjects: ['Cold Storage & Logistics Facility', 'Logistics Hub Phase I & II'],
  },
  'manufacturing': {
    overview:
      'Our manufacturing division produces precision-engineered process plant structures, pressure vessels, and equipment packages. Backed by ASME & IBR certification, we supply to refineries, chemical plants, and power projects across India.',
    scope: [
      'Pressure vessels & heat exchangers',
      'Process plant pipe racks & modules',
      'Equipment skids & support structures',
      'Storage tanks & silos',
      'Custom industrial assemblies',
    ],
    standards: ['ASME Sec VIII Div.1', 'IBR 1950', 'IS:2825', 'API 650 Tanks', 'PED Compliant'],
    equipment: ['WPS/PQR Qualified Procedures', 'RT/UT/PT/MT NDT', 'Hydro Test Facility (60 Bar)', 'CNC Roll Bending', 'Stress Relief Furnace'],
    relatedProjects: ['Chemical Process Plant Structure', 'Power Plant Supporting Structure'],
  },
  'project-management': {
    overview:
      'Our EPC and PMC division provides complete project management services — from concept engineering and procurement to construction, commissioning and handover. We act as the single-point owner responsibility for industrial infrastructure projects.',
    scope: [
      'Concept to commissioning delivery',
      'Multi-discipline engineering coordination',
      'Procurement & vendor management',
      'Cost, schedule & risk control',
      'QHSE management & reporting',
    ],
    standards: ['PMBOK Framework', 'ISO 21500', 'FIDIC Contract Basis', 'Primavera P6', 'ISO 9001:2015 QMS'],
    equipment: ['Primavera P6 Planning', 'BIM Coordination', '4D Scheduling', 'Cost Control Software', 'Document Control System'],
    relatedProjects: ['Logistics Hub Phase I & II', 'Industrial Warehouse Complex'],
  },
  'industrial-maintenance': {
    overview:
      'Our maintenance division provides planned preventive maintenance (PPM) and emergency breakdown services for steel structures, plant facilities, and industrial equipment — available 24×7 with rapid response teams across North India.',
    scope: [
      'Annual maintenance contracts (AMC)',
      'Structural integrity assessment & repair',
      'Painting & anti-corrosion treatment',
      'Plant turnaround & shutdown services',
      'Emergency structural repair',
    ],
    standards: ['IS:9172 Corrosion', 'SSPC Surface Prep', 'IS:800 Structural Assessment', 'ISO 8501 Blast Cleaning', 'NAVSEA Paint Specs'],
    equipment: ['Airless Sprayers', 'Rope Access Equipment', 'NDT Instruments (UT/MT)', 'Sandblasting Units', 'Mobile Work Platforms'],
    relatedProjects: ['Power Plant Supporting Structure', 'Chemical Process Plant Structure'],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Not Found | Bhandari Enterprise' };

  const seoMap: Record<string, { title: string; desc: string; keywords: string[] }> = {
    'steel-fabrication': {
      title: 'Structural Steel Fabrication in Kolkata & Hooghly, West Bengal',
      desc: 'Bhandari Enterprise offers high-precision structural steel fabrication in Konnagar, Hooghly, Kolkata & West Bengal. Over 1,200 MT annual capacity.',
      keywords: ['steel fabrication Kolkata', 'structural steel fabrication Hooghly West Bengal', 'steel fabricators Howrah', 'Konnagar steel shop', 'industrial steel fabrication']
    },
    'structural-erection': {
      title: 'Structural Steel Erection & PEB Contractors in Jamshedpur & West Bengal',
      desc: 'Heavy lift structural erection, PEB warehouses, and industrial shed erection services across West Bengal, Jamshedpur, Jharkhand, Paradip, Odisha and Bihar.',
      keywords: ['steel structure erection West Bengal', 'PEB warehouse Jamshedpur', 'heavy lift erection Kolkata', 'industrial shed construction', 'erection contractors']
    },
    'civil-construction': {
      title: 'Industrial Civil Construction & RCC Foundation, West Bengal & Bihar',
      desc: 'Professional civil works, concrete piling, heavy machine foundation, vacuum dewatered flooring, and warehouse construction in Kolkata, Hooghly, Gaya and Patna.',
      keywords: ['industrial civil construction West Bengal', 'RCC foundation contractors Kolkata', 'warehouse floor piling Hooghly', 'Gaya civil works']
    },
    'manufacturing': {
      title: 'Process Pipe Rack & Equipment Skid Manufacturing in Paradip & West Bengal',
      desc: 'Modular fabrication of pressure vessels, equipment skids, piping manifolds, and chemical plant structures. Serving Jamshedpur, Paradip, and Haldia.',
      keywords: ['equipment skid fabrication', 'process pipe racks Paradip', 'chemical plant modular structures', 'pressure vessels Kolkata', 'Haldia fabrication']
    }
  };

  const seo = seoMap[slug] || {
    title: `${service.title} Services in West Bengal & Nearby Regions`,
    desc: `${service.shortDesc} Expert execution across Hooghly, Kolkata, Jharkhand, Odisha and Bihar.`,
    keywords: [service.title.toLowerCase(), 'industrial construction West Bengal', 'Bhandari Enterprise']
  };

  return {
    title: `${seo.title} | Bhandari Enterprise`,
    description: seo.desc,
    keywords: seo.keywords,
    openGraph: {
      title: `${seo.title} | Bhandari Enterprise`,
      description: seo.desc,
      locale: 'en_IN',
      type: 'website',
    }
  };
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const detail = CAPABILITY_DETAIL[slug];
  const otherServices = SERVICES.filter((s) => s.id !== slug).slice(0, 4);

  // Localized Headings targeting Hooghly, Kolkata, West Bengal, Jamshedpur, Paradip, Gaya etc.
  const localHeadings: Record<string, string> = {
    'steel-fabrication': 'Structural Steel Fabrication in Kolkata & Hooghly, West Bengal',
    'structural-erection': 'Structural Steel Erection & PEB in West Bengal & Jharkhand',
    'civil-construction': 'Industrial Civil Construction in West Bengal, Bihar & Odisha',
    'manufacturing': 'Process Skid & Pipe Rack Manufacturing in Paradip & West Bengal',
  };

  const displayTitle = localHeadings[slug] || service.title;

  return (
    <div className={styles.page}>
      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container container--content ${styles.heroInner}`}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadLink}>Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href="/capabilities" className={styles.breadLink}>Capabilities</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className={styles.breadCurrent}>{service.title}</span>
          </nav>

          <span className={styles.overline}>
            <span className={styles.overlineLine} />
            Industrial Capability
          </span>
          <h1 className={styles.heroTitle}>{displayTitle}</h1>
          <p className={styles.heroSub}>{service.shortDesc}</p>


          <div className={styles.heroActions}>
            <Link href="/contact" className="btn btn--primary btn--lg">
              Request a Quote <ChevronRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/capabilities" className={`btn btn--ghost ${styles.backBtn}`}>
              <ArrowLeft size={16} aria-hidden="true" />
              All Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className={styles.overview}>
        <div className={`container container--content ${styles.overviewInner}`}>
          <div className={styles.overviewGrid}>
            {/* Left — overview text */}
            <div className={styles.overviewLeft}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.overviewText}>{detail.overview}</p>

              <div className={styles.scopeList}>
                <h3 className={styles.scopeHeading}>Scope of Work</h3>
                <ul className={styles.scopeItems}>
                  {detail.scope.map((item) => (
                    <li key={item} className={styles.scopeItem}>
                      <CheckCircle2 size={16} className={styles.scopeCheck} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — key features from SERVICES + standards + equipment */}
            <div className={styles.overviewRight}>
              {/* Features */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>Key Features</div>
                <ul className={styles.infoList}>
                  {service.features.map((f) => (
                    <li key={f} className={styles.infoItem}>
                      <span className={styles.infoDot} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Standards */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>Standards & Codes</div>
                <div className={styles.chips}>
                  {detail.standards.map((std) => (
                    <span key={std} className={styles.chip}>{std}</span>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>Equipment & Capabilities</div>
                <ul className={styles.infoList}>
                  {detail.equipment.map((eq) => (
                    <li key={eq} className={styles.infoItem}>
                      <span className={styles.infoDot} aria-hidden="true" />
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OTHER CAPABILITIES ─── */}
      <section className={styles.others}>
        <div className={`container container--content ${styles.othersInner}`}>
          <h2 className={styles.othersTitle}>Other Capabilities</h2>
          <div className={styles.othersGrid}>
            {otherServices.map((svc) => (
              <Link key={svc.id} href={`/capabilities/${svc.id}`} className={styles.otherCard}>
                <span className={styles.otherTitle}>{svc.title}</span>
                <span className={styles.otherDesc}>{svc.shortDesc}</span>
                <span className={styles.otherLink}>
                  Learn More <ChevronRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section className={styles.ctaStrip}>
        <div className={`container container--content ${styles.ctaInner}`}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to discuss your <span className={styles.ctaAccent}>{service.title}</span> requirements?
            </h2>
            <p className={styles.ctaSub}>
              Our technical team is available to review your project scope and provide a detailed proposal.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className="btn btn--primary btn--lg">
              Get a Quote <ChevronRight size={18} aria-hidden="true" />
            </Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className={styles.phoneBtn}>
              <Phone size={16} aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
