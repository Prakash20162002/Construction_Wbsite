'use client';

import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, ChevronRight } from 'lucide-react';
import { COMPANY } from '@/data/content';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', service: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send enquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.contact}`} id="contact" ref={sectionRef}>
      <div className="container container--content">
        {/* Header */}
        <div className={styles.header}>
          <div className="reveal">
            <span className="overline">Get In Touch</span>
            <h2 className={styles.heading}>Start Your Project</h2>
          </div>
          <div className="reveal">
            <p className={styles.subheading}>
              Discuss your industrial construction requirements with our senior
              project engineers. We respond within 24 hours.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={`reveal ${styles.info}`}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <div className={styles.infoLabel}>Call Us</div>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className={styles.infoValue}>
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <div className={styles.infoLabel}>Email Us</div>
                <a href={`mailto:${COMPANY.email}`} className={styles.infoValue}>
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <div className={styles.infoLabel}>Visit Us</div>
                <address className={styles.infoValue} style={{ fontStyle: 'normal' }}>
                  {COMPANY.address.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </address>
              </div>
            </div>

            {/* CIN/GST */}
            <div className={styles.regInfo}>
              <div className={styles.regRow}>
                <span className={styles.regLabel}>CIN</span>
                <span className={styles.regValue}>{COMPANY.cin}</span>
              </div>
              <div className={styles.regRow}>
                <span className={styles.regLabel}>GSTIN</span>
                <span className={styles.regValue}>{COMPANY.gst}</span>
              </div>
            </div>

            {/* Quick info boxes */}
            <div className={styles.quickBoxes}>
              <div className={styles.quickBox}>
                <span className={styles.quickNum}>24h</span>
                <span className={styles.quickLabel}>Response Time</span>
              </div>
              <div className={styles.quickBox}>
                <span className={styles.quickNum}>Free</span>
                <span className={styles.quickLabel}>Site Assessment</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`reveal ${styles.formWrap}`}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon} aria-hidden="true">✓</div>
                <h3 className={styles.successTitle}>Enquiry Received</h3>
                <p className={styles.successText}>
                  Thank you for contacting Bhandari Enterprise. Our project team
                  will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact enquiry form"
              >
                {error && (
                  <div style={{
                    padding: '12px 16px',
                    background: 'rgba(224, 36, 36, 0.1)',
                    border: '1px solid rgba(224, 36, 36, 0.2)',
                    borderRadius: '6px',
                    color: '#f8b4b4',
                    fontSize: '14px',
                    gridColumn: '1 / -1',
                  }}>
                    {error}
                  </div>
                )}
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={styles.input}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="company" className={styles.label}>Company / Organization</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={styles.input}
                      placeholder="Company name"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={styles.input}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={styles.input}
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="service" className={styles.label}>Service Required</label>
                  <select
                    id="service"
                    name="service"
                    className={styles.input}
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    <option value="steel-fabrication">Steel Fabrication</option>
                    <option value="structural-erection">Structural Erection</option>
                    <option value="civil-construction">Civil Construction</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="project-management">Project Management</option>
                    <option value="industrial-maintenance">Industrial Maintenance</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Describe your project requirements, location, scale, and timeline..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn--primary btn--lg btn--full ${styles.submitBtn}`}
                  disabled={loading}
                  id="contact-submit"
                >
                  {loading ? (
                    <>Sending Enquiry…</>
                  ) : (
                    <>
                      Send Enquiry
                      <Send size={18} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className={styles.formNote}>
                  By submitting, you agree to our privacy policy. We never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
