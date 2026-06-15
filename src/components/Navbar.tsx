'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { COMPANY } from '@/data/content';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Capabilities',
    href: '/capabilities',
    children: [
      { label: 'Steel Fabrication', href: '/capabilities/steel-fabrication' },
      { label: 'Structural Erection', href: '/capabilities/structural-erection' },
      { label: 'Manufacturing', href: '/capabilities/manufacturing' },
      { label: 'Civil Construction', href: '/capabilities/civil-construction' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Quality & Safety', href: '/quality-safety' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Scroll to top when logo clicked
  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>

          {/* ── LOGO ── */}
          <Link
            href="/"
            className={styles.logo}
            aria-label="Bhandari Enterprise — Back to top"
            onClick={handleLogoClick}
          >
            <Image
              src="/logo.png"
              alt="Bhandari Enterprise"
              width={64}
              height={64}
              className={styles.logoImg}
              priority
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList} role="list">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.href}
                  ref={link.children ? dropdownRef : undefined}
                  className={link.children ? styles.hasDropdown : ''}
                  onMouseEnter={() => link.children && setDropdownOpen(true)}
                  onMouseLeave={() => link.children && setDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''} ${link.children ? styles.navLinkCap : ''}`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>

                  {/* Dropdown */}
                  {link.children && (
                    <div
                      className={`${styles.dropdown} ${dropdownOpen ? styles.dropdownOpen : ''}`}
                      role="menu"
                      aria-label={`${link.label} submenu`}
                    >
                      <div className={styles.dropdownHeader}>
                        <span className={styles.dropdownHeaderLabel}>Capabilities</span>
                        <Link href="/capabilities" className={styles.dropdownViewAll}>
                          View All <ChevronRight size={12} />
                        </Link>
                      </div>
                      <div className={styles.dropdownGrid}>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`${styles.dropdownItem} ${isActive(child.href) ? styles.dropdownItemActive : ''}`}
                            role="menuitem"
                          >
                            <span className={styles.dropdownDot} aria-hidden="true" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ── DESKTOP ACTIONS ── */}
          <div className={styles.navActions}>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className={styles.phoneLink}
              aria-label={`Call us at ${COMPANY.phone}`}
            >
              <Phone size={14} strokeWidth={2} aria-hidden="true" />
              <span className={styles.phoneNumber}>{COMPANY.phone}</span>
            </a>
            <Link href="/contact" className="btn btn--primary btn--sm" id="nav-cta">
              Get Quote
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            id="mobile-menu-btn"
          >
            {menuOpen
              ? <X size={24} strokeWidth={2} aria-hidden="true" />
              : <Menu size={24} strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.mobileMenuInner}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <ul className={styles.mobileNavList} role="list">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  className={styles.mobileNavItem}
                  style={{ transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
                >
                  <Link
                    href={link.href}
                    className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ''}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    <span className={styles.mobileNavIndex}>0{i + 1}</span>
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className={styles.mobileSubList} role="list">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={styles.mobileSubLink}
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.mobileMenuFooter}>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className={styles.mobilePhone}
            >
              <Phone size={18} aria-hidden="true" />
              {COMPANY.phone}
            </a>
            <Link
              href="/contact"
              className="btn btn--primary btn--full"
              onClick={() => setMenuOpen(false)}
            >
              Request a Quote
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
