import React from 'react';
import App from './';
import { render, cleanup, waitFor } from '@testing-library/react-native';
import { navigation, TestWrapper } from '../../../__helpers__';
import { AppNavigationProps } from '../../../types/Navigation';

const mockNav = navigation<AppNavigationProps['app']>();

describe('Screen - App', () => {
  afterEach(cleanup);

  it('renders app screen and defaults to list view', async () => {
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <App navigation={mockNav} />
      </TestWrapper>,
    );

    await waitFor(() => getByTestId('entry-card'));

    expect(getByTestId('app-page')).toBeTruthy();
    expect(getByTestId('entries-list-view')).toBeTruthy();

    expect(getByText('List')).toBeTruthy();
    expect(getByText('Stats')).toBeTruthy();
  });
});
