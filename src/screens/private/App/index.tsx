import React from 'react';
import { BottomNavigation, BottomNavigationTab, Button, Card, Icon, Layout, Modal, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { SpinningLoader, TranslatedText } from '../../../components';
import { useAuth } from '../../../providers';
import LogOutModal from '../../../components/LogOutModal';

const ListIcon = (props: unknown) => <Icon {...props} name="list-outline" />;
const ChartIcon = (props: unknown) => <Icon {...props} name="pie-chart-outline" />;
const LogOutIcon = (props: unknown) => <Icon {...props} name="log-out-outline" />;

const App: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <LogOutModal visible={modal} setVisibility={setModal} />
        <Button
          appearance="ghost"
          accessoryLeft={LogOutIcon}
          size="giant"
          style={{ marginLeft: 'auto' }}
          onPress={() => setModal(true)}
        />

        <Layout style={{ flex: 1, backgroundColor: 'red' }} testID="home-page"></Layout>
      </Layout>
      <BottomNavigation selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
        <BottomNavigationTab title={t('translation:screens.private.app.bottom_nav.list').toString()} icon={ListIcon} />
        <BottomNavigationTab
          title={t('translation:screens.private.app.bottom_nav.stats').toString()}
          icon={ChartIcon}
        />
      </BottomNavigation>
    </>
  );

  // return (
  // <Layout
  //   style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }}
  //   testID="home-page"
  // >
  //     <Button onPress={handleSignOut} size="large" appearance="outline" disabled={isSigningOut} style={{ width: 150 }}>
  //       {isSigningOut ? (
  //         <SpinningLoader />
  //       ) : (
  //         <TranslatedText tKey={t('translation:screens.private.unverified.buttons.sign_out')} />
  //       )}
  //     </Button>
  //   </Layout>
  // );
};

export default App;
