import * as React from 'react';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { useFirebase } from '../../../../providers';
import { getDiaryEntries } from '../../../../services/data';
import { models, PermittedTags } from '../../../../types';
import { subHours } from 'date-fns';
import { PieChart, ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { tagDetails } from '../../../../utils';
import { TranslatedText } from '../../../../components';

interface IStatsProps {
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
}

type FreqArray = Array<{
  name: string;
  count: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}>;

const Stats: React.FunctionComponent<IStatsProps> = ({ refreshing, setRefreshing }: IStatsProps) => {
  const theme = useTheme();
  const { firebaseApp } = useFirebase();
  const [loading, setLoading] = React.useState(true);
  const [entries, setEntries] = React.useState<models.Diary['entries']>([]);
  const tMinusNinety = new Date(subHours(new Date().setHours(0, 0, 0, 0), 24 * 100));

  const contributionChartValues = (entries: models.Diary['entries']) => {
    const values = [];
    for (let index = 0; index < 100; index++) {
      const date = new Date(subHours(new Date().setHours(0, 0, 0, 0), 24 * (index + 1)));
      const entry = entries?.find((entry) => {
        return date.toISOString().slice(0, 10) === entry.date.slice(0, 10);
      });

      if (entry) values.push({ date: entry.date.slice(0, 10), count: (entry?.tags?.length || 0) + 1 });
      else values.push({ date: date.toISOString().slice(0, 10), count: 0 });
    }

    return values;
  };

  const pieChartValues = (entries: models.Diary['entries']): FreqArray => {
    let combinedTechnologies: Array<string> = [];
    const colours = [
      'color-primary-200',
      'color-success-300',
      'color-info-600',
      'color-warning-400',
      'color-danger-400',
    ];

    // combine all tag arrays
    entries?.forEach((entry) => {
      if (entry?.tags && entry?.tags?.length > 0) combinedTechnologies = [...combinedTechnologies, ...entry.tags];
    });

    // get the frequency of each
    const frequency: Array<{ key: string; count: number }> = [];
    for (let i = 0, j = combinedTechnologies.length; i < j; i++) {
      const index = frequency.map((item) => item.key).indexOf(combinedTechnologies[i]);

      if (index >= 0) frequency[index].count = frequency[index].count + 1;
      else frequency.push({ key: combinedTechnologies[i], count: 1 });
    }

    // order descending
    frequency.sort((a, b) => {
      return a.count > b.count ? -1 : 1;
    });

    // if there are too many technologies, we just summarise the top n and group the rest as other
    const limit = 3;
    const other =
      frequency.length > limit
        ? frequency.slice(limit, frequency.length).reduce(
            (prev, curr) => {
              return { ...prev, count: prev.count + curr.count };
            },
            { key: 'other', count: 0 } as { key: string; count: number },
          )
        : false;
    if (frequency.length > limit) frequency.splice(limit);
    if (other !== false) frequency.push(other);

    const frequencyData = frequency.map(({ key, count }, idx) => {
      const { label } = key === 'other' ? { label: 'Other' } : tagDetails[key as PermittedTags];

      return {
        name: label,
        count,
        color: theme[colours[idx]],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
    });

    return frequencyData;
  };

  const getEntries = async () => {
    setLoading(true);
    const entries = await getDiaryEntries(firebaseApp, {
      fieldPath: 'date',
      opStr: '>',
      value: tMinusNinety.toISOString(),
    });
    entries && setEntries(entries);
    setLoading(false);
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
    <Layout style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {entries && entries?.length ? (
        <>
          <TranslatedText
            tKey="translation:screens.private.stats.contribution_graph"
            category="h3"
            style={{ marginBottom: 15 }}
          />
          <ContributionGraph
            tooltipDataAttrs={() => null as any}
            values={contributionChartValues(entries)}
            endDate={new Date()}
            numDays={100}
            width={Dimensions.get('window').width * 0.9}
            height={220}
            squareSize={Dimensions.get('window').width * 0.05}
            chartConfig={{
              backgroundGradientFrom: theme['color-primary-100'],
              backgroundGradientTo: theme['color-primary-200'],
              color: (opacity = 1) => theme['color-primary-transparent-600'].replace('0.48', opacity.toString()),
              style: {
                borderRadius: 16,
              },
            }}
          />

          <TranslatedText tKey="translation:screens.private.stats.pie_chart" category="h3" style={{ marginTop: 20 }} />
          <PieChart
            data={pieChartValues(entries)}
            width={Dimensions.get('window').width * 0.9}
            height={220}
            chartConfig={{
              color: (opacity = 1) => theme['color-primary-transparent-600'].replace('0.48', opacity.toString()),
            }}
            accessor={'count'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            absolute
          />
        </>
      ) : (
        !loading && <TranslatedText tKey="translation:screens.private.stats.no_entries" />
      )}
    </Layout>
  );
};

export default Stats;
