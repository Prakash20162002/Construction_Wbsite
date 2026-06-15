'use client';

import Link from 'next/link';
import { ChevronRight, Phone } from 'lucide-react';
import { COMPANY } from '@/data/content';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section
      className={styles.section}
      id="cta"
      aria-labelledby="cta-heading"
    >
      {/* Background grid */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgLines} aria-hidden="true" />

      {/* Orange left accent bar */}
      <div className={styles.accentBar} aria-hidden="true" />

      <div className={`container container--content ${styles.inner}`}>
        <div className={styles.content}>
          {/* Overline */}
          <span className={styles.overline} aria-hidden="true">
            <span className={styles.overlineLine} />
            Start Your Project
          </span>

          {/* Headline */}
          <h2 id="cta-heading" className={styles.headline}>
            Let's Build Your Next
            <br />
            <span className={styles.headlineAccent}>Industrial Project</span>
          </h2>

          {/* Subheadline */}
          <p className={styles.sub}>
            Partner with <strong>Bhandari Enterprise</strong> for reliable manufacturing,
            fabrication, erection and civil construction solutions delivered with
            precision and zero compromise.
          </p>

          {/* Actions */}
          <div className={styles.actions}>
            <Link
              href="/contact"
              className={`btn btn--primary btn--lg ${styles.primaryBtn}`}
              id="cta-primary"
            >
              Request a Quote
              <ChevronRight size={20} aria-hidden="true" />
            </Link>

            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className={styles.phoneBtn}
              id="cta-phone"
              aria-label={`Call us at ${COMPANY.phone}`}
            >
              <Phone size={18} strokeWidth={2} aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>

          {/* Trust chips */}
          <div className={styles.chips} aria-label="Trust indicators">
            {[
              'Quality Assured',
              '26+ Years Experience',
              '850+ Projects Delivered',
              'Pan-India Operations',
            ].map((chip) => (
              <span key={chip} className={styles.chip}>{chip}</span>
            ))}
          </div>
        </div>

        {/* Right visual panel */}
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualInner}>
            <div className={styles.bigNum}>850<span className={styles.bigNumPlus}>+</span></div>
            <div className={styles.bigLabel}>Projects Delivered</div>
            <div className={styles.visualDivider} />
            <div className={styles.visualStats}>
              <div className={styles.vStat}>
                <span className={styles.vNum}>26+</span>
                <span className={styles.vLabel}>Years</span>
              </div>
              <div className={styles.vDivider} />
              <div className={styles.vStat}>
                <span className={styles.vNum}>400+</span>
                <span className={styles.vLabel}>Team</span>
              </div>
              <div className={styles.vDivider} />
              <div className={styles.vStat}>
                <span className={styles.vNum}>100%</span>
                <span className={styles.vLabel}>Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
