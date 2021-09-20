import * as React from 'react';
import { Box, Heading, VStack, FormControl, Input, useToast } from 'native-base';
import { ThemeContext } from '../../../providers/Theme';
import ThemedButton from '../../../components/ThemedButton';
import { useAuth } from '../../../providers';
import { RegisterFormData, FormItem } from '../../../types/Forms/Register';
import { VALID_EMAIL_RE } from '../../../utils';
import { useTranslation } from 'react-i18next';

const defaultFormItem: FormItem = { value: '', errMsg: '' };

const Register: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const tc = React.useContext(ThemeContext);
  const toast = useToast();
  const { createUser } = useAuth();
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

  // valid the submission displaying errors as required, if valid submit to cognito
  const handleSubmit = async () => {
    setIsAttemptingToRegister(true);
    const emailIsValid = VALID_EMAIL_RE.test(String(email).toLowerCase());
    const passwordsMatch = pw === confirmPw;
    const passwordIsValid = pw.length > 7;

    if (!emailIsValid) {
      setFormData((prev: RegisterFormData) => {
        return {
          ...prev,
          email: { value: prev.email.value, errMsg: t('translation:common.errors.email_format') },
        };
      });
    } else {
      setFormData((prev: RegisterFormData) => {
        return { ...prev, email: { value: prev.email.value } };
      });
    }

    if (!passwordsMatch) {
      setFormData((prev: RegisterFormData) => {
        return {
          ...prev,
          pw: { value: prev.pw.value, errMsg: t('translation:screens.public.register.errors.password_mismatch') },
        };
      });
    } else {
      setFormData((prev: RegisterFormData) => {
        return { ...prev, pw: { value: prev.pw.value } };
      });
    }

    if (!passwordIsValid) {
      setFormData((prev: RegisterFormData) => {
        return {
          ...prev,
          pw: { value: prev.pw.value, errMsg: t('translation:screens.public.register.errors.password_composition') },
        };
      });
    } else if (passwordsMatch) {
      setFormData((prev: RegisterFormData) => {
        return { ...prev, pw: { value: prev.pw.value } };
      });
    }

    if (emailIsValid && passwordIsValid && passwordsMatch) {
      const result = await createUser(email, pw);

      if (result) {
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
