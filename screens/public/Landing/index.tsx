import * as React from 'react';
import { Box, Heading, Switch } from 'native-base';
import { QuestionIcon } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';
import { AppNavigationProps } from '../../../types/Navigation';
import ThemedButton from '../../../components/ThemedButton';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: AppNavigationProps['landing'];
};

const Landing: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const switchMapping = { light: true, dark: false };
  const tc = React.useContext(ThemeContext);
  const [isChecked, setIsChecked] = React.useState<boolean>(switchMapping[tc.colorScheme]);

  const toggleColor = () => {
    tc.setColorScheme(tc.colorScheme === 'light' ? 'dark' : 'light');
    setIsChecked(switchMapping[tc.colorScheme]);
  };

  React.useEffect(() => {
    setIsChecked(switchMapping[tc.colorScheme]);
  }, []);

  return (
    <Box flex={1} alignItems="center" justifyContent="flex-start" bgColor={tc.bgColorScheme} px="20px">
      <Box
        flex={0.1}
        justifyContent="space-between"
        alignItems="center"
        bgColor="transparent"
        flexDirection="row"
        flexWrap="nowrap"
        width="100%"
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
          {t('translation:screens.public.landing.welcome_message')}
        </Heading>
        <ThemedButton onPress={() => navigation.navigate('signIn')} themeContext={tc}>
          {t('translation:screens.public.landing.buttons.sign_in')}
        </ThemedButton>
        <ThemedButton onPress={() => navigation.navigate('register')} themeContext={tc}>
          {t('translation:screens.public.landing.buttons.register')}
        </ThemedButton>
      </Box>
    </Box>
  );
};

export default Landing;
