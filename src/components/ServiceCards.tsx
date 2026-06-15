'use client';

import { useEffect, useRef } from 'react';
import {
  Layers, ArrowUpFromLine, Building2, Factory,
  ClipboardList, Wrench, ChevronRight,
} from 'lucide-react';
import { SERVICES } from '@/data/content';
import styles from './ServiceCards.module.css';

const iconMap: Record<string, React.ElementType> = {
  Layers,
  ArrowUpFromLine,
  Building2,
  Factory,
  ClipboardList,
  Wrench,
};

export default function ServiceCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 90);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.services}`} id="services" ref={sectionRef}>
      <div className="container container--content">
        {/* Header */}
        <div className={styles.header}>
          <div className="reveal">
            <span className="overline">What We Do</span>
            <h2 className={styles.heading}>Our Core Services</h2>
            <p className={styles.subheading}>
              Full-spectrum industrial engineering — from steel fabrication to
              complete civil construction and project management.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className={`${styles.grid} reveal-group`} role="list">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Wrench;
            return (
              <article
                key={service.id}
                className={`reveal ${styles.card}`}
                role="listitem"
                aria-label={service.title}
                id={`service-${service.id}`}
              >
                {/* Accent bar */}
                <div className={styles.cardAccentBar} aria-hidden="true" />

                {/* Icon */}
                <div className={styles.cardIcon}>
                  <Icon size={40} strokeWidth={1.5} aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.shortDesc}</p>

                {/* Feature list */}
                <ul className={styles.featureList} aria-label={`${service.title} features`}>
                  {service.features.map((feat) => (
                    <li key={feat} className={styles.featureItem}>
                      <span className={styles.featureDot} aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={styles.cardCta}
                  aria-label={`Enquire about ${service.title}`}
                >
                  Enquire Now
                  <ChevronRight size={14} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`reveal ${styles.bottomCta}`}>
          <p className={styles.bottomCtaText}>
            Need a custom solution or multi-discipline project?
          </p>
          <a href="#contact" className="btn btn--primary btn--lg" id="services-cta">
            Request a Proposal
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
