import * as React from 'react';
import { Box, Heading, VStack, FormControl, Input, useToast } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';
import ThemedButton from '../../../components/ThemedButton';
import { useAuth } from '../../../providers';
import { SignInFormData, FormItem } from '../../../types/Forms/SignIn';
import { VALID_EMAIL_RE } from '../../../utils';

const defaultFormItem: FormItem = { value: '', errMsg: '' };

const SignIn: React.FunctionComponent = () => {
  const tc = React.useContext(ThemeContext);
  const toast = useToast();
  const { signIn } = useAuth();
  const [isAttemptingSignIn, setIsAttemptingSignIn] = React.useState(false);

  // assign form to state
  const [formData, setFormData] = React.useState<SignInFormData>({ email: defaultFormItem, pw: defaultFormItem });

  // destructure values to make things a bit more readable
  const {
    email: { value: email, errMsg: emailErr },
    pw: { value: pw, errMsg: pwErr },
  } = formData;

  // set state whenever an input changes
  const handleFormChange = (key: keyof SignInFormData, value: string) => {
    setFormData((prev: SignInFormData) => {
      return { ...prev, [key]: { value, errMsg: prev[key].errMsg } };
    });
  };

  // valid the submission displaying errors as required, if valid submit to cognito
  const handleSubmit = async () => {
    setIsAttemptingSignIn(true);
    const emailIsValid = VALID_EMAIL_RE.test(String(email).toLowerCase());

    if (!emailIsValid) {
      setFormData((prev: SignInFormData) => {
        return { ...prev, email: { value: prev.email.value, errMsg: 'Email format invalid' } };
      });
    } else {
      setFormData((prev: SignInFormData) => {
        return { ...prev, email: { value: prev.email.value } };
      });
    }

    if (emailIsValid) {
      const result = await signIn(email, pw);

      if (result) {
        toast.close('error');
        if (!toast.isActive('success')) {
          toast.show({
            id: 'success',
            title: 'Signed In',
            status: 'success',
            description: 'You are now signed in to the app',
            testID: 'success-toast',
          });
        }
      } else {
        if (!toast.isActive('error')) {
          toast.show({
            id: 'error',
            title: 'An error occurred',
            status: 'error',
            description: 'The credentials you have provided are incorrect, please try again',
            testID: 'error-toast',
          });
        }
      }
    }
    setIsAttemptingSignIn(false);
  };

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bgColor={tc.bgColorScheme} px="20px">
      <Heading color={tc.textColorScheme}>Sign in</Heading>
      <VStack space={2} mt={5}>
        <FormControl isRequired isInvalid={emailErr && emailErr.length > 0 ? true : false}>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>Email</FormControl.Label>
          <Input
            accessibilityLabel="Email"
            value={email}
            onChangeText={(value) => handleFormChange('email', value)}
            w="300px"
            _focus={{ borderColor: tc.textColorScheme }}
            color={tc.textColorScheme}
          />
          <FormControl.ErrorMessage>{emailErr}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={pwErr && pwErr.length > 0 ? true : false}>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>Password</FormControl.Label>
          <Input
            value={pw}
            accessibilityLabel="Password"
            onChangeText={(value) => handleFormChange('pw', value)}
            w="300px"
            type="password"
            _focus={{ borderColor: tc.textColorScheme }}
            color={tc.textColorScheme}
          />
        </FormControl>
        <VStack space={2} justifyContent="center" alignItems="center">
          <ThemedButton themeContext={tc} onPress={handleSubmit} isLoading={isAttemptingSignIn} testID="sign-in-button">
            SIGN IN
          </ThemedButton>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SignIn;
