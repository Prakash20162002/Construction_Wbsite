import Link from 'next/link';
import styles from './PageHero.module.css';

interface PageHeroProps {
  overline?: string;
  title: string;
  titleAccent?: string;       // portion of title in orange
  lead?: string;
  breadcrumbs?: { label: string; href?: string }[];
  stats?: { number: string; label: string }[];
  dark?: boolean;             // default true
}

export default function PageHero({
  overline,
  title,
  titleAccent,
  lead,
  breadcrumbs,
  stats,
  dark = true,
}: PageHeroProps) {
  return (
    <section
      className={`${styles.hero} ${dark ? styles.dark : styles.mid}`}
      aria-label={`${title} page hero`}
    >
      <div className={`container container--content ${styles.inner}`}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li>
                <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className={styles.breadcrumbItem}>
                  <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className={styles.breadcrumbLink}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={styles.breadcrumbCurrent} aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Overline */}
        {overline && (
          <span className="overline">{overline}</span>
        )}

        {/* Title */}
        <h1 className={styles.title}>
          {title}
          {titleAccent && (
            <><br /><span className={styles.titleAccent}>{titleAccent}</span></>
          )}
        </h1>

        {/* Lead */}
        {lead && (
          <p className={styles.lead}>{lead}</p>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className={styles.stats} aria-label="Key statistics">
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom border accent */}
      <div className={styles.bottomAccent} aria-hidden="true" />
    </section>
  );
}
