import * as React from 'react';
import { Button, Card, Text, useTheme } from '@ui-kitten/components';
import { format } from 'date-fns';
import { useFirebase } from '../../../../providers';
import { getDiaryEntries } from '../../../../services/data';
import { models } from '../../../../types';
import { View } from 'react-native';

interface IEntriesListProps {} // TODO

const CardHeader = (props: { title: string }) => (
  <View style={{ height: 30, paddingLeft: 20, justifyContent: 'center' }}>
    <Text category="h6">{props.title}</Text>
  </View>
);

const EntriesList: React.FunctionComponent<IEntriesListProps> = ({}: IEntriesListProps) => {
  const { firebaseApp } = useFirebase();
  const [entries, setEntries] = React.useState<models.Diary['entries']>([]);
  const theme = useTheme();

  React.useEffect(() => {
    const getEntries = async () => {
      const entries = await getDiaryEntries(firebaseApp);
      entries && setEntries(entries);
    };

    getEntries();
  }, []);

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
            header={<CardHeader title={format(new Date(entry.date), 'eee - dd MMM yyyy')} />}
          >
            <Text numberOfLines={1}>{entry?.freeText ? entry?.freeText : ''}</Text>
            {/* TODO text to i18n */}
            <Button style={{ width: 100, marginTop: 5, marginLeft: 'auto' }} size="small">
              VIEW
            </Button>
          </Card>
        );
      })}
    </>
  );
};

export default EntriesList;
