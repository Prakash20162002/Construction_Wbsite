'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ChevronRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionCTA from '@/components/SectionCTA';
import styles from './careers.module.css';

const EVP = [
  { icon: '⚙', heading: 'Scale of Work', desc: 'Work on India\'s most ambitious industrial projects — from 28,000 sqm warehouses to power plant structures and chemical process plants.' },
  { icon: '📈', heading: 'Career Growth', desc: 'Structured progression from site engineer to senior roles. We promote from within and invest in your technical development.' },
  { icon: '🛡', heading: 'Safety Culture', desc: 'Industry-leading zero-LTI safety record. NEBOSH/IOSH training provided. Your safety is not negotiable — ever.' },
  { icon: '🏗', heading: 'Stability', desc: '26 years of uninterrupted operations. A growing order book. A company that will be here when you retire.' },
];

const OPEN_JOBS = [
  { id: 'senior-structural-engineer', title: 'Senior Structural Engineer', dept: 'Engineering', location: 'Chandigarh', experience: '8–12 Years', type: 'Full-time', posted: '3 days ago' },
  { id: 'project-manager-steel', title: 'Project Manager — Steel Erection', dept: 'Projects', location: 'Chandigarh / Site', experience: '10–15 Years', type: 'Full-time', posted: '5 days ago' },
  { id: 'qc-engineer', title: 'QC Engineer (Welding & Structural)', dept: 'Quality & Safety', location: 'Chandigarh', experience: '5–8 Years', type: 'Full-time', posted: '1 week ago' },
  { id: 'site-supervisor-erection', title: 'Site Supervisor — Erection', dept: 'Site', location: 'Pan-India (Rotating)', experience: '6–10 Years', type: 'Full-time', posted: '1 week ago' },
  { id: 'civil-engineer', title: 'Civil Engineer', dept: 'Civil', location: 'Chandigarh / Site', experience: '4–7 Years', type: 'Full-time', posted: '2 weeks ago' },
  { id: 'hse-officer', title: 'HSE Officer (NEBOSH Certified)', dept: 'Quality & Safety', location: 'Site-based', experience: '3–6 Years', type: 'Full-time', posted: '2 weeks ago' },
];

const DEPTS = ['All Departments', 'Engineering', 'Projects', 'Quality & Safety', 'Site', 'Civil'];

const BENEFITS = [
  'Provident Fund (PF) & Employee State Insurance (ESI)',
  'Group medical insurance (self + family)',
  'Site accommodation for outstation projects',
  'Performance-linked annual bonus',
  'NEBOSH / IOSH / PMI training sponsorship',
  'Transport allowance for local staff',
  'Annual increment linked to appraisal',
  'Long-service recognition awards',
];

