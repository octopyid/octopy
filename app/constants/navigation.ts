export interface NavLink {
  name: string;
  path: string;
}

/** Single source of truth for the primary site navigation. */
export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Lab', path: '/lab' },
  { name: 'Insights', path: '/insights' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
