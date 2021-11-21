import React from 'react';
import { BottomNavigation, BottomNavigationTab, Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import LogOutModal from '../../../components/LogOutModal';
import EntriesList from './EntriesList';
import { ScrollView } from 'react-native-gesture-handler';
const ListIcon = (props: unknown) => <Icon {...props} name="list-outline" />;
const ChartIcon = (props: unknown) => <Icon {...props} name="pie-chart-outline" />;
const LogOutIcon = (props: unknown) => <Icon {...props} name="log-out-outline" />;

const App: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const [modal, setModal] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderTab = (): JSX.Element => {
    switch (selectedIndex) {
      case 0:
        return <EntriesList />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <LogOutModal visible={modal} setVisibility={setModal} onBackdropPress={() => setModal(false)} />
        <Button
          appearance="ghost"
          accessoryLeft={LogOutIcon}
          size="giant"
          style={{ marginLeft: 'auto' }}
          onPress={() => setModal(true)}
        />

        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }} testID="home-page">
          {renderTab()}
        </ScrollView>
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
};

export default App;
