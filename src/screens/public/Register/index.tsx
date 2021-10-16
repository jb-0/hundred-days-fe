import * as React from 'react';
import { Box, Heading, VStack, FormControl, Input, useToast } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';
import ThemedButton from '../../../components/ThemedButton';
import { useAuth, useFirebase } from '../../../providers';
import { RegisterFormData, FormItem } from '../../../types/Forms/Register';
import { useTranslation } from 'react-i18next';
import { bootstrapUser } from '../../../services/data';
import { formValidation } from './utils';
import { AppNavigationProps } from '../../../types/Navigation';

type Props = {
  navigation: AppNavigationProps['register'];
};

const defaultFormItem: FormItem = { value: '', errMsg: '' };

const Register: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const tc = React.useContext(ThemeContext);
  const toast = useToast();
  const { createUser } = useAuth();
  const { firebaseApp } = useFirebase();
  const [isAttemptingToRegister, setIsAttemptingToRegister] = React.useState(false);

  // assign form to state
  const [formData, setFormData] = React.useState<RegisterFormData>({
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
  const handleFormChange = (key: keyof RegisterFormData, value: string) => {
    setFormData((prev: RegisterFormData) => {
      return { ...prev, [key]: { value, errMsg: prev[key].errMsg } };
    });
  };

  // validate the submission displaying errors as required, if valid create a user and bootstrap their account
  const handleSubmit = async () => {
    setIsAttemptingToRegister(true);
    const isFormValid = formValidation(pw, confirmPw, email, t, setFormData);

    if (isFormValid) {
      const createUserResult = await createUser(email, pw);
      const bootStrapUserResult = await bootstrapUser(firebaseApp, email);

      if (createUserResult && bootStrapUserResult) {
        toast.close('error');
        if (!toast.isActive('success')) {
          toast.show({
            testID: 'success-toast',
            id: 'success',
            title: t('translation:screens.public.register.toasts.success_title'),
            status: 'success',
            description: t('translation:screens.public.register.toasts.success_description'),
          });
        }

        // this was a success so we can switch pages now
        navigation.navigate('home');
      } else {
        if (!toast.isActive('error')) {
          toast.show({
            testID: 'error-toast',
            id: 'error',
            title: t('translation:screens.public.register.toasts.error_title'),
            status: 'error',
            description: t('translation:screens.public.register.toasts.error_description'),
          });
        }
      }
    }
    setIsAttemptingToRegister(false);
  };

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bgColor={tc.bgColorScheme} px="20px">
      <Heading color={tc.textColorScheme}>{t('translation:screens.public.register.page_heading')}</Heading>
      <VStack space={2} mt={5}>
        <FormControl isRequired isInvalid={emailErr && emailErr.length > 0 ? true : false}>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>
            {t('translation:screens.public.register.fields.email.text')}
          </FormControl.Label>
          <Input
            accessibilityLabel={t('translation:screens.public.register.fields.email.text')}
            value={email}
            onChangeText={(value) => handleFormChange('email', value)}
            w="300px"
            _focus={{ borderColor: tc.textColorScheme }}
            color={tc.textColorScheme}
          />
          <FormControl.ErrorMessage>{emailErr}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={5} isRequired isInvalid={pwErr && pwErr.length > 0 ? true : false}>
          <FormControl.Label _text={{ color: tc.textColorScheme }}>
            {t('translation:screens.public.register.fields.pw.text')}
          </FormControl.Label>
          <Input
            accessibilityLabel={t('translation:screens.public.register.fields.pw.text')}
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
          <FormControl.Label _text={{ color: tc.textColorScheme }}>
            {t('translation:screens.public.register.fields.conf_pw.text')}
          </FormControl.Label>
          <Input
            accessibilityLabel={t('translation:screens.public.register.fields.conf_pw.text')}
            value={confirmPw}
            onChangeText={(value) => handleFormChange('confirmPw', value)}
            w="300px"
            type="password"
            _focus={{ borderColor: tc.textColorScheme }}
            color={tc.textColorScheme}
          />
        </FormControl>
        <VStack space={2} justifyContent="center" alignItems="center">
          <ThemedButton
            themeContext={tc}
            onPress={handleSubmit}
            isLoading={isAttemptingToRegister}
            testID="register-button"
          >
            {t('translation:screens.public.register.buttons.register')}
          </ThemedButton>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Register;
