import React from 'react';
import { render, fireEvent, cleanup, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native';
import { NativeBaseWrapper } from '../../../utils/testHelpers';
import SignIn from './';
import { AuthProvider } from '../../../providers';
import { initiateTranslations } from '../../../providers';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: () => null,
}));

initiateTranslations();

describe('Screen - Sign In', () => {
  afterEach(cleanup);

  it('allows user to sign in when valid inputs are provided', async () => {
    const { getByTestId, getByLabelText, getByText } = render(
      <AuthProvider>
        <NativeBaseWrapper>
          <SignIn />
        </NativeBaseWrapper>
      </AuthProvider>,
    );

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByTestId('sign-in-button');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'someemail@nevergoingtoexistever.ahhno');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');

    // submit form
    fireEvent(signInButton, 'press');

    await waitForElementToBeRemoved(() => getByLabelText('loading'));

    expect(getByText('You are now signed in to the app')).toBeTruthy;
  });

  it('prevents user signing in with a non existent account', async () => {
    const { getByTestId, getByLabelText, getByText, debug } = render(
      <AuthProvider>
        <NativeBaseWrapper>
          <SignIn />
        </NativeBaseWrapper>
      </AuthProvider>,
    );

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByTestId('sign-in-button');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'baduser@email.com');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');

    // submit form
    fireEvent(signInButton, 'press');

    await waitFor(() => getByTestId('error-toast'));
  });

  it('prevents user from submitting form when an invalid email is provided', () => {
    const { getByText, getByTestId, getByLabelText } = render(
      <AuthProvider>
        <NativeBaseWrapper>
          <SignIn />
        </NativeBaseWrapper>
      </AuthProvider>,
    );

    // populate all fields
    fireEvent(getByLabelText('Email'), 'onChangeText', 'someemailnevergoingtoexistever.ahhno');

    // submit form
    fireEvent(getByTestId('sign-in-button'), 'press');

    expect(getByText('Email format invalid')).toBeTruthy();
  });
});
