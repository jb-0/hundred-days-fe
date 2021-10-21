import * as React from 'react';
import { useAuth, useFirebase } from '../../../providers';
import { RegisterFormData, FormItem } from '../../../types/Forms/Register';
import { useTranslation } from 'react-i18next';
import { bootstrapUser } from '../../../services/data';
import { formValidation } from './utils';
import { Button, Card, Input, Layout, Text } from '@ui-kitten/components';
import { SpinningLoader, TranslatedText } from '../../../components';
import { AppNavigationProps } from '../../../types/Navigation';

type Props = {
  navigation: AppNavigationProps['register'];
};

const defaultFormItem: FormItem = { value: '', errMsg: '' };

const Register: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { createUser } = useAuth();
  const { firebaseApp } = useFirebase();
  const [isAttemptingToRegister, setIsAttemptingToRegister] = React.useState(false);
  const [isScreenErr, setIsScreenErr] = React.useState(false);

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
    setIsScreenErr(false);
  };

  // validate the submission displaying errors as required, if valid create a user and bootstrap their account
  const handleSubmit = async () => {
    setIsAttemptingToRegister(true);
    const isFormValid = formValidation(pw, confirmPw, email, t, setFormData);

    if (isFormValid) {
      const createUserResult = await createUser(email, pw);
      const bootStrapUserResult = await bootstrapUser(firebaseApp, email);

      if (createUserResult && bootStrapUserResult) {
        navigation.navigate('home');
      } else {
        setIsScreenErr(true);
      }
    }
    setIsAttemptingToRegister(false);
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }}>
      <TranslatedText
        category="h1"
        style={{ textAlign: 'center', marginBottom: '30%', marginTop: '10%' }}
        tKey={t('translation:screens.public.register.page_heading')}
      />

      {/* Page error */}
      {isScreenErr && (
        <Card
          testID="page-error-card"
          status="danger"
          header={<TranslatedText category="h6" tKey={t('translation:common.errors.error_occurred')} />}
        >
          <TranslatedText tKey={t('translation:screens.public.register.toasts.error_description')} />
        </Card>
      )}

      {/* Email */}
      <Input
        testID="email-input"
        label={<TranslatedText tKey="translation:screens.public.register.fields.email.text" />}
        value={email}
        placeholder={t('translation:screens.public.register.fields.email.text')}
        onChangeText={(value) => handleFormChange('email', value)}
        size="medium"
        status={emailErr && emailErr.length > 0 ? 'danger' : undefined}
      />
      <Text category="s2" status="danger" style={{ alignSelf: 'flex-start' }}>
        {emailErr}
      </Text>

      {/* Password */}
      <Input
        testID="password-input"
        label={<TranslatedText tKey="translation:screens.public.register.fields.pw.text" />}
        value={pw}
        placeholder={t('translation:screens.public.register.fields.pw.text')}
        onChangeText={(value) => handleFormChange('pw', value)}
        size="medium"
        status={pwErr && pwErr.length > 0 ? 'danger' : undefined}
        secureTextEntry={true}
        style={{ marginTop: 10 }}
      />
      <Text category="s2" status="danger" style={{ alignSelf: 'flex-start' }}>
        {pwErr}
      </Text>

      {/* Confirm Password */}
      <Input
        testID="password-input"
        label={<TranslatedText tKey="translation:screens.public.register.fields.conf_pw.text" />}
        value={confirmPw}
        placeholder={t('translation:screens.public.register.fields.conf_pw.text')}
        onChangeText={(value) => handleFormChange('confirmPw', value)}
        size="medium"
        secureTextEntry={true}
        style={{ marginTop: 10, marginBottom: 30 }}
      />

      <Button
        onPress={handleSubmit}
        size="large"
        appearance="outline"
        disabled={isAttemptingToRegister}
        style={{ width: 150 }}
      >
        {isAttemptingToRegister ? (
          <SpinningLoader />
        ) : (
          <TranslatedText tKey={t('translation:screens.public.register.buttons.register')} />
        )}
      </Button>
    </Layout>
  );
  // <Box flex={1} alignItems="center" justifyContent="center" bgColor={tc.bgColorScheme} px="20px">
  //   <Heading color={tc.textColorScheme}>{t('translation:screens.public.register.page_heading')}</Heading>
  //   <VStack space={2} mt={5}>
  //     <FormControl isRequired isInvalid={emailErr && emailErr.length > 0 ? true : false}>
  //       <FormControl.Label _text={{ color: tc.textColorScheme }}>
  //         {t('translation:screens.public.register.fields.email.text')}
  //       </FormControl.Label>
  //       <Input
  //         accessibilityLabel={t('translation:screens.public.register.fields.email.text')}
  //         value={email}
  //         onChangeText={(value) => handleFormChange('email', value)}
  //         w="300px"
  //         _focus={{ borderColor: tc.textColorScheme }}
  //         color={tc.textColorScheme}
  //       />
  //       <FormControl.ErrorMessage>{emailErr}</FormControl.ErrorMessage>
  //     </FormControl>
  //     <FormControl mb={5} isRequired isInvalid={pwErr && pwErr.length > 0 ? true : false}>
  //       <FormControl.Label _text={{ color: tc.textColorScheme }}>
  //         {t('translation:screens.public.register.fields.pw.text')}
  //       </FormControl.Label>
  //       <Input
  //         accessibilityLabel={t('translation:screens.public.register.fields.pw.text')}
  //         value={pw}
  //         onChangeText={(value) => handleFormChange('pw', value)}
  //         w="300px"
  //         type="password"
  //         _focus={{ borderColor: tc.textColorScheme }}
  //         color={tc.textColorScheme}
  //       />
  //       <FormControl.ErrorMessage>{pwErr}</FormControl.ErrorMessage>
  //     </FormControl>
  //     <FormControl mb={5} isRequired isInvalid={pwErr && pwErr.length > 0 ? true : false}>
  //       <FormControl.Label _text={{ color: tc.textColorScheme }}>
  //         {t('translation:screens.public.register.fields.conf_pw.text')}
  //       </FormControl.Label>
  //       <Input
  //         accessibilityLabel={t('translation:screens.public.register.fields.conf_pw.text')}
  //         value={confirmPw}
  //         onChangeText={(value) => handleFormChange('confirmPw', value)}
  //         w="300px"
  //         type="password"
  //         _focus={{ borderColor: tc.textColorScheme }}
  //         color={tc.textColorScheme}
  //       />
  //     </FormControl>
  //     <VStack space={2} justifyContent="center" alignItems="center">
  //       <ThemedButton
  //         themeContext={tc}
  //         onPress={handleSubmit}
  //         isLoading={isAttemptingToRegister}
  //         testID="register-button"
  //       >
  //         {t('translation:screens.public.register.buttons.register')}
  //       </ThemedButton>
  //     </VStack>
  //   </VStack>
  // </Box>
};

export default Register;
