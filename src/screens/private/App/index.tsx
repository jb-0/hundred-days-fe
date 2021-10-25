import React from 'react';
import { Button, Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { SpinningLoader, TranslatedText } from '../../../components';
import { useAuth } from '../../../providers';

const App: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  return (
    <Layout
      style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }}
      testID="home-page"
    >
      <Button onPress={handleSignOut} size="large" appearance="outline" disabled={isSigningOut} style={{ width: 150 }}>
        {isSigningOut ? (
          <SpinningLoader />
        ) : (
          <TranslatedText tKey={t('translation:screens.private.unverified.buttons.sign_out')} />
        )}
      </Button>
    </Layout>
  );
};

export default App;
