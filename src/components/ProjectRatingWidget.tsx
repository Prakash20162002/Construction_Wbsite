'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './ProjectRatingWidget.module.css';

interface ProjectRatingWidgetProps {
  projectId: string;
  projectTitle: string;
}

export default function ProjectRatingWidget({ projectId, projectTitle }: ProjectRatingWidgetProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isRated, setIsRated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    // In a real application, we would submit this to an API
    console.log(`Rating for ${projectId} (${projectTitle}): ${rating} stars. Feedback: ${feedback}`);
    setIsRated(true);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Rate Our Execution Quality</h3>
      <p className={styles.subtext}>
        Your feedback helps Bhandari Enterprise maintain high engineering standards and improve safety and execution speed.
      </p>

      {isRated ? (
        <div className={styles.successMessage} role="alert">
          <p className={styles.successTitle}>✓ Thank you for your rating!</p>
          <p className={styles.successSub}>
            We have registered your feedback. Bhandari Enterprise is committed to continuous process and quality improvement.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = hoverRating >= starValue || (!hoverRating && rating >= starValue);
              return (
                <button
                  key={starValue}
                  type="button"
                  className={styles.starBtn}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${starValue} stars out of 5`}
                >
                  <Star
                    size={28}
                    className={styles.starIcon}
                    fill={isFilled ? 'var(--color-accent)' : 'none'}
                    stroke={isFilled ? 'var(--color-accent)' : 'var(--color-navy-400)'}
                  />
                </button>
              );
            })}
          </div>

          {rating > 0 && (
            <div className={styles.feedbackSection}>
              <label htmlFor="project-improvement-feedback" className={styles.feedbackLabel}>
                How can we improve? (Optional)
              </label>
              <textarea
                id="project-improvement-feedback"
                className={styles.feedbackTextarea}
                rows={3}
                placeholder="E.g., safety compliance, delivery speed, drawing accuracy..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <button type="submit" className="btn btn--primary btn--full">
                Submit Project Review
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
