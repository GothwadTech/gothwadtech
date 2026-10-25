export const COMPANY_INFO = {
  name: 'Gothwad Tech',
  domain: 'gothwadtech.com',
  legalName: 'Gothwad Tech Private Limited',
  tagline: 'Sovereign software and business systems, built in India',
  slogan: 'Built in India, for Bharat',
  description:
    'Gothwad Tech is an Indian software collective from Jaipur, Rajasthan. One Gothwad Account connects Mail, Drive, Meet, Tube, GrixChat, Indogram, Browser, Education, AI Studio and Docs.',
  foundedYear: '2023',
  headquarters: 'Jaipur, Rajasthan, India',
  phone: '+91 73399 04665',
  /** E.164 — safe for tel: links on every platform. */
  phoneE164: '+917339904665',
  whatsappNumberOnly: '917339904665',
  email: 'contact@gothwadtech.com',
  supportEmail: 'support@gothwadtech.com',
  helpEmail: 'help@gothwadtech.com',
  infoEmail: 'info@gothwadtech.com',
  docsEmail: 'docs@gothwadtech.com',
  securityEmail: 'security@gothwadtech.com',
  founderEmail: 'pawan@gothwadtech.com',
  ceoEmail: 'yuvkesh@gothwadtech.com',
  coFounderEmail: 'vishnu@gothwadtech.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/GothwadTech' },
    { label: 'X (Twitter)', href: 'https://x.com/gothwadtech' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/gothwadtech' },
  ],
};

/**
 * Single source of truth for the team. Update here and the Company page,
 * humans.txt copy and any derived UI stay consistent.
 */
export const LEADERSHIP = [
  {
    name: 'Pawan Gothwad',
    role: 'Founder & Chief Visionary Officer',
    email: COMPANY_INFO.founderEmail,
    location: 'Jaipur, Rajasthan',
    highlight: false,
  },
  {
    name: 'Yuvkesh Meena',
    role: 'Chief Executive Officer',
    email: COMPANY_INFO.ceoEmail,
    location: 'Dausa, Rajasthan',
    highlight: true,
  },
  {
    name: 'Vishnu Meena',
    role: 'Co-Founder & CTO',
    email: COMPANY_INFO.coFounderEmail,
    location: 'Jaipur, Rajasthan',
    highlight: false,
  },
] as const;

export const ROOT_DOMAIN = 'gothwadtech.com';
