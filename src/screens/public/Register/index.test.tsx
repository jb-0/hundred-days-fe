import React from 'react';
import { render, fireEvent, cleanup, waitForElementToBeRemoved } from '@testing-library/react-native';
import Register from './';
import { AuthProvider } from '../../../providers';
import { navigation, TestWrapper } from '../../../__helpers__';
import { AppNavigationProps } from '../../../types/Navigation';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const mockNav = navigation<AppNavigationProps['register']>();

describe('Screen - Register', () => {
  afterEach(cleanup);

  it('allows user to submit form when valid inputs are provided', async () => {
    const { getByTestId, getByText, queryByTestId, getByPlaceholderText } = render(
      <AuthProvider>
        <TestWrapper>
          <Register navigation={mockNav} />
        </TestWrapper>
      </AuthProvider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const passwordConfInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('REGISTER');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'someemail@nevergoingtoexistever.ahhno');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');
    fireEvent(passwordConfInput, 'onChangeText', 'testPassword');

    // submit form
    fireEvent(registerButton, 'press');

    await waitForElementToBeRemoved(() => getByTestId('spinning-loader'));

    // no error should not appear and an attempt to navigate to the app page should be made
    expect(queryByTestId('page-error-card')).toBeFalsy();
    expect(mockNav.navigate).toHaveBeenCalledWith('unverified');
  });

  it('prevents user from submitting form when an invalid email is provided', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <TestWrapper>
          <Register navigation={mockNav} />
        </TestWrapper>
      </AuthProvider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const passwordConfInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('REGISTER');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'someemailnevergoingtoexistever.ahhno');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');
    fireEvent(passwordConfInput, 'onChangeText', 'testPassword');

    // submit form
    fireEvent(registerButton, 'press');

    expect(getByText('Email format invalid')).toBeTruthy();
  });

  it('prevents user from submitting form when passwords do not match', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <TestWrapper>
          <Register navigation={mockNav} />
        </TestWrapper>
      </AuthProvider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const passwordConfInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('REGISTER');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'someemail@nevergoingtoexistever.ahhno');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');
    fireEvent(passwordConfInput, 'onChangeText', 'completelyDiff');

    // submit form
    fireEvent(registerButton, 'press');

    expect(getByText('Passwords do not match')).toBeTruthy();
  });

  it('prevents user from submitting form when passwords does not meet minimum criteria', () => {
    const { getByText, getByTestId, getByLabelText, getByPlaceholderText } = render(
      <AuthProvider>
        <TestWrapper>
          <Register navigation={mockNav} />
        </TestWrapper>
      </AuthProvider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const passwordConfInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('REGISTER');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'someemail@nevergoingtoexistever.ahhno');
    fireEvent(passwordInput, 'onChangeText', 'short');
    fireEvent(passwordConfInput, 'onChangeText', 'short');

    // submit form
    fireEvent(registerButton, 'press');

    expect(getByText('Passwords must be at least 8 characters')).toBeTruthy();
  });
});
