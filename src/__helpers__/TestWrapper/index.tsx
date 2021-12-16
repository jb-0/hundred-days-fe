import React from 'react';
import { initiateTranslations, ThemeProvider } from '../../providers';

initiateTranslations();

const TestWrapper = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default TestWrapper;
