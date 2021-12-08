import React from 'react';
import EntryCard from './';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import { TestWrapper } from '../../../../../__helpers__';

const mockViewOnClick = jest.fn();

describe('Entry Card tests', () => {
  afterEach(cleanup);

  it('renders a standard entry card when freeText is present', async () => {
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <EntryCard
          entry={{
            id: 'LjY19hleO64q59oyXgGQ',
            date: '2021-11-28T00:00:00.000Z',
            createdAt: '2021-11-28T00:00:00.000Z',
            lastUpdated: '2021-11-28T00:00:00.000Z',
            freeText: 'Some day description',
            tags: [],
          }}
          viewOnClick={mockViewOnClick}
        />
      </TestWrapper>,
    );

    expect(getByTestId('entry-card')).toBeTruthy();
    expect(getByText('Some day description')).toBeTruthy();
  });

  it('renders a slim entry card when freeText is present', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <EntryCard
          entry={{
            id: 'LjY19hleO64q59oyXgGQ',
            date: '2021-11-29T00:00:00.000Z',
            createdAt: '2021-11-29T00:00:00.000Z',
            lastUpdated: '2021-11-29T00:00:00.000Z',
            freeText: '',
            tags: [],
          }}
          viewOnClick={mockViewOnClick}
        />
      </TestWrapper>,
    );

    expect(getByTestId('entry-card-slim')).toBeTruthy();
  });

  it('formats date correctly', async () => {
    const { getByText } = render(
      <TestWrapper>
        <EntryCard
          entry={{
            id: 'LjY19hleO64q59oyXgGQ',
            date: '2021-11-29T00:00:00.000Z',
            createdAt: '2021-11-29T00:00:00.000Z',
            lastUpdated: '2021-11-29T00:00:00.000Z',
            freeText: '',
            tags: [],
          }}
          viewOnClick={mockViewOnClick}
        />
      </TestWrapper>,
    );

    expect(getByText('29 Nov 2021')).toBeTruthy();
  });

  it('fires view on click method when view is clicked', async () => {
    const entry = { date: '2021-11-29T00:00:00.000Z', freeText: '', id: 'LjY19hleO64q59oyXgGQ' };
    const { getByText } = render(
      <TestWrapper>
        <EntryCard entry={entry} viewOnClick={mockViewOnClick} />
      </TestWrapper>,
    );

    fireEvent.press(getByText('VIEW'));

    expect(mockViewOnClick).toHaveBeenCalledTimes(1);
    expect(mockViewOnClick).toHaveBeenCalledWith(entry);
  });
});
