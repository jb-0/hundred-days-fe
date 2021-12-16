import React from 'react';
import EntryList from './';
import { render, cleanup, waitFor } from '@testing-library/react-native';
import { TestWrapper } from '../../../../__helpers__';

const mockViewOnClick = jest.fn();

describe('Entry List tests', () => {
  afterEach(cleanup);

  it('renders app screen and defaults to list view', async () => {
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <EntryList refreshing={false} setRefreshing={() => null} viewOnClick={mockViewOnClick} />
      </TestWrapper>,
    );

    expect(getByTestId('entries-list-view')).toBeTruthy();

    // expect one standard card
    await waitFor(() => getByTestId('entry-card'));
    expect(getByText('Some day description')).toBeTruthy();

    // and one slim card
    expect(getByTestId('entry-card-slim')).toBeTruthy();
  });
});
