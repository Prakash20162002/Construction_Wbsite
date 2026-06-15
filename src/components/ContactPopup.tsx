'use client';

import { useState, useEffect } from 'react';
import { X, Send, Phone, Mail } from 'lucide-react';
import { COMPANY } from '@/data/content';
import styles from './ContactPopup.module.css';

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if dismissed or submitted in this session
    const dismissed = sessionStorage.getItem('popup_dismissed');
    if (dismissed) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = (scrollPos / docHeight) * 100;
      if (percent >= 50) {
        setIsOpen(true);
        // Remove scroll listener once triggered
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('popup_dismissed', '1');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || 'no-email@bhandarienterprise.com', // Fallback email
          message: form.message || 'Callback Request from Popup',
          service: 'Callback Request',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit. Please try again.');
      }

      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem('popup_dismissed', '1');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close form popup">
          <X size={20} />
        </button>

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>Thank You!</h3>
            <p className={styles.successText}>We have received your details and will call you back shortly.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <span className={styles.overline}>INTERESTED IN BHANDARI ENTERPRISE?</span>
              <h3 id="popup-title" className={styles.title}>Let's Build Together</h3>
              <p className={styles.subtitle}>Leave your details and our project engineer will get in touch with you.</p>
            </div>

            {error && (
              <div style={{
                padding: '10px 12px',
                background: 'rgba(224, 36, 36, 0.1)',
                border: '1px solid rgba(224, 36, 36, 0.2)',
                borderRadius: '6px',
                color: '#f8b4b4',
                fontSize: '12px',
                textAlign: 'center',
              }}>
                {error}
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="popup-name" className={styles.label}>Full Name *</label>
              <input
                id="popup-name"
                name="name"
                type="text"
                required
                className={styles.input}
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="popup-phone" className={styles.label}>Phone Number *</label>
              <input
                id="popup-phone"
                name="phone"
                type="tel"
                required
                className={styles.input}
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="popup-email" className={styles.label}>Email Address</label>
              <input
                id="popup-email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="popup-message" className={styles.label}>Message / Requirements</label>
              <textarea
                id="popup-message"
                name="message"
                rows={2}
                className={styles.input}
                placeholder="Briefly describe your project requirements..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
              {loading ? 'Submitting…' : 'Request Call Back'}
              <Send size={16} />
            </button>

            <div className={styles.quickContact}>
              <span>Or call directly:</span>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className={styles.phoneLink}>
                {COMPANY.phone}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
