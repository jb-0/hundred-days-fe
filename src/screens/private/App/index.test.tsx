import React from 'react';
import App from './';
import { render, cleanup } from '@testing-library/react-native';
import { navigation, TestWrapper } from '../../../__helpers__';
import { AppNavigationProps } from '../../../types/Navigation';

const mockNav = navigation<AppNavigationProps['app']>();

describe('Screen - App', () => {
  afterEach(cleanup);

  it('renders app screen and defaults to list view', () => {
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <App navigation={mockNav} />
      </TestWrapper>,
    );

    expect(getByTestId('app-page')).toBeTruthy();
    expect(getByTestId('entries-list-view')).toBeTruthy();

    expect(getByText('List')).toBeTruthy();
    expect(getByText('Stats')).toBeTruthy();
  });
});
