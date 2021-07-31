import * as React from 'react';
import { Box, Heading, VStack, FormControl, Input } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';
import ThemedButton from '../../../components/ThemedButton';

const SignIn: React.FunctionComponent = () => {
  const tc = React.useContext(ThemeContext);

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bgColor={tc.bgColorScheme} px="20px">
      <Heading color={tc.textColorScheme}>Sign in</Heading>
      <VStack space={2} mt={5}>
        <FormControl>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>Email</FormControl.Label>
          <Input w="300px" _focus={{ borderColor: tc.textColorScheme }} color={tc.textColorScheme} />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>Password</FormControl.Label>
          <Input w="300px" type="password" _focus={{ borderColor: tc.textColorScheme }} color={tc.textColorScheme} />
        </FormControl>
        <VStack space={2} justifyContent="center" alignItems="center">
          <ThemedButton themeContext={tc}>SIGN IN</ThemedButton>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SignIn;
