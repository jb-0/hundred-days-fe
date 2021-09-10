import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { AppNavigationProps } from '../../../types/Navigation';
import { NativeBaseWrapper, mockNavigation } from '../../../utils/testHelpers';
import Landing from './';

describe('Screen - Landing', () => {
  afterEach(cleanup);

  it('renders landing screen with log in and register buttons', () => {
    const { getAllByA11yRole, getByText } = render(
      <NativeBaseWrapper>
        <Landing navigation={{} as AppNavigationProps['landing']} />
      </NativeBaseWrapper>,
    );

    const buttons = getAllByA11yRole('button');

    expect(buttons.length).toBe(2);
    expect(getByText('LOG IN')).toBeTruthy();
    expect(getByText('REGISTER')).toBeTruthy();
  });

  it('clicking the log in button fires the correct navigation event', () => {
    const { getByText } = render(
      <NativeBaseWrapper>
        <Landing navigation={{ ...mockNavigation } as any} />
      </NativeBaseWrapper>,
    );

    const logInButton = getByText('LOG IN');
    fireEvent.press(logInButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('signIn');
  });

  it('clicking the register button fires the correct navigation event', () => {
    const { getByText } = render(
      <NativeBaseWrapper>
        <Landing navigation={{ ...mockNavigation } as any} />
      </NativeBaseWrapper>,
    );

    const registerButton = getByText('REGISTER');
    fireEvent.press(registerButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('register');
  });
});
