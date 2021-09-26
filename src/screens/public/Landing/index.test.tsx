import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { AppNavigationProps } from '../../../types/Navigation';
import { NativeBaseWrapper } from '../../../utils/testHelpers';
import Landing from './';
import { initiateTranslations } from '../../../providers';

const navigation = {
  navigate: jest.fn(),
} as unknown as AppNavigationProps['landing'];

initiateTranslations();

describe('Screen - Landing', () => {
  afterEach(cleanup);

  it('renders landing screen with log in and register buttons', () => {
    const { getAllByA11yRole, getByText } = render(
      <NativeBaseWrapper>
        <Landing navigation={navigation} />
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
        <Landing navigation={navigation} />
      </NativeBaseWrapper>,
    );

    const logInButton = getByText('LOG IN');
    fireEvent.press(logInButton);

    expect(navigation.navigate).toHaveBeenCalledWith('signIn');
  });

  it('clicking the register button fires the correct navigation event', () => {
    const { getByText } = render(
      <NativeBaseWrapper>
        <Landing navigation={navigation} />
      </NativeBaseWrapper>,
    );

    const registerButton = getByText('REGISTER');
    fireEvent.press(registerButton);

    expect(navigation.navigate).toHaveBeenCalledWith('register');
  });
});
