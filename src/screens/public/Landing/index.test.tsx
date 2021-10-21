import React from 'react';
import Landing from './';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { navigation, TestWrapper } from '../../../__helpers__';
import { AppNavigationProps } from '../../../types/Navigation';

const mockNav = navigation<AppNavigationProps['landing']>();

describe('Screen - Landing', () => {
  afterEach(cleanup);

  it('renders landing screen with log in and register buttons', () => {
    const { getByText } = render(
      <TestWrapper>
        <Landing navigation={mockNav} />
      </TestWrapper>,
    );

    expect(getByText('LOG IN')).toBeTruthy();
    expect(getByText('REGISTER')).toBeTruthy();
  });

  it('clicking the log in button fires the correct navigation event', () => {
    const { getByText } = render(
      <TestWrapper>
        <Landing navigation={mockNav} />
      </TestWrapper>,
    );

    const logInButton = getByText('LOG IN');
    fireEvent.press(logInButton);

    expect(mockNav.navigate).toHaveBeenCalledWith('signIn');
  });

  it('clicking the register button fires the correct navigation event', () => {
    const { getByText } = render(
      <TestWrapper>
        <Landing navigation={mockNav} />
      </TestWrapper>,
    );

    const registerButton = getByText('REGISTER');
    fireEvent.press(registerButton);

    expect(mockNav.navigate).toHaveBeenCalledWith('register');
  });
});
