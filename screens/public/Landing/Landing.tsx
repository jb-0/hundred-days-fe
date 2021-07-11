import * as React from 'react';
import { Box, Heading, Button, Switch, useContrastText } from 'native-base';
import { QuestionIcon } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';

const Landing: React.FunctionComponent = () => {
  const switchMapping = { light: true, dark: false };
  const tc = React.useContext(ThemeContext);
  const [isChecked, setIsChecked] = React.useState<boolean>(switchMapping[tc.colorScheme]);

  const toggleColor = () => {
    tc.setColorScheme(tc.colorScheme === 'light' ? 'dark' : 'light');
    setIsChecked(switchMapping[tc.colorScheme]);
  };

  const LandingBox = () => (
    <Box flex={1} alignItems="center" justifyContent="flex-start" bgColor={tc.bgColorScheme}>
      <Box
        flex={0.1}
        justifyContent="space-between"
        alignItems="center"
        bgColor="transparent"
        flexDirection="row"
        flexWrap="nowrap"
        width="100%"
        px="20px"
      >
        <QuestionIcon color={tc.btnColorScheme} />
        <Switch
          size="lg"
          isChecked={isChecked}
          onToggle={toggleColor}
          offTrackColor="warmGray.800"
          offThumbColor="warmGray.600"
          onTrackColor="warmGray.200"
          onThumbColor="warmGray.600"
        />
      </Box>
      <Box flex={0.8} alignSelf="flex-start" justifyContent="center" alignItems="center" bgColor="transparent">
        <Heading textAlign="center" color={tc.textColorScheme} my="4">
          Welcome to one hundred days
        </Heading>
        <Button
          size="lg"
          w="200px"
          my="4"
          bgColor={tc.btnColorScheme}
          _text={{ color: useContrastText(tc.btnColorScheme) }}
        >
          LOG IN
        </Button>
        <Button
          size="lg"
          w="200px"
          my="4"
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
