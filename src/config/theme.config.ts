export const themeConfig = {
  colors: {
    ink: '#1d2927',
    muted: '#5d6b64',
    paper: '#f7f5ef',
    surface: '#fffefa',
    accent: '#a54b31',
    accentDark: '#743a2a',
    line: '#dedbd1',
    forest: '#293c35',
    forestDeep: '#1b2b25',
    warm: '#f0c7a3',
    sand: '#ead8c6',
    landscapeSky: '#e7dfc8',
    landscapeHill: '#697e70',
    landscapeShadow: '#475f53',
  },
  radius: { card: '1.25rem', pill: '999px' },
  typography: {
    body: '"Aptos", "Segoe UI", sans-serif',
    display: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
  },
  layout: { contentWidth: '1240px', sectionSpace: 'clamp(4.5rem, 8vw, 7rem)' },
} as const;
