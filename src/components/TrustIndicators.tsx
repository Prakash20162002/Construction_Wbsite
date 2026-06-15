'use client';

import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { CLIENTS, TESTIMONIALS } from '@/data/content';
import styles from './TrustIndicators.module.css';

export default function TrustIndicators() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setActiveTestimonial(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prev = () => goTo((activeTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((activeTestimonial + 1) % TESTIMONIALS.length);

  return (
    <section className={`section ${styles.trust}`} ref={sectionRef} aria-label="Clients and testimonials">
      {/* Clients Bar */}
      <div className={styles.clientsBar}>
        <div className="container container--content">
          <div className="reveal">
            <p className={styles.clientsLabel}>
              Trusted by India&apos;s leading industrial groups
            </p>
          </div>
          <div className={`${styles.clientsGrid} reveal-group`} role="list" aria-label="Our clients">
            {CLIENTS.map((client) => (
              <div key={client.name} className={`reveal ${styles.clientItem}`} role="listitem">
                <span className={styles.clientName}>{client.name}</span>
                <span className={styles.clientSector}>{client.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className={`section--light ${styles.testimonials}`}>
        <div className="container container--narrow">
          <div className={styles.testimonialsHeader}>
            <div className="reveal">
              <span className="overline" style={{ color: 'var(--color-accent)' }}>
                Client Testimonials
              </span>
              <h2 className={styles.testimonialsHeading}>
                What Our Clients Say
              </h2>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div
            className={styles.carousel}
            role="region"
            aria-label="Testimonials carousel"
            aria-live="polite"
          >
            <div className={styles.carouselTrack}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className={`${styles.testimonialCard} ${i === activeTestimonial ? styles.active : ''}`}
                  aria-hidden={i !== activeTestimonial}
                  id={`testimonial-${i}`}
                >
                  <Quote size={48} className={styles.quoteIcon} aria-hidden="true" />
                  <blockquote>
                    <p className={styles.quoteText}>{t.quote}</p>
                    <footer className={styles.quoteMeta}>
                      <cite className={styles.quoteName}>{t.name}</cite>
                      <span className={styles.quoteTitle}>{t.title}</span>
                      <span className={styles.quoteProject}>{t.project}</span>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className={styles.controls}>
              <div className={styles.dots}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === activeTestimonial ? styles.dotActive : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`View testimonial ${i + 1}`}
                    aria-current={i === activeTestimonial ? 'true' : undefined}
                    id={`testimonial-dot-${i}`}
                  />
                ))}
              </div>
              <div className={styles.arrows}>
                <button
                  className={styles.arrow}
                  onClick={prev}
                  aria-label="Previous testimonial"
                  id="testimonial-prev"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  className={styles.arrow}
                  onClick={next}
                  aria-label="Next testimonial"
                  id="testimonial-next"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
