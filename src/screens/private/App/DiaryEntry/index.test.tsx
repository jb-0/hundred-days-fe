import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react-native';
import DiaryEntry from './';
import { navigation, TestWrapper } from '../../../../__helpers__';
import { AppNavigationProps } from '../../../../types/Navigation';

const mockNav = navigation<AppNavigationProps['diaryEntry']>();

jest.mock('@react-navigation/core', () => {
  const actualNav = jest.requireActual('@react-navigation/core');
  return {
    ...actualNav,
    useRoute: jest
      .fn()
      .mockImplementationOnce(() => ({ params: { sender: 'create', entry: {} } }))
      .mockImplementationOnce(() => ({
        params: {
          sender: 'edit',
          entry: {
            date: '2021-11-27T00:00:00.000Z',
            freeText: 'Some random description of a day',
            tags: ['html', 'react'],
          },
        },
      }))
      .mockImplementation(() => ({ params: { sender: 'edit', entry: { date: '2021-11-29T00:00:00.000Z' } } })),
  };
});

describe('Diary Entry tests', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.spyOn(console, 'error');
    // @ts-ignore jest.spyOn adds this functionality
    console.error.mockImplementation(() => null);
  });

  // @ts-ignore jest.spyOn adds this functionality
  afterEach(() => console.error.mockRestore());

  describe('Create', () => {
    it('renders the diary entry screen for creating a new entry', () => {
      const { getByTestId, getByText, queryByTestId } = render(
        <TestWrapper>
          <DiaryEntry navigation={mockNav} />
        </TestWrapper>,
      );

      expect(getByTestId('diary-entry-page')).toBeTruthy();
      expect(getByText('New entry')).toBeTruthy();

      // the tags section should not be visible until a date is selected
      expect(queryByTestId('tags-layout')).toBeFalsy();
    });
  });

  describe('Edit', () => {
    it('displays existing entry information when editing an entry', () => {
      const { getByTestId, getByDisplayValue } = render(
        <TestWrapper>
          <DiaryEntry navigation={mockNav} />
        </TestWrapper>,
      );

      // assert the selected tags are displayed with an outline
      expect(getByTestId('tags-layout')).toBeTruthy();
      expect(getByTestId('html-button-outline')).toBeTruthy();
      expect(getByTestId('react-button-outline')).toBeTruthy();

      // assert the free text description is present
      expect(getByDisplayValue(/Some random description of a day/i)).toBeTruthy();
    });

    it('renders the diary entry screen for editing an entry', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <DiaryEntry navigation={mockNav} />
        </TestWrapper>,
      );

      expect(getByTestId('diary-entry-page')).toBeTruthy();
      expect(getByText('Edit entry'));
      expect(getByTestId('tags-layout')).toBeTruthy();
    });

    it('allows user to input free text into the description', () => {
      const { getByTestId, getByDisplayValue, debug } = render(
        <TestWrapper>
          <DiaryEntry navigation={mockNav} />
        </TestWrapper>,
      );

      fireEvent.changeText(getByTestId('free-text-input'), 'Hello free text');

      expect(getByDisplayValue('Hello free text')).toBeTruthy();
    });

    it('allows user to select tags', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <DiaryEntry navigation={mockNav} />
        </TestWrapper>,
      );

      fireEvent.press(getByTestId('html-button-ghost'));
      expect(getByTestId('html-button-outline')).toBeTruthy();
    });
  });
});
