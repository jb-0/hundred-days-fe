import * as React from 'react';
import { AppNavigationProps } from '../../../types/Navigation';
import { useTranslation } from 'react-i18next';
import { Layout, Icon, Button } from '@ui-kitten/components';
import TranslatedText from '../../../components/TranslatedText';

type Props = {
  navigation: AppNavigationProps['landing'];
};

const HelpIcon = (props: unknown) => <Icon {...props} name="question-mark-circle-outline" />;

const Landing: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const { t } = useTranslation();

  return (
    <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <Layout
        style={{
          flex: 0.1,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'nowrap',
          width: '100%',
        }}
      >
        <Button appearance="ghost" accessoryLeft={HelpIcon} size="giant" />
      </Layout>
      <Layout
        style={{
          flex: 0.8,
          alignSelf: 'flex-start',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TranslatedText
          category="h1"
          style={{ textAlign: 'center', marginBottom: '30%', marginTop: '10%' }}
          tKey={t('translation:screens.public.landing.welcome_message')}
        />
        <Button
          onPress={() => navigation.navigate('signIn')}
          style={{ marginBottom: 20 }}
          size="large"
          appearance="outline"
        >
          <TranslatedText tKey={t('translation:screens.public.landing.buttons.sign_in')} />
        </Button>
        <Button onPress={() => navigation.navigate('register')} size="large" appearance="outline">
          <TranslatedText tKey={t('translation:screens.public.landing.buttons.register')} />
        </Button>
      </Layout>
    </Layout>
  );
};

export default Landing;
