import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react-native';
import { NativeBaseWrapper } from '../../../utils/testHelpers';
import Register from './';
import { AuthProvider } from '../../../providers';
import { initiateTranslations } from '../../../providers';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

initiateTranslations();

describe('Screen - Register', () => {
  afterEach(cleanup);

  it('allows user to submit form when valid inputs are provided', async () => {
    const { getByTestId, getByLabelText, debug } = render(
      <AuthProvider>
        <NativeBaseWrapper>
          <Register />
        </NativeBaseWrapper>
      </AuthProvider>,
    );

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const passwordConfInput = getByLabelText('Confirm Password');
    const registerButton = getByTestId('register-button');

    // populate all fields
    fireEvent(emailInput, 'onChangeText', 'someemail@nevergoingtoexistever.ahhno');
    fireEvent(passwordInput, 'onChangeText', 'testPassword');
    fireEvent(passwordConfInput, 'onChangeText', 'testPassword');

    // submit form
    fireEvent(registerButton, 'press');

    await waitFor(() => getByTestId('success-toast'));
  });

  it('prevents user from submitting form when an invalid email is provided', () => {
    const { getByText, getByTestId, getByLabelText } = render(
      <AuthProvider>
        <NativeBaseWrapper>
          <Register />
        </NativeBaseWrapper>
      </AuthProvider>,
    );

    // populate all fields
    fireEvent(getByLabelText('Email'), 'onChangeText', 'someemailnevergoingtoexistever.ahhno');
    fireEvent(getByLabelText('Password'), 'onChangeText', 'testPassword');
    fireEvent(getByLabelText('Confirm Password'), 'onChangeText', 'testPassword');

    // submit form
    fireEvent(getByTestId('register-button'), 'press');

    expect(getByText('Email format invalid')).toBeTruthy();
  });

  it('prevents user from submitting form when passwords do not match', () => {
    const { getByText, getByTestId, getByLabelText } = render(
      <AuthProvider>
        <NativeBaseWrapper>
          <Register />
        </NativeBaseWrapper>
      </AuthProvider>,
    );

    // populate all fields
    fireEvent(getByLabelText('Email'), 'onChangeText', 'someemailnevergoingtoexistever.ahhno');
    fireEvent(getByLabelText('Password'), 'onChangeText', 'testPassword');
    fireEvent(getByLabelText('Confirm Password'), 'onChangeText', 'completelyDiff');

    // submit form
    fireEvent(getByTestId('register-button'), 'press');

    expect(getByText('Passwords do not match')).toBeTruthy();
  });

  it('prevents user from submitting form when passwords does not meet minimum criteria', () => {
    const { getByText, getByTestId, getByLabelText } = render(
      <AuthProvider>
        <NativeBaseWrapper>
          <Register />
        </NativeBaseWrapper>
      </AuthProvider>,
    );

    // populate all fields
    fireEvent(getByLabelText('Email'), 'onChangeText', 'someemailnevergoingtoexistever.ahhno');
    fireEvent(getByLabelText('Password'), 'onChangeText', 'short');
    fireEvent(getByLabelText('Confirm Password'), 'onChangeText', 'short');

    // submit form
    fireEvent(getByTestId('register-button'), 'press');

    expect(getByText('Passwords must be at least 8 characters')).toBeTruthy();
  });
});
