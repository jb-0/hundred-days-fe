import React from 'react';
import { BottomNavigation, BottomNavigationTab, Button, Icon, Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import LogOutModal from '../../../components/LogOutModal';
import EntriesList from './EntriesList';
import { AppNavigationProps } from '../../../types/Navigation';
import { RefreshControl, ScrollView } from 'react-native';
import { models } from '../../../types';
import Stats from './Stats';
const ListIcon = (props: unknown) => <Icon {...props} name="list-outline" />;
const ChartIcon = (props: unknown) => <Icon {...props} name="pie-chart-outline" />;
const LogOutIcon = (props: unknown) => <Icon {...props} name="log-out-outline" />;
const PlusIcon = (props: unknown) => <Icon {...props} name="plus-outline" />;

type Props = {
  navigation: AppNavigationProps['app'];
};

const App: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderTab = (): JSX.Element => {
    switch (selectedIndex) {
      case 0:
        return (
          <EntriesList
            refreshing={refreshing}
            setRefreshing={(value: boolean) => setRefreshing(value)}
            viewOnClick={(entry: models.DiaryEntry) => navigation.navigate('diaryEntry', { sender: 'edit', entry })}
          />
        );
      default:
        return <Stats refreshing={refreshing} setRefreshing={(value: boolean) => setRefreshing(value)} />;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <>
      <Layout style={{ paddingTop: '5%', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <LogOutModal visible={modal} setVisibility={setModal} onBackdropPress={() => setModal(false)} />

        <Layout
          style={{
            width: '100%',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            appearance="ghost"
            accessoryLeft={PlusIcon}
            size="giant"
            style={{ marginRight: 'auto' }}
            onPress={() => navigation.navigate('diaryEntry', { sender: 'create' })}
            testID="create-button"
          />
          <Button
            appearance="ghost"
            accessoryLeft={LogOutIcon}
            size="giant"
            onPress={() => setModal(true)}
            testID="log-out-button"
          />
        </Layout>

        <ScrollView
          style={{ flex: 1, paddingHorizontal: 10, width: '100%' }}
          testID="app-page"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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
