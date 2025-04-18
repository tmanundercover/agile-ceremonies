import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight?: string;
      primaryDark?: string;
      neutral200?: string;
      neutral500?: string;
      neutral700?: string;
      cardBg?: string;
      [key: string]: string | undefined;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg?: string;
      xl?: string;
      [key: string]: string | undefined;
    };
    borderRadius: string;
    boxShadow?: string;
    typography?: {
      heading3?: {
        fontSize: string;
      };
      [key: string]: any;
    };
  }
}
