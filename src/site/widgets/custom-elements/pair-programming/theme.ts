/**
 * Shared theme constants for the Agile Ceremonies
 * consistent styles from multi-ai-agent-network.mdx
 */

export const colors = {
    primary: '#9333EA',        // --primary
    primaryLight: '#A855F7',   // --primary-light
    primaryDark: '#7928CA',    // --primary-dark
    neutral900: '#1A1A1A',     // --neutral-900
    neutral700: '#4A5568',     // --neutral-700
    neutral500: '#A0AEC0',     // --neutral-500
    neutral200: '#EDF2F7',     // --neutral-200
    neutral300: '#CBD5E0',     // Medium gray that works well with backgrounds
    neutral400: '#AAB9BD',     // --neutral-400
    neutral600: '#8C979D',     // --neutral-600
    neutral800: '#667C72',     // --neutral-800
    neutral100: '#F8F9FA',     // --neutral-100
    success: '#22C55E',        // --success
    error: '#EF4444',          // --error
    warning: '#EAB308',        // --warning
    info: '#3B82F6',           // --info
    textColor: '#333333',      // Default text color for light theme
    textSecondary: '#666666',  // Secondary text color, slightly lighter
    bgColor: '#F8F9FA',        // Default background color (matches neutral100)
    cardBg: '#FFFFFF',         // Default card background (white)
    sidebarBg: '#f9fafb',      // Sidebar background color
};


// Spacing values from multi-ai-agent-network.mdx
export const spacing = {
    xs: '4px',    // --spacing-xs
    sm: '8px',    // --spacing-sm
    md: '16px',   // --spacing-md
    lg: '24px',   // --spacing-lg
    xl: '32px',   // --spacing-xl
};

// Refined, more consistent border radius
export const borderRadius = '8px';  // --border-radius

// More subtle box shadow for better cohesion, replacing the neuromorphic effect with a cleaner drop shadow
export const boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'; // --box-shadow

// Adjusted transition speed for more consistency
export const transitionSpeed = '0.25s'; // --transition-speed

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
            background: `${colors.primary}`,
            borderRadius: '2px',
        }
    },
    heading2: {
        fontSize: '24px',
        fontWeight: 700,
        borderBottom: `2px solid ${colors.primaryLight}`,
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
        color: `${colors.primary}`,
        textDecoration: 'none',
        transition: `color ${transitionSpeed}`,
        hover: {
            color: 'var(--primary-dark)',
            textDecoration: 'underline',
        }
    }
};

// Theme modes from multi-ai-agent-network.mdx
export const themeModes = {
    dark: {
        textColor: colors.neutral200,
        bgColor: colors.neutral900,
        cardBg: '#2D3748',
    },
    light: {
        textColor: colors.neutral900,
        bgColor: colors.neutral100,
        cardBg: 'white',
    }
}

// Define a zIndices object for consistent z-index values
export const zIndices = {
    base: 1,
    content: 10,
    navigation: 100,
    modal: 1000,
    tooltip: 2000,
};

// Add font family
export const fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

// Refined animation transitions for more subtle, consistent motion
export const animations = {
    easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    springy: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    quickEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    durations: {
        fast: '0.15s',
        normal: '0.25s', // Adjusted to match transitionSpeed
        slow: '0.4s'     // Slightly faster for better response
    }
};
export const technologyTagColors: { [key: string]: string } = {
    React: "#61DAFB",
    TypeScript: "#007ACC",
    Firebase: "#FFA000",
    Kanban: "#42B883",
    JavaScript: "#F7DF1E",
    CSS: "#1572B6",
    HTML: "#E34F26",
    Python: "#3776AB",
    Django: "#092E20",
    Node: "#339933",
    Express: "#000000",
    MongoDB: "#47A248",
    SQL: "#4479A1",
    "UI/UX": "#FF7262",
    Figma: "#F24E1E",
    Docker: "#2496ED",
    AWS: "#FF9900",
    GraphQL: "#E10098",
    Testing: "#FF6C37",
    Flutter: "#02569B",
    Swift: "#FA7343",
    Kotlin: "#7F52FF",
};

export const aiAgentColors:{[key:string]:string} = {
    "Reqqy":"#F4A300",
    "Brian":"#5AB5F7",
    "James":"#7FCF87",
    "Terrell":"#7FCF87",
    "Josh":"#E25574",
    "ManMan":"#F2703E",
    "Antosh":"#7E4DD2",
    "Lia":"#64C9D9",
    "Nat":"#A35BD6",
}

// Refined shadow system with a more consistent and subtle approach
export const shadows = {
    none: 'none',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)', // Main default shadow, matches boxShadow
    lg: '0 4px 12px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.12)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.03)',
    outline: '0 0 0 2px rgba(147, 51, 234, 0.25)',
    focusRing: '0 0 0 3px rgba(147, 51, 234, 0.3)',
    hover: '0 4px 10px rgba(0, 0, 0, 0.1)'
};

// Add a consistent elevation system for z-depth
export const elevation = {
    0: shadows.none,
    1: shadows.sm,
    2: shadows.md,
    3: shadows.lg,
    4: shadows.xl,
    hover: shadows.hover,
    focus: shadows.focusRing
};

export default {
    colors,
    spacing,
    typography,
    borderRadius,
    boxShadow,
    transitionSpeed,
    themeModes,
    zIndices,
    fontFamily,
    animations,
    shadows,
    technologyTagColors,
    elevation
};
