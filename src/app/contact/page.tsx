import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Get a Quote — Bhandari Enterprise',
  description:
    'Request a project quote or get in touch with the Bhandari Enterprise team. Industrial engineering, steel fabrication, erection and civil construction enquiries welcome.',
};

export default function ContactPage() {
  return <ContactClient />;
}
