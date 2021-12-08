import * as React from 'react';
import { Button, Datepicker, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { AppNavigationProps, RootStackParamList } from '../../../../types/Navigation';
import { useForm, Controller } from 'react-hook-form';
import { TranslatedText } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { models, PermittedTags } from '../../../../types';
import { RouteProp, useRoute } from '@react-navigation/core';
import { tagIcons, toggleValueInList } from '../../../../utils';
import { createNewDiaryEntry, getSingleDiaryEntry, updateDiaryEntry } from '../../../../services/data';
import { useFirebase } from '../../../../providers';

const CheckmarkIcon = (props: unknown) => <Icon {...props} name="checkmark-outline" />;
const CloseIcon = (props: unknown) => <Icon {...props} name="close-outline" />;
const CalendarIcon = (props: unknown) => <Icon {...props} name="calendar" />;

type Props = {
  navigation: AppNavigationProps['diaryEntry'];
};

type FormData = Omit<models.DiaryEntry, 'createdAt' | 'lastUpdated'>;

const DiaryEntry: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { firebaseApp } = useFirebase();
  const {
    params: { sender: initialSender, entry },
  } = useRoute<RouteProp<RootStackParamList, 'diaryEntry'>>();

  const [tags, setTags] = React.useState<Array<string>>(entry?.tags || []);
  const [sender, setSender] = React.useState(initialSender);

  const defaultValues = (() => {
    if (!!entry) {
      const { date: rawDate, ...restOfEntry } = entry;
      const date = rawDate ? new Date(rawDate) : undefined;

      return { ...restOfEntry, date };
    } else {
      return {};
    }
  })();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const handleSave = () => {
    setValue('tags', tags);
    if (!getValues('freeText')) setValue('freeText', '');

    handleSubmit(async ({ id, ...rest }) => {
      if (id) {
        await updateDiaryEntry(firebaseApp, { id, ...rest });
      } else {
        await createNewDiaryEntry(firebaseApp, rest);
      }
      navigation.navigate('app');
    })();
  };

  const handleCancel = () => {
    navigation.navigate('app');
  };

  const checkForExisting = async (date: string) => {
    const actualDate = new Date(date);
    const existing = await getSingleDiaryEntry(firebaseApp, actualDate.toISOString());

    if (existing) {
      setTags(existing?.tags || []);
      setValue('freeText', existing?.freeText);
      setValue('id', existing?.id);
      setSender('edit');
    } else {
      setTags([]);
      setValue('freeText', '');
      setValue('id', '');
      setSender('create');
    }
  };

  return (
    <>
      <Layout style={{ paddingTop: '5%', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
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
            accessoryLeft={CheckmarkIcon}
            size="giant"
            style={{ marginRight: 'auto' }}
            onPress={handleSave}
          />
          <Button appearance="ghost" accessoryLeft={CloseIcon} size="giant" onPress={handleCancel} />
        </Layout>

        <ScrollView style={{ flex: 1, paddingHorizontal: 10, width: '90%', maxWidth: 500 }} testID="diary-entry-page">
          <TranslatedText
            category="h1"
            style={{ textAlign: 'center', marginBottom: '30%', marginTop: '10%' }}
            tKey={t(`translation:screens.private.diary_entry.page_heading_${sender}`)}
          />

          <Controller
            name="date"
            control={control}
            rules={{
              required: {
                value: true,
                message: t('translation:screens.private.diary_entry.fields.date.required_error'),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Datepicker
                testID="date-input"
                label={<TranslatedText tKey="translation:screens.private.diary_entry.fields.date.label" />}
                placeholder={<TranslatedText tKey="translation:screens.private.diary_entry.fields.date.placeholder" />}
                date={value}
                onSelect={(nextDate) => {
                  onChange(nextDate);
                  checkForExisting(nextDate);
                }}
                accessoryRight={CalendarIcon}
                status={errors.date ? 'danger' : undefined}
              />
            )}
          />
          {errors.date && (
            <Text category="s2" status="danger" style={{ alignSelf: 'flex-start' }}>
              {errors.date.message}
            </Text>
          )}

          {!!watch('date') && (
            <>
              <Controller
                name="freeText"
                control={control}
                rules={{ maxLength: 280 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    testID="free-text-input"
                    label={<TranslatedText tKey="translation:screens.private.diary_entry.fields.free_text.label" />}
                    placeholder={t('translation:screens.private.diary_entry.fields.free_text.placeholder')}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    size="medium"
                    status={errors.freeText ? 'danger' : undefined}
                    multiline={true}
                    maxLength={280}
                    style={{ marginTop: 20 }}
                    textAlignVertical="top"
                  />
                )}
              />
              {errors.freeText && (
                <Text category="s2" status="danger" style={{ alignSelf: 'flex-start' }}>
                  {errors.freeText.message}
                </Text>
              )}

              <TranslatedText
                category="h6"
                style={{ marginTop: 40, marginBottom: 20 }}
                tKey={t(`translation:screens.private.diary_entry.tags_section_header`, { count: tags.length })}
              />
              <Layout
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
                testID="tags-layout"
              >
                {Object.keys(tagIcons).map((tagKey) => {
                  const key = tagKey as PermittedTags;
                  const appearance = tags.includes(key) ? 'outline' : 'ghost';

                  return (
                    <Button
                      key={key}
                      size="large"
                      style={{
                        margin: 2,
                      }}
                      appearance={appearance}
                      onPress={() => setTags(toggleValueInList(key, tags))}
                      accessoryLeft={tagIcons[key].icon}
                      testID={`${key}-button-${appearance}`}
                    />
                  );
                })}
              </Layout>
              <Text category="p2" style={{ marginTop: 10 }}>
                {tags.map((tagKey) => tagIcons[tagKey as PermittedTags].label).join(', ')}
              </Text>
            </>
          )}
        </ScrollView>
      </Layout>
    </>
  );
};

export default DiaryEntry;
