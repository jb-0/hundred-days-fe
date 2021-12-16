import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SpinningLoader, TranslatedText } from '../../../components';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useAuth } from '../../../providers';

interface IUnverifiedProps {}

const Unverified: React.FunctionComponent<IUnverifiedProps> = ({}: IUnverifiedProps) => {
  const { t } = useTranslation();
  const { currentUser, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: '10%',
      }}
    >
      <Layout>
        <TranslatedText
          category="h1"
          tKey={t('translation:screens.private.unverified.page_heading')}
          style={{ marginBottom: 10, textAlign: 'center' }}
        />
        <TranslatedText
          category="p1"
          tKey={t('translation:screens.private.unverified.message')}
          style={{ marginBottom: 10, textAlign: 'center' }}
        />
        <Text style={{ textAlign: 'center' }}>{currentUser?.email || ''}</Text>
      </Layout>
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

export default Unverified;
