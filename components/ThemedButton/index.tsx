import * as React from 'react';
import { Button, useContrastText } from 'native-base';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';
import { IThemeContext } from '../../types/ThemeContext';
import { IButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types';

interface IThemedButtonProps extends IButtonProps {
  size?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg'>;
  themeContext: IThemeContext;
  children: string;
}

const ThemedButton: React.FunctionComponent<IThemedButtonProps> = ({
  size = 'lg',
  themeContext,
  children,
  ...other
}: IThemedButtonProps) => {
  return (
    <Button
      size={size}
      minW="150px"
      maxW="200px"
      my="4"
      bgColor={themeContext.btnColorScheme}
      _text={{ color: useContrastText(themeContext.btnColorScheme) }}
      {...other}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;
