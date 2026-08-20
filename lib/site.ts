export const site = {
  name: 'Harbourview',
  footerName: 'Harbourview Collective',
  footerDescription:
    'Six independent guesthouses on the south coast of England.',
  description: 'Six independent guesthouses on the south coast.',
  contact: {
    email: 'hello@harbourview.co.uk',
    phone: '01273 000 000',
    enquiryHours: [
      'Monday to Friday, 09:00 – 18:00',
      'Saturday and Sunday, 10:00 – 16:00',
    ],
  },
  nav: [
    { href: '/properties', label: 'Properties' },
    { href: '/journal', label: 'Journal' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  faqLink: { href: '/faq', label: 'FAQ' },
  footer: {
    exploreHeading: 'Explore',
    contactHeading: 'Contact',
  },
} as const;