export default function CareersPage() {
  const [dept, setDept] = useState('All Departments');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', discipline: '', experience: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = OPEN_JOBS.filter(
    (j) => dept === 'All Departments' || j.dept === dept
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        overline="Join Our Team"
        title="Build Your Career."
        titleAccent="Build India."
        lead="Join 400+ engineers and specialists working on India's most demanding industrial construction projects. We grow together."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {/* EVP */}
      <section className={`section ${styles.evp}`} aria-labelledby="evp-heading">
        <div className="container container--content">
          <span className="overline">Why Bhandari</span>
          <h2 id="evp-heading" className={styles.sectionHeading}>Why Engineers Choose Us</h2>
          <div className={`${styles.evpGrid} reveal-group`}>
            {EVP.map((item) => (
              <div key={item.heading} className={`reveal ${styles.evpCard}`}>
                <div className={styles.evpIcon} aria-hidden="true">{item.icon}</div>
                <h3 className={styles.evpHeading}>{item.heading}</h3>
                <p className={styles.evpDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className={`section ${styles.jobs}`} id="open-positions" aria-labelledby="jobs-heading">
        <div className="container container--content">
          <span className="overline">Current Openings</span>
          <h2 id="jobs-heading" className={styles.sectionHeading}>Open Positions</h2>

          {/* Filter */}
          <div className={styles.jobFilter} role="group" aria-label="Filter by department">
            {DEPTS.map((d) => (
              <button
                key={d}
                className={`${styles.filterBtn} ${dept === d ? styles.filterBtnActive : ''}`}
                onClick={() => setDept(d)}
                aria-pressed={dept === d}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Jobs list */}
          <div className={styles.jobList} role="list">
            {filtered.length === 0 ? (
              <p className={styles.noJobs}>No current openings in this department. Register your interest below.</p>
            ) : (
              filtered.map((job) => (
                <article key={job.id} className={styles.jobCard} role="listitem">
                  <div className={styles.jobInfo}>
                    <div className={styles.jobDeptBadge}>{job.dept}</div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobMeta}>
                      <span className={styles.jobMetaItem}>
                        <MapPin size={12} aria-hidden="true" />{job.location}
                      </span>
                      <span className={styles.jobMetaItem}>
                        <Briefcase size={12} aria-hidden="true" />{job.experience}
                      </span>
                      <span className={styles.jobMetaItem}>
                        <Clock size={12} aria-hidden="true" />{job.posted}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/careers/${job.id}`}
                    className="btn btn--primary"
                    id={`apply-${job.id}`}
                    aria-label={`Apply for ${job.title}`}
                  >
                    Apply Now
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Life at Bhandari */}
      <section className={`section ${styles.life}`} aria-labelledby="life-heading">
        <div className="container container--content">
          <div className={styles.lifeGrid}>
            <div className={styles.lifeContent}>
              <span className="overline">Life at Bhandari</span>
              <h2 id="life-heading" className={styles.sectionHeading}>What Our Team Says</h2>
              <div className={styles.testimonials}>
                {[
                  {
                    quote: "I've worked on projects across 5 states in the last 3 years — a 660 MW power plant in Rajasthan, a mega-warehouse in Punjab, and a chemical plant in Gujarat. No other company gives you this range at this scale.",
                    name: 'Ramesh Kumar', role: 'Senior Site Engineer', years: '7 years at Bhandari'
                  },
                  {
                    quote: "The safety culture here is genuine. When you see the MD personally walking the site and asking about safety conditions, you know this isn't just policy — it's how we operate.",
                    name: 'Sunita Verma', role: 'QC Engineer', years: '4 years at Bhandari'
                  },
                ].map((t) => (
                  <blockquote key={t.name} className={styles.testimonial}>
                    <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                    <footer>
                      <strong className={styles.testimonialName}>{t.name}</strong>
                      <span className={styles.testimonialRole}>{t.role}</span>
                      <span className={styles.testimonialYears}>{t.years}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
            {/* Photo grid placeholder */}
            <div className={styles.lifePhotoGrid} aria-label="Workplace photography" aria-hidden="true">
              {['FABRICATION', 'SITE ERECTION', 'SAFETY TRAINING', 'TEAM', 'COMMISSIONING', 'WELDING'].map((label) => (
                <div key={label} className={styles.lifePhoto}>
                  <div className={styles.lifePhotoPattern} />
                  <span className={styles.lifePhotoLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training & Benefits */}
      <section className={`section ${styles.training}`} aria-labelledby="training-heading">
        <div className="container container--content">
          <div className={styles.trainingGrid}>
            <div>
              <span className="overline">Training & Development</span>
              <h2 id="training-heading" className={styles.sectionHeading}>We Invest in Your Growth</h2>
              <div className={styles.trainingCards}>
                {[
                  { title: 'In-House Welding Certification', desc: 'Coding to ASME Section IX and IS:9595. Weld test conducted by in-house CWI.' },
                  { title: 'Safety Training (NEBOSH / IOSH)', desc: 'Company-sponsored NEBOSH IGC and IOSH Managing Safely for all site-based staff.' },
                  { title: 'Project Management Development', desc: 'PMI-aligned training for engineers targeting PM roles. In-house mentorship programme.' },
                ].map((item) => (
                  <div key={item.title} className={styles.trainingCard}>
                    <h3 className={styles.trainingCardTitle}>{item.title}</h3>
                    <p className={styles.trainingCardDesc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className={`${styles.sectionHeading} ${styles.benefitsHeading}`}>Employee Benefits</h2>
              <ul className={styles.benefitsList}>
                {BENEFITS.map((b) => (
                  <li key={b} className={styles.benefitItem}>
                    <span className={styles.benefitDot} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Register Interest */}
      <section className={`section ${styles.register}`} id="register-interest" aria-labelledby="register-heading">
        <div className="container container--content">
          <div className={styles.registerInner}>
            <div className={styles.registerInfo}>
              <span className="overline">Don&apos;t See a Suitable Role?</span>
              <h2 id="register-heading" className={styles.sectionHeading}>Register Your Interest</h2>
              <p className={styles.registerDesc}>
                We regularly have openings that aren&apos;t listed here. Register your profile and we&apos;ll
                reach out when a suitable role opens up.
              </p>
            </div>
            <div className={styles.registerForm}>
              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon} aria-hidden="true">✓</div>
                  <h3 className={styles.successTitle}>Profile Registered</h3>
                  <p className={styles.successText}>We&apos;ll contact you when a suitable position becomes available.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} aria-label="Register interest form" className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="reg-name" className={styles.label}>Full Name *</label>
                      <input id="reg-name" name="name" type="text" required className={styles.input} placeholder="Your name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="reg-email" className={styles.label}>Email *</label>
                      <input id="reg-email" name="email" type="email" required className={styles.input} placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="reg-phone" className={styles.label}>Phone</label>
                      <input id="reg-phone" name="phone" type="tel" className={styles.input} placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="reg-discipline" className={styles.label}>Discipline *</label>
                      <select id="reg-discipline" name="discipline" required className={styles.input} value={formData.discipline} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option>Structural Engineering</option>
                        <option>Civil Engineering</option>
                        <option>Project Management</option>
                        <option>Quality Control</option>
                        <option>HSE / Safety</option>
                        <option>Welding / Fabrication</option>
                        <option>Site Supervision</option>
                        <option>Commercial / Estimation</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="reg-experience" className={styles.label}>Years of Experience</label>
                    <select id="reg-experience" name="experience" className={styles.input} value={formData.experience} onChange={handleChange}>
                      <option value="">Select...</option>
                      <option>0–2 years (fresher)</option>
                      <option>3–5 years</option>
                      <option>6–10 years</option>
                      <option>11–15 years</option>
                      <option>15+ years</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn--primary btn--full" id="register-interest-submit">
                    Submit Profile
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
