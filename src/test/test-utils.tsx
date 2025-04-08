import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  colors: {
    // Add any theme values needed for styled-components
  },
};

function render(ui: React.ReactElement, options = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={defaultTheme}>
      <Theme accentColor="purple" grayColor="slate" radius="medium">
        {children}
      </Theme>
    </ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { render };
