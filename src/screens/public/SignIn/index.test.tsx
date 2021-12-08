import React from 'react';
import SignIn from './';
import { render, fireEvent, cleanup, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native';
import { AuthProvider } from '../../../providers';
import { TestWrapper, navigation } from '../../../__helpers__';
import { AppNavigationProps } from '../../../types/Navigation';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: () => null,
}));

const mockNav = navigation<AppNavigationProps['signIn']>();

describe('Screen - Sign In', () => {
  afterEach(cleanup);

  it('allows user to sign in when valid inputs are provided', async () => {
    const { getByTestId, queryByTestId, getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <TestWrapper>
          <SignIn navigation={mockNav} />
        </TestWrapper>
      </AuthProvider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('LOG IN');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'someemail@nevergoingtoexistever.ahhno');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');

    // submit form
    fireEvent(signInButton, 'press');

    await waitForElementToBeRemoved(() => getByTestId('spinning-loader'));

    // no error should not appear and an attempt to navigate to the app page should be made
    expect(queryByTestId('page-error-card')).toBeFalsy();
    expect(mockNav.navigate).toHaveBeenCalledWith('unverified');
  });

  it('prevents user signing in with a non existent account', async () => {
    const { getByTestId, getByPlaceholderText, getByText, debug } = render(
      <AuthProvider>
        <TestWrapper>
          <SignIn navigation={mockNav} />
        </TestWrapper>
      </AuthProvider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('LOG IN');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'baduser@email.com');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');

    // submit form
    fireEvent(signInButton, 'press');

    await waitFor(() => getByTestId('page-error-card'));
  });

  it('prevents user from submitting form when an invalid email is provided', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <TestWrapper>
          <SignIn navigation={mockNav} />
        </TestWrapper>
      </AuthProvider>,
    );

    // populate all fields
    fireEvent(getByPlaceholderText('Email'), 'onChangeText', 'someemailnevergoingtoexistever.ahhno');

    // submit form
    fireEvent(getByText('LOG IN'), 'press');

    expect(getByText('Email format invalid')).toBeTruthy();
  });
});
