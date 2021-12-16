import * as React from 'react';
import { Button, Card, Text, useTheme, Layout } from '@ui-kitten/components';
import { TranslatedText } from '../../../../../components';
import { View } from 'react-native';
import { format } from 'date-fns';
import { models } from '../../../../../types';

interface ICardProps {
  entry: models.DiaryEntry;
  viewOnClick: (entry: models.DiaryEntry) => void;
}

const CardHeader = (props: { title: string }) => (
  <View style={{ height: 30, paddingLeft: 20, justifyContent: 'center' }}>
    <Text category="h6">{props.title}</Text>
  </View>
);

const EntryCard: React.FunctionComponent<ICardProps> = ({ entry, viewOnClick }: ICardProps) => {
  const theme = useTheme();
  const date = format(new Date(entry.date), 'dd MMM yyyy');
  const slimCard = !entry?.freeText;
  const ViewButton = (
    <Button style={{ width: 100, marginLeft: 'auto' }} size="small" onPress={() => viewOnClick(entry)}>
      <TranslatedText tKey="translation:screens.private.entries_list.buttons.view" />
    </Button>
  );

  return (
    <Card
      style={{
        flex: 1,
        marginBottom: 15,
        height: slimCard ? '100%' : 120,
        backgroundColor: theme['background-basic-color-2'],
        borderColor: theme['border-alternative-color-1'],
      }}
      header={slimCard ? undefined : <CardHeader title={date} />}
      testID={`entry-card${slimCard ? '-slim' : ''}`}
    >
      {slimCard ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text category="h6">{date}</Text>
          {ViewButton}
        </View>
      ) : (
        <>
          <Text style={{ marginBottom: 5 }} numberOfLines={1}>
            {entry?.freeText ? entry?.freeText : ''}
          </Text>
          {ViewButton}
        </>
      )}
    </Card>
  );
};

export default EntryCard;
