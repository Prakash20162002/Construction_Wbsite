'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { STATS } from '@/data/content';
import styles from './Hero.module.css';

export default function Hero() {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            animateCounter(el, el.dataset.target || '');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    counterRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Hero section">

      {/* ── BACKGROUND ─────────────────────────────────────────── */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/hero-bg-v2.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className={styles.bgImage}
        />
        {/* Layered cinematic overlays */}
        <div className={styles.overlayGradient} />
        <div className={styles.overlayLeft} />
        <div className={styles.overlayVignette} />
        {/* Structural grid lines */}
        <div className={styles.gridLines} />
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>

          {/* Label */}
          <div className={styles.label} role="doc-subtitle">
            <span className={styles.labelLine} aria-hidden="true" />
            <span className={styles.labelText}>Industrial Engineering Solutions</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headLine1}>Built With Steel.</span>
            <span className={styles.headLine2}>
              Engineered<br className={styles.headBr} /> To Last.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className={styles.sub}>
            Delivering Manufacturing, Fabrication, Erection and Civil Construction
            Solutions for Industrial Infrastructure Projects.
          </p>

          {/* Proof pills */}
          <div className={styles.proofPills} aria-label="Trust credentials">
            {[
              'Quality Certified',
              '26+ Years Established',
              '50+ Projects Delivered',
            ].map((pill) => (
              <span key={pill} className={styles.pill}>{pill}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link
              href="/contact"
              className={`${styles.ctaPrimary}`}
              id="hero-cta-quote"
            >
              Get a Quote
              <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <Link
              href="/projects"
              className={`${styles.ctaSecondary}`}
              id="hero-cta-projects"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ──────────────────────────────────────────── */}
      <div className={styles.statsBar} role="complementary" aria-label="Company statistics">
        <div className="container">
          <div className={styles.statsInner}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className={styles.statItem}>
                <span
                  className={styles.statNum}
                  ref={(el) => { counterRefs.current[i] = el; }}
                  data-target={stat.number}
                  aria-label={`${stat.number} ${stat.label}`}
                >
                  {stat.number}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
                {i < STATS.length - 1 && (
                  <span className={styles.statDivider} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLL CUE ─────────────────────────────────────────── */}
      <a href="#about" className={styles.scrollCue} aria-label="Scroll down">
        <span className={styles.scrollLine} aria-hidden="true" />
        <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
      </a>
    </section>
  );
}

/* ── Counter animation ─────────────────────────────────────────── */
function animateCounter(el: HTMLElement, target: string) {
  const suffix = target.replace(/[0-9,]/g, '').trim();
  const value = parseInt(target.replace(/[^0-9]/g, ''), 10);
  if (isNaN(value)) return;

  const duration = 1600;
  const start = performance.now();

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(easeOut(progress) * value);
    el.textContent = current.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
