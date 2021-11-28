import * as React from 'react';
import { useFirebase } from '../../../../providers';
import { getDiaryEntries } from '../../../../services/data';
import { models } from '../../../../types';
import EntryCard from './EntryCard';

interface IEntriesList {
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
  viewOnClick: (entry: models.DiaryEntry) => void;
}

const EntriesList: React.FunctionComponent<IEntriesList> = ({
  refreshing,
  setRefreshing,
  viewOnClick,
}: IEntriesList) => {
  const { firebaseApp } = useFirebase();
  const [entries, setEntries] = React.useState<models.Diary['entries']>([]);

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
      {entries?.map((entry) => {
        return (
          <EntryCard key={entry.id} entry={entry} viewOnClick={(entry: models.DiaryEntry) => viewOnClick(entry)} />
        );
      })}
    </>
  );
};

export default EntriesList;
