import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, Button } from '@ui-kitten/components';
import { RootStackParamList } from '../../types/Navigation';

const HomeButton = (props: unknown) => <Icon {...props} name="home-outline" />;

export const headerOptions = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
}) => ({
  title: '',
  headerLeft: () => (
    <Button
      appearance="ghost"
      accessoryLeft={HomeButton}
      size="medium"
      onPress={() => navigation.navigate('landing')}
    />
  ),
});
