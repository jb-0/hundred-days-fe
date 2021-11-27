import * as React from 'react';
import { Button, Card, Text, useTheme } from '@ui-kitten/components';
import { format } from 'date-fns';
import { useFirebase } from '../../../../providers';
import { getDiaryEntries } from '../../../../services/data';
import { models } from '../../../../types';
import { View } from 'react-native';
import { TranslatedText } from '../../../../components';

interface IEntriesList {
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
  viewOnClick: (entry: models.DiaryEntry) => void;
}

const CardHeader = (props: { title: string }) => (
  <View style={{ height: 30, paddingLeft: 20, justifyContent: 'center' }}>
    <Text category="h6">{props.title}</Text>
  </View>
);

const EntriesList: React.FunctionComponent<IEntriesList> = ({
  refreshing,
  setRefreshing,
  viewOnClick,
}: IEntriesList) => {
  const { firebaseApp } = useFirebase();
  const [entries, setEntries] = React.useState<models.Diary['entries']>([]);
  const theme = useTheme();

  const getEntries = async () => {
    const entries = await getDiaryEntries(firebaseApp);
    entries && setEntries(entries);
  };

  React.useEffect(() => {
    getEntries();
  }, []);

  React.useEffect(() => {
    if (refreshing) {
      (async () => {
        await getEntries();
        setRefreshing(false);
      })();
    }
  }, [refreshing]);

  return (
    <>
      {entries?.map((entry, idx) => {
        return (
          <Card
            key={`${idx}_${entry.date}`}
            style={{
              flex: 1,
              marginBottom: 15,
              height: 120,
              backgroundColor: theme['background-basic-color-2'],
              borderColor: theme['border-alternative-color-1'],
            }}
            header={<CardHeader title={format(new Date(entry.date), 'dd MMM yyyy')} />}
          >
            <Text numberOfLines={1}>{entry?.freeText ? entry?.freeText : ''}</Text>
            <Button
              style={{ width: 100, marginTop: 5, marginLeft: 'auto' }}
              size="small"
              onPress={() => viewOnClick(entry)}
            >
              <TranslatedText tKey="translation:screens.private.entries_list.buttons.view" />
            </Button>
          </Card>
        );
      })}
    </>
  );
};

export default EntriesList;
