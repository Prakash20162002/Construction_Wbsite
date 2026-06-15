'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MapPin, ChevronRight, CheckCircle2, Clock, Send
} from 'lucide-react';
import { COMPANY } from '@/data/content';
import styles from './contact.module.css';

const SERVICES_LIST = [
  'Steel Fabrication',
  'Structural Erection',
  'Civil Construction',
  'Manufacturing'
];

const PROJECT_SIZES = [
  'Small (< ₹50 Lakhs)',
  'Medium (₹50L – ₹2 Cr)',
  'Large (₹2 Cr – ₹10 Cr)',
  'Major (> ₹10 Cr)',
  'Not sure yet',
];

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  projectSize: string;
  location: string;
  message: string;
}

const INITIAL: FormData = {
  name: '', company: '', email: '', phone: '',
  service: '', projectSize: '', location: '', message: '',
};

export default function ContactClient() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className={styles.page}>
      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container container--content ${styles.heroInner}`}>
          <span className={styles.overline}>
            <span className={styles.overlineLine} />
            Get in Touch
          </span>
          <h1 className={styles.heroTitle}>
            Request a <span className={styles.heroAccent}>Project Quote</span>
          </h1>
          <p className={styles.heroSub}>
            Fill in the form and our technical team will review your requirements and
            respond within <strong>24 business hours</strong>.
          </p>
        </div>
      </section>

      {/* ─── MAIN ─── */}
      <section className={styles.main}>
        <div className={`container container--content ${styles.mainGrid}`}>

          {/* ─── FORM PANEL ─── */}
          <div className={styles.formPanel}>
            {submitted ? (
              <div className={styles.successBox} role="alert">
                <CheckCircle2 size={48} className={styles.successIcon} aria-hidden="true" />
                <h2 className={styles.successTitle}>Enquiry Received</h2>
                <p className={styles.successText}>
                  Thank you, <strong>{form.name}</strong>. Our team will review your
                  project requirements and reach out to you within 24 hours at{' '}
                  <strong>{form.email}</strong>.
                </p>
                <Link href="/" className="btn btn--primary">
                  Back to Home <ChevronRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                aria-label="Project enquiry form"
              >
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Project Enquiry Form</h2>
                  <p className={styles.formSub}>All fields marked * are required.</p>
                </div>

                {/* Row 1: Name + Company */}
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-company" className={styles.label}>
                      Company / Organisation *
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      value={form.company}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Company name"
                    />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Business Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-phone" className={styles.label}>
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                {/* Row 3: Service + Project Size */}
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label htmlFor="contact-service" className={styles.label}>
                      Service Required *
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select a service</option>
                      {SERVICES_LIST.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-size" className={styles.label}>
                      Estimated Project Value
                    </label>
                    <select
                      id="contact-size"
                      name="projectSize"
                      value={form.projectSize}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select range</option>
                      {PROJECT_SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Location */}
                <div className={styles.field}>
                  <label htmlFor="contact-location" className={styles.label}>
                    Project Location
                  </label>
                  <input
                    id="contact-location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="City, State"
                  />
                </div>

                {/* Message */}
                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Project Description *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Describe your project scope, timelines, and any specific requirements…"
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn--primary btn--lg ${styles.submitBtn}`}
                  disabled={loading}
                  id="contact-submit"
                >
                  {loading ? (
                    <>Submitting…</>
                  ) : (
                    <>
                      Submit Enquiry
                      <Send size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className={styles.sidebar} aria-label="Contact information">

            {/* Direct Contact */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardHead}>Direct Contact</div>
              <div className={styles.contactItems}>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className={styles.contactItem}
                  aria-label={`Call ${COMPANY.phone}`}
                >
                  <div className={styles.contactIcon}>
                    <Phone size={18} aria-hidden="true" />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Call Us</span>
                    <span className={styles.contactValue}>{COMPANY.phone}</span>
                  </div>
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className={styles.contactItem}
                  aria-label={`Email ${COMPANY.email}`}
                >
                  <div className={styles.contactIcon}>
                    <Mail size={18} aria-hidden="true" />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Email Us</span>
                    <span className={styles.contactValue}>{COMPANY.email}</span>
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <MapPin size={18} aria-hidden="true" />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Head Office</span>
                    <span className={styles.contactValue}>
                      {COMPANY.address.replace(/\n/g, ', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardHead}>Working Hours</div>
              <div className={styles.hoursItems}>
                {[
                  { day: 'Mon – Fri', time: '9:00 AM – 6:00 PM' },
                  { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
                  { day: 'Emergency', time: '24 × 7 Support' },
                ].map(({ day, time }) => (
                  <div key={day} className={styles.hoursRow}>
                    <div className={styles.hoursDay}>
                      <Clock size={13} aria-hidden="true" />
                      {day}
                    </div>
                    <div className={styles.hoursTime}>{time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why us chips */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardHead}>Why Bhandari Enterprise</div>
              <div className={styles.whyItems}>
                {[
                  '26+ Years of Execution',
                  'Konnagar, West Bengal',
                  '50+ Projects Delivered',
                  'Pan-India Operations',
                  'End-to-End EPC Capability',
                  'Zero Compromise on Safety',
                ].map((item) => (
                  <div key={item} className={styles.whyItem}>
                    <CheckCircle2 size={14} className={styles.whyCheck} aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
