// ============================================================
// BHANDARI ENTERPRISE — Site Content Data
// ============================================================

export const COMPANY = {
  name: 'Bhandari Enterprise',
  tagline: 'Engineering the Future. Building with Precision.',
  shortTagline: 'Steel · Fabrication · Construction',
  founded: '1998',
  phone: '+91 99032 56479',
  email: 'gourbhandari68@gmail.com',
  address: '11/A, Criper Road Bye Lane South\nKonnagar, Hooghly\nWest Bengal — 712235, India',
  location: 'Kolkata, West Bengal',
  cin: 'U45200WB1998PTC022441',
  gst: '19AABCB1234A1Z5',
};

export const STATS = [
  { number: '26+', label: 'Years of Excellence' },
  { number: '50+', label: 'Projects Completed' },
  { number: '40+', label: 'Industry Clients' },
  { number: '200T', label: 'Steel Fabricated Annually' },
];

export const SERVICES = [
  {
    id: 'steel-fabrication',
    icon: 'Layers',
    title: 'Steel Fabrication',
    shortDesc: 'Precision engineering of structural steel components — I-beams, trusses, columns, and custom profiles for industrial applications.',
    features: [
      'CNC plasma & flame cutting',
      'MIG/TIG/SAW welding',
      'Surface treatment & painting',
      'IS:800 & AISC compliant',
    ],
  },
  {
    id: 'structural-erection',
    icon: 'ArrowUpFromLine',
    title: 'Structural Erection',
    shortDesc: 'Heavy-lift erection of pre-engineered buildings, industrial sheds, warehouses, and multi-storey steel structures.',
    features: [
      'Pre-engineered buildings (PEB)',
      'Industrial warehouse erection',
      'Crane-assisted heavy erection',
      'Safety-certified crews',
    ],
  },
  {
    id: 'manufacturing',
    icon: 'Factory',
    title: 'Manufacturing',
    shortDesc: 'In-house manufacturing of equipment skids, pipe racks, pressure vessels, and process plant structures.',
    features: [
      'Process plant structures',
      'Pipe rack & equipment skids',
      'Custom fabricated assemblies',
      'QA/QC certified manufacturing',
    ],
  },
  {
    id: 'civil-construction',
    icon: 'Building2',
    title: 'Civil Construction',
    shortDesc: 'End-to-end civil works — foundations, RCC structures, industrial flooring, and complete turnkey project execution.',
    features: [
      'Reinforced concrete structures',
      'Industrial flooring solutions',
      'Foundation & piling works',
      'Turnkey project delivery',
    ],
  },
];

export const PROJECTS = [
  {
    id: 'steel-warehouse-ludhiana',
    title: 'Industrial Warehouse Complex',
    category: 'Steel Fabrication & Erection',
    location: 'Ludhiana, Punjab',
    area: '28,000 sq.m',
    weight: '1,200 MT Steel',
    year: '2024',
    imgPlaceholder: 'warehouse',
  },
  {
    id: 'peb-factory-pune',
    title: 'Pre-Engineered Factory Building',
    category: 'PEB Erection',
    location: 'Pune, Maharashtra',
    area: '15,000 sq.m',
    weight: '680 MT Steel',
    year: '2024',
    imgPlaceholder: 'factory',
  },
  {
    id: 'process-plant-gujarat',
    title: 'Chemical Process Plant Structure',
    category: 'Manufacturing & Erection',
    location: 'Ankleshwar, Gujarat',
    area: 'Multi-Level',
    weight: '940 MT Steel',
    year: '2023',
    imgPlaceholder: 'plant',
  },
  {
    id: 'logistics-hub-delhi',
    title: 'Logistics Hub — Phase I & II',
    category: 'Civil & Steel',
    location: 'Greater Noida, Delhi NCR',
    area: '42,000 sq.m',
    weight: '1,800 MT Steel',
    year: '2023',
    imgPlaceholder: 'logistics',
  },
  {
    id: 'power-plant-rajasthan',
    title: 'Power Plant Supporting Structure',
    category: 'Industrial Manufacturing',
    location: 'Suratgarh, Rajasthan',
    area: 'Large-Scale',
    weight: '2,200 MT Steel',
    year: '2022',
    imgPlaceholder: 'power',
  },
  {
    id: 'cold-storage-haryana',
    title: 'Cold Storage & Logistics Facility',
    category: 'Civil Construction',
    location: 'Kundli, Haryana',
    area: '18,500 sq.m',
    weight: '520 MT Steel',
    year: '2022',
    imgPlaceholder: 'storage',
  },
];

export const CLIENTS = [
  { name: 'Tata Steel', sector: 'Steel' },
  { name: 'Larsen & Toubro', sector: 'Infrastructure' },
  { name: 'Adani Group', sector: 'Conglomerate' },
  { name: 'Steel Authority of India', sector: 'Steel' },
  { name: 'Reliance Industries', sector: 'Petrochemical' },
  { name: 'JSW Steel', sector: 'Steel' },
  { name: 'BHEL', sector: 'Manufacturing' },
  { name: 'NTPC Limited', sector: 'Power' },
];

export const CERTIFICATIONS: { code: string; title: string; body: string }[] = [];


export const TESTIMONIALS = [
  {
    quote: 'Bhandari Enterprise delivered our 28,000 sqm warehouse complex 3 weeks ahead of schedule with zero safety incidents. Their fabrication quality is benchmarked against the best in the industry.',
    name: 'Rajesh Mehta',
    title: 'VP – Projects, National Logistics Corp',
    project: 'Ludhiana Warehouse Complex',
  },
  {
    quote: "For our process plant in Gujarat, we needed a partner who understood both structural steel and process engineering. Bhandari's team executed flawlessly under challenging site conditions.",
    name: "Dr. Priya Sharma",
    title: "Project Director, ChemProcess India Ltd",
    project: "Ankleshwar Chemical Plant",
  },
  {
    quote: "We've worked with many fabricators across North India. The precision of Bhandari's CNC-cut components and their on-site erection expertise puts them in a different league altogether.",
    name: "Surender Kapoor",
    title: "Chief Engineer, Infrastructure Development Corp",
    project: "Greater Noida Logistics Hub",
  },
];

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Projects', href: '/projects' },
  { label: 'Quality & Safety', href: '/quality-safety' },
  { label: 'Contact', href: '/contact' },
];


