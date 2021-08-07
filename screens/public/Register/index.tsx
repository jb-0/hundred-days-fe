import * as React from 'react';
import { Box, Heading, VStack, FormControl, Input, useToast } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';
import ThemedButton from '../../../components/ThemedButton';
import { useAuth } from '../../../providers';

type FormItem = { value: string; errMsg?: string };
interface FormData {
  email: FormItem;
  pw: FormItem;
  confirmPw: FormItem;
}

const defaultFormItem: FormItem = { value: '', errMsg: '' };

const emailRe =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register: React.FunctionComponent = () => {
  const tc = React.useContext(ThemeContext);
  const toast = useToast();
  const { createUser } = useAuth();

  // assign form to state
  const [formData, setFormData] = React.useState<FormData>({
    email: defaultFormItem,
    pw: defaultFormItem,
    confirmPw: { value: '' },
  });

  // destructure values to make things a bit more readable
  const {
    email: { value: email, errMsg: emailErr },
    pw: { value: pw, errMsg: pwErr },
    confirmPw: { value: confirmPw },
  } = formData;

  // set state whenever an input changes
  const handleFormChange = (key: keyof FormData, value: string) => {
    setFormData((prev: FormData) => {
      return { ...prev, [key]: { value, errMsg: prev[key].errMsg } };
    });
  };

  // valid the submission displaying errors as required, if valid submit to cognito
  const handleSubmit = async () => {
    const emailIsValid = emailRe.test(String(email).toLowerCase());
    const passwordsMatch = pw === confirmPw;
    const passwordIsValid = pw.length > 7;

    if (!emailIsValid) {
      setFormData((prev: FormData) => {
        return { ...prev, email: { value: prev.email.value, errMsg: 'Email format invalid' } };
      });
    } else {
      setFormData((prev: FormData) => {
        return { ...prev, email: { value: prev.email.value } };
      });
    }

    if (!passwordsMatch) {
      setFormData((prev: FormData) => {
        return { ...prev, pw: { value: prev.pw.value, errMsg: 'Passwords do not match' } };
      });
    } else {
      setFormData((prev: FormData) => {
        return { ...prev, pw: { value: prev.pw.value } };
      });
    }

    if (!passwordIsValid) {
      setFormData((prev: FormData) => {
        return { ...prev, pw: { value: prev.pw.value, errMsg: 'Passwords must be at least 8 characters' } };
      });
    } else if (passwordsMatch) {
      setFormData((prev: FormData) => {
        return { ...prev, pw: { value: prev.pw.value } };
      });
    }

    if (emailIsValid && passwordIsValid && passwordsMatch) {
      const result = await (async () => {
        try {
          const result = await createUser(email, pw);
          return result;
        } catch (error) {
          return false;
        }
      })();

      if (result) {
        toast.close('error');
        if (!toast.isActive('success')) {
          toast.show({
            id: 'success',
            title: 'Verification email sent',
            status: 'success',
            description: 'Thanks for signing up, check your inbox for verification steps',
          });
        }
      } else {
        if (!toast.isActive('error')) {
          toast.show({
            id: 'error',
            title: 'An error occurred',
            status: 'error',
            description: 'We were unable to create your account, please try again later.',
          });
        }
      }
    }
  };

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bgColor={tc.bgColorScheme} px="20px">
      <Heading color={tc.textColorScheme}>Register</Heading>
      <VStack space={2} mt={5}>
        <FormControl isRequired isInvalid={emailErr && emailErr.length > 0 ? true : false}>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>Email</FormControl.Label>
          <Input
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
            onChangeText={(value) => handleFormChange('pw', value)}
            w="300px"
            type="password"
            _focus={{ borderColor: tc.textColorScheme }}
            color={tc.textColorScheme}
          />
          <FormControl.ErrorMessage>{pwErr}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={pwErr && pwErr.length > 0 ? true : false}>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>Confirm Password</FormControl.Label>
          <Input
            value={confirmPw}
            onChangeText={(value) => handleFormChange('confirmPw', value)}
            w="300px"
            type="password"
            _focus={{ borderColor: tc.textColorScheme }}
            color={tc.textColorScheme}
          />
        </FormControl>
        <VStack space={2} justifyContent="center" alignItems="center">
          <ThemedButton themeContext={tc} onPress={handleSubmit}>
            REGISTER
          </ThemedButton>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Register;
