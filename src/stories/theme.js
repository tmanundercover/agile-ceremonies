/**
 * Shared theme constants for the Agile Ceremonies documentation
 * Prioritizing styles from multi-ai-agent-network.mdx
 */

// Colors extracted from multi-ai-agent-network.mdx CSS variables
export const colors = {
  primary: '#9333EA',        // --primary
  primaryLight: '#A855F7',   // --primary-light
  primaryDark: '#7928CA',    // --primary-dark
  neutral900: '#1A1A1A',     // --neutral-900
  neutral700: '#4A5568',     // --neutral-700
  neutral500: '#A0AEC0',     // --neutral-500
  neutral200: '#EDF2F7',     // --neutral-200
  neutral100: '#F8F9FA',     // --neutral-100
  success: '#22C55E',        // --success
  error: '#EF4444',          // --error
  warning: '#EAB308',        // --warning
  info: '#3B82F6',           // --info
  textColor: 'var(--text-color)', // Dynamic based on theme
  bgColor: 'var(--bg-color)',     // Dynamic based on theme
  cardBg: 'var(--card-bg)',       // Dynamic based on theme
};

// Spacing values from multi-ai-agent-network.mdx
export const spacing = {
  xs: '4px',    // --spacing-xs
  sm: '8px',    // --spacing-sm
  md: '16px',   // --spacing-md
  lg: '24px',   // --spacing-lg
  xl: '32px',   // --spacing-xl
};

export const typography = {
  heading1: {
    fontSize: '32px',
    fontWeight: 700,
    position: 'relative',
    display: 'inline-block',
    // Adding the underline effect from multi-ai-agent-network.mdx
    afterElement: {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '4px',
      bottom: '-8px',
      left: 0,
      background: 'var(--primary)',
      borderRadius: '2px',
    }
  },
  heading2: {
    fontSize: '24px',
    fontWeight: 700,
    borderBottom: '2px solid var(--primary-light)',
    paddingBottom: 'var(--spacing-xs)',
  },
  heading3: {
    fontSize: '20px',
    fontWeight: 700,
  },
  heading4: {
    fontSize: '18px',
    fontWeight: 700,
  },
  body: {
    fontSize: '16px',
    lineHeight: 1.6,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`,
    transition: 'color var(--transition-speed)',
  },
  small: {
    fontSize: '14px',
    lineHeight: 1.5,
  },
  code: {
    background: 'rgba(0, 0, 0, 0.05)',
    padding: '2px 4px',
    borderRadius: '4px',
  },
  link: {
    color: 'var(--primary)',
    textDecoration: 'none',
    transition: 'color var(--transition-speed)',
    hover: {
      color: 'var(--primary-dark)',
      textDecoration: 'underline',
    }
  }
};

// Additional styling properties from multi-ai-agent-network.mdx
export const borderRadius = '8px';  // --border-radius
export const boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // --box-shadow
export const transitionSpeed = '0.3s'; // --transition-speed

// Theme modes from multi-ai-agent-network.mdx
export const themeModes = {
  dark: {
    textColor: 'var(--neutral-200)',
    bgColor: 'var(--neutral-900)',
    cardBg: '#2D3748',
  },
  light: {
    textColor: 'var(--neutral-900)',
    bgColor: 'var(--neutral-100)',
    cardBg: 'white',
  }
};

// Component-specific styling
export const components = {
  floatingNav: {
    position: 'fixed',
    right: '20px',
    top: '20px',
    backgroundColor: 'var(--card-bg)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--spacing-sm)',
    boxShadow: 'var(--box-shadow)',
    transition: 'all var(--transition-speed)',
    zIndex: 100,
    maxWidth: '200px',
    transform: 'translateY(0)',
  },
  animatedDiagram: {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
    visible: {
      opacity: 1,
      transform: 'translateY(0)',
    }
  },
  collapsibleSection: {
    margin: 'var(--spacing-md) 0',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--neutral-500)',
    overflow: 'hidden',
    header: {
      background: 'var(--neutral-200)',
      color: 'var(--neutral-900)',
      padding: 'var(--spacing-md)',
      transition: 'background var(--transition-speed)',
    },
    content: {
      maxHeight: 0,
      overflow: 'hidden',
      transition: 'max-height 0.5s ease',
      padding: '0 var(--spacing-md)',
      expanded: {
        maxHeight: '2000px',
        padding: 'var(--spacing-md)',
      }
    }
  },
  tabPanel: {
    margin: 'var(--spacing-lg) 0',
    buttons: {
      borderBottom: '2px solid var(--neutral-500)',
      button: {
        padding: 'var(--spacing-md)',
        color: 'var(--text-color)',
        position: 'relative',
        active: {
          color: 'var(--primary)',
          afterElement: {
            content: "''",
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--primary)',
          }
        }
      }
    },
    content: {
      padding: 'var(--spacing-md)',
      border: '1px solid var(--neutral-500)',
      borderTop: 'none',
      borderRadius: '0 0 var(--border-radius) var(--border-radius)',
    }
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    zIndex: 1000,
    bar: {
      height: '100%',
      backgroundColor: 'var(--primary)',
      width: 0,
      transition: 'width 0.2s ease',
    }
  },
  themeSwitcher: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--card-bg)',
    boxShadow: 'var(--box-shadow)',
    fontSize: '20px',
    zIndex: 100,
    transition: 'transform 0.3s ease',
    hover: {
      transform: 'scale(1.1)',
    }
  },

  // Additional component styles
  timeline: {
    position: 'relative',
    margin: 'var(--spacing-xl) 0',
    beforeElement: {
      content: "''",
      position: 'absolute',
      left: '20px',
      top: 0,
      bottom: 0,
      width: '4px',
      background: 'var(--primary)',
      borderRadius: '4px',
    },
    day: {
      position: 'relative',
      marginLeft: '50px',
      padding: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-md)',
      borderRadius: 'var(--border-radius)',
      background: 'var(--card-bg)',
      boxShadow: 'var(--box-shadow)',
      transition: 'transform var(--transition-speed), box-shadow var(--transition-speed)',
      beforeElement: {
        content: "''",
        position: 'absolute',
        left: '-30px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'var(--primary)',
      },
      hovered: {
        transform: 'translateX(10px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      }
    }
  },

  codeBlock: {
    margin: 'var(--spacing-md) 0',
    borderRadius: 'var(--border-radius)',
    overflow: 'hidden',
    boxShadow: 'var(--box-shadow)',
    header: {
      background: 'var(--neutral-700)',
      color: 'white',
      padding: 'var(--spacing-xs) var(--spacing-md)',
    },
    copyButton: {
      background: 'transparent',
      border: '1px solid white',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '4px',
      transition: 'all var(--transition-speed)',
      hover: {
        background: 'white',
        color: 'var(--neutral-700)',
      }
    },
    pre: {
      margin: 0,
      padding: 'var(--spacing-md)',
      overflowX: 'auto',
      backgroundColor: '#282c34',
      color: '#abb2bf',
    }
  },
};

// Media queries
export const mediaQueries = {
  mobile: '@media (max-width: 768px)',
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  boxShadow,
  transitionSpeed,
  themeModes,
  components,
  mediaQueries,
};
