import * as React from 'react';
import { Box, Heading, Button, Switch, useContrastText } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';

const Landing: React.FunctionComponent = () => {
  const switchMapping = { light: true, dark: false };
  const tc = React.useContext(ThemeContext);
  const [isChecked, setIsChecked] = React.useState<boolean>(
    switchMapping[tc.colorScheme]
  );

  const toggleColor = () => {
    tc.setColorScheme(tc.colorScheme === 'light' ? 'dark' : 'light');
    setIsChecked(switchMapping[tc.colorScheme]);
  };

  const LandingBox = () => (
    <Box bgColor={tc.bgColorScheme} height='100%'>
      <Box
        flex={1}
        alignItems='center'
        justifyContent='center'
        bgColor='transparent'
      >
        <Switch size='lg' isChecked={isChecked} onToggle={toggleColor} />
        <Heading textAlign='center' color={tc.textColorScheme}>
          Welcome to one hundred days.
        </Heading>
        <Button
          size='lg'
          my='2'
          bgColor={tc.btnColorScheme}
          _text={{ color: useContrastText(tc.btnColorScheme) }}
        >
          LOG IN
        </Button>
        <Button
          size='lg'
          my='2'
          bgColor={tc.btnColorScheme}
          _text={{ color: useContrastText(tc.btnColorScheme) }}
        >
          REGISTER
        </Button>
      </Box>
    </Box>
  );

  React.useEffect(() => {
    setIsChecked(switchMapping[tc.colorScheme]);
  }, []);

  return <LandingBox />;
};

export default Landing;
