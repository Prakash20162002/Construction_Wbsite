import Link from 'next/link';
import { ChevronRight, Phone } from 'lucide-react';
import { COMPANY } from '@/data/content';
import styles from './SectionCTA.module.css';

interface SectionCTAProps {
  heading: string;
  subtext?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function SectionCTA({ heading, subtext, primaryCta, secondaryCta }: SectionCTAProps) {
  return (
    <section className={styles.cta} aria-label="Call to action">
      <div className="container container--content">
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2 className={styles.heading}>{heading}</h2>
            {subtext && <p className={styles.subtext}>{subtext}</p>}
          </div>
          <div className={styles.actions}>
            <Link href={primaryCta.href} className="btn btn--primary btn--lg" id="section-cta-primary">
              {primaryCta.label}
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn--secondary btn--lg" id="section-cta-secondary">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
