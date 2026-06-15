import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY, SERVICES, NAV_LINKS } from '@/data/content';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <div className={styles.ctaBanner}>
        <div className="container container--content">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaHeading}>
                Ready to Build Something
                <span className={styles.ctaAccent}> Extraordinary?</span>
              </h2>
              <p className={styles.ctaText}>
                Partner with North India&apos;s leading industrial engineering company.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn--primary btn--xl" id="footer-cta">
                Get a Free Quote
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                className="btn btn--secondary btn--xl"
                id="footer-phone"
              >
                <Phone size={18} aria-hidden="true" />
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ──────────────────────────────────────── */}
      <div className={styles.main}>
        <div className="container container--content">
          <div className={styles.grid}>

            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.logoMark} aria-hidden="true">
                <Image
                  src="/logo.png"
                  alt="Bhandari Enterprise Logo"
                  width={140}
                  height={44}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <div className={styles.brandName}>Bhandari Enterprise</div>
                <div className={styles.brandTagline}>Engineering the Future. Building with Precision.</div>
              </div>
              <p className={styles.brandDesc}>
                Steel fabrication, erection, manufacturing and civil construction
                company based in Konnagar, Hooghly, West Bengal — serving clients across India since {COMPANY.founded}.
              </p>
              <div className={styles.brandContact}>
                <a href={`mailto:${COMPANY.email}`} className={styles.contactLink}>
                  <Mail size={14} aria-hidden="true" />
                  {COMPANY.email}
                </a>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                  <Phone size={14} aria-hidden="true" />
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            {/* Services */}
            <div className={styles.col}>
              <h3 className={styles.colHeading}>Our Services</h3>
              <ul className={styles.linkList} role="list">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link href={`/capabilities/${s.id}`} className={styles.footerLink}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className={styles.col}>
              <h3 className={styles.colHeading}>Quick Links</h3>
              <ul className={styles.linkList} role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className={styles.colHeading} style={{ marginTop: 'var(--space-8)' }}>Sectors</h3>
              <ul className={styles.linkList} role="list">
                {['Petrochemical', 'Power Generation', 'Logistics & Warehousing', 'Manufacturing', 'Infrastructure'].map((s) => (
                  <li key={s}>
                    <span className={styles.sectorTag}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div className={styles.col}>
              <h3 className={styles.colHeading}>Registered Office</h3>
              <address className={styles.address}>
                <MapPin size={14} aria-hidden="true" />
                <span>
                  {COMPANY.address.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </span>
              </address>
              <div className={styles.regBlock}>
                <div className={styles.regRow}>
                  <span className={styles.regKey}>CIN</span>
                  <span className={styles.regVal}>{COMPANY.cin}</span>
                </div>
                <div className={styles.regRow}>
                  <span className={styles.regKey}>GST</span>
                  <span className={styles.regVal}>{COMPANY.gst}</span>
                </div>
              </div>
              {/* Cert badges */}
              <div className={styles.certBadges}>
                {['IS:800 Compliant', 'Quality Assured'].map((cert) => (
                  <span key={cert} className={styles.certBadge}>{cert}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────── */}
      <div className={styles.bottomBar}>
        <div className="container container--content">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {year} Bhandari Enterprise. All rights reserved.
            </p>
            <div className={styles.legal}>
              <Link href="#" className={styles.legalLink}>Privacy Policy</Link>
              <span className={styles.legalSep} aria-hidden="true">·</span>
              <Link href="#" className={styles.legalLink}>Terms of Use</Link>
              <span className={styles.legalSep} aria-hidden="true">·</span>
              <Link href="#" className={styles.legalLink}>Sitemap</Link>
            </div>
            <p className={styles.iso}>
              ISO 9001:2015 · ISO 45001:2018 Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
