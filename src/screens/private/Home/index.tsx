import * as React from 'react';
import { Box, Text } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';

const Home: React.FunctionComponent = () => {
  const tc = React.useContext(ThemeContext);

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bgColor={tc.bgColorScheme} px="20px">
      <Text>Some authenticated page</Text>
    </Box>
  );
};

export default Home;
