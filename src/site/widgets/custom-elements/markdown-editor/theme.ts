export const theme = {
  colors: {
    primary: '#2d2d2d',
    secondary: '#3a3a3a',
    border: '#404040',
    borderLight: '#505050',
    text: '#ffffff',
    textMuted: '#808080',
    error: '#ff4444',
    actionBg: '#555',
    actionBgHover: '#666',
    actionBorder: '#666'
  },
  spacing: {
    small: '4px',
    medium: '8px',
    large: '16px'
  },
  transitions: {
    default: 'all 0.2s ease'
  },
  borderRadius: '4px'
};

export type Theme = typeof theme;
