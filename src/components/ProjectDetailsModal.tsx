'use client';

import React, { useEffect, useState } from 'react';
import { X, MapPin, User, Square, Weight, Calendar, Star } from 'lucide-react';
import styles from './ProjectDetailsModal.module.css';

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image?: string;
  imageBefore?: string;
  imageAfter?: string;
  area?: string;
  weight?: string;
  scope?: string;
  client?: string;
  sector?: string;
  summary?: string;
  highlights?: readonly string[] | string[];
  tags?: readonly string[] | string[];
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setRating(0);
    setHoverRating(0);
    setFeedback('');
    setIsRated(false);
  }, [project]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose} 
          aria-label="Close project details"
        >
          <X size={22} />
        </button>

        <div className={styles.contentGrid}>
          {/* Visual section */}
          <div className={styles.visualSection}>
            {project.image ? (
              <img src={project.image} alt={project.title} className={styles.projectImage} />
            ) : (
              <div className={styles.fallbackVisual}>
                <span>{project.category}</span>
              </div>
            )}
            <div className={styles.visualOverlay} />
            <div className={styles.badgeStrip}>
              <span className={styles.catBadge}>{project.category}</span>
              <span className={styles.yearBadge}>
                <Calendar size={12} style={{ marginRight: '4px', display: 'inline' }} />
                {project.year}
              </span>
            </div>
          </div>

          {/* Details section */}
          <div className={styles.detailsSection}>
            <span className={styles.sectorLabel}>{project.sector || 'Industrial Execution'}</span>
            <h3 id="modal-project-title" className={styles.title}>{project.title}</h3>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <MapPin size={16} className={styles.metaIcon} />
                <div>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>{project.location}</span>
                </div>
              </div>

              {project.client && (
                <div className={styles.metaItem}>
                  <User size={16} className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>Client</span>
                    <span className={styles.metaValue}>{project.client}</span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.divider} />

            {/* Description */}
            <div className={styles.infoBlock}>
              <h4 className={styles.blockHeading}>Project Overview</h4>
              <p className={styles.summaryText}>
                {project.summary || 'A state-of-the-art industrial infrastructure project designed and executed with precision engineering, quality construction materials, and safety measures.'}
              </p>
            </div>

            {/* Specs Row */}
            <div className={styles.specsRow}>
              {project.area && (
                <div className={styles.specBox}>
                  <Square size={16} className={styles.specIcon} />
                  <div>
                    <span className={styles.specLabel}>Covered Area</span>
                    <span className={styles.specValue}>{project.area}</span>
                  </div>
                </div>
              )}

              {(project.weight || project.scope) && (
                <div className={styles.specBox}>
                  <Weight size={16} className={styles.specIcon} />
                  <div>
                    <span className={styles.specLabel}>Steel Work</span>
                    <span className={styles.specValue}>{project.weight || project.scope}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className={styles.infoBlock}>
                <h4 className={styles.blockHeading}>Key Achievements</h4>
                <ul className={styles.highlightsList}>
                  {project.highlights.map((h, index) => (
                    <li key={index} className={styles.highlightItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Before/After Case Study Photos */}
            {project.imageBefore && project.imageAfter && (
              <div className={styles.beforeAfterBlock}>
                <h4 className={styles.blockHeading}>Case Study: Execution Stages</h4>
                <div className={styles.beforeAfterGrid}>
                  <div className={styles.beforeAfterCard}>
                    <span className={styles.beforeAfterBadge}>Initial Stage</span>
                    <div className={styles.stageImgWrap}>
                      <img src={project.imageBefore} alt="Initial foundation or fabrication stage" className={styles.stageImg} />
                    </div>
                  </div>
                  <div className={styles.beforeAfterCard}>
                    <span className={`${styles.beforeAfterBadge} ${styles.afterBadge}`}>Completed Structure</span>
                    <div className={styles.stageImgWrap}>
                      <img src={project.imageAfter} alt="Completed erection or installation stage" className={styles.stageImg} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className={styles.tagsList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tagBadge}>{tag}</span>
                ))}
              </div>
            )}

            {/* Rating & Improvement Section */}
            <div className={styles.ratingSection}>
              <h4 className={styles.ratingHeading}>Rate this Project</h4>
              
              {isRated ? (
                <div className={styles.ratingSuccess}>
                  <p className={styles.successText}>✓ Rating submitted successfully!</p>
                  <p className={styles.improvementText}>
                    Thank you for your review. We are committed to continuous performance improvement.
                  </p>
                </div>
              ) : (
                <div className={styles.ratingForm}>
                  <div className={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isFilled = hoverRating >= starValue || (!hoverRating && rating >= starValue);
                      return (
                        <button
                          key={starValue}
                          type="button"
                          className={styles.starButton}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${starValue} stars out of 5`}
                        >
                          <Star
                            size={22}
                            fill={isFilled ? 'var(--color-accent)' : 'none'}
                            stroke={isFilled ? 'var(--color-accent)' : 'var(--color-navy-400)'}
                            style={{ transition: 'all 0.15s ease' }}
                          />
                        </button>
                      );
                    })}
                  </div>
                  
                  {rating > 0 && (
                    <div className={styles.feedbackArea}>
                      <label htmlFor="improvement-feedback" className={styles.feedbackLabel}>
                        Suggestions for our improvement:
                      </label>
                      <textarea
                        id="improvement-feedback"
                        className={styles.feedbackInput}
                        rows={2}
                        placeholder="E.g., safety, drawing detail, execution speed..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn--primary btn--full btn--sm"
                        style={{ marginTop: '10px' }}
                        onClick={() => setIsRated(true)}
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
