export const theme = {
  colors: {
    primary: '#1e1e1e',
    secondary: '#2d2d2d',
    border: '#484848',
    borderLight: '#606060',
    text: '#ffffff',
    textMuted: '#a0a0a0',
    error: '#ff6b6b',
    actionBg: '#4a4a4a',
    actionBgHover: '#5a5a5a',
    actionBorder: '#707070'
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
