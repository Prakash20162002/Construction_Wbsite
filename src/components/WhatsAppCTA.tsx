import React from 'react';
import styles from './WhatsAppCTA.module.css';

export default function WhatsAppCTA() {
  const whatsappUrl = 'https://wa.me/919903256479?text=Hello%20Bhandari%20Enterprise%2C%20I%20would%20like%20to%20discuss%20an%20industrial%2Fconstruction%20project%20inquiry.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatBtn}
      aria-label="Contact Bhandari Enterprise on WhatsApp"
      title="Chat with Project Team"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.012 2C6.48 2 2.004 6.48 2.004 12c0 1.764.456 3.48 1.332 5.004L2 22l5.124-1.332A9.972 9.972 0 0 0 12.012 22c5.52 0 9.996-4.48 9.996-10S17.532 2 12.012 2zm0 1.836c4.512 0 8.16 3.648 8.16 8.164 0 4.512-3.648 8.16-8.16 8.16-1.596 0-3.144-.456-4.464-1.332l-.324-.192-3.048.792.804-2.964-.216-.348A8.106 8.106 0 0 1 3.84 12c0-4.516 3.648-8.164 8.172-8.164zm-1.896 3.516c-.228 0-.444.084-.624.276-.276.288-.744.756-.744 1.848s.792 2.148.9 2.292c.108.144 1.56 2.376 3.78 3.336 2.22.96 2.22.636 2.628.6 1.056-.12 2.016-.828 2.292-1.608.276-.78.276-1.452.192-1.596-.084-.144-.312-.228-.66-.408-.348-.18-2.016-.996-2.328-1.116-.312-.12-.54-.18-.768.156-.228.336-.888 1.116-1.092 1.344-.204.228-.408.252-.756.072s-1.476-.54-2.808-1.728c-1.032-.924-1.728-2.064-1.932-2.412-.204-.348-.024-.54.156-.72.156-.156.348-.408.528-.612.18-.204.24-.348.36-.576.12-.228.06-.432-.03-.612-.084-.18-.768-1.848-1.056-2.544-.276-.672-.564-.576-.768-.588z" />
      </svg>
      <span className={styles.pulse} />
      <span className={styles.tooltip}>Chat with Project Team</span>
    </a>
  );
}
