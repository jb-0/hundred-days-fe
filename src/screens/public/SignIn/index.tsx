import * as React from 'react';
import { useAuth } from '../../../providers';
import { SignInFormData, FormItem } from '../../../types/Forms/SignIn';
import { VALID_EMAIL_RE } from '../../../utils';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input, Layout, Text } from '@ui-kitten/components';
import { SpinningLoader, TranslatedText } from '../../../components';
import { AppNavigationProps } from '../../../types/Navigation';

const defaultFormItem: FormItem = { value: '', errMsg: '' };

type Props = {
  navigation: AppNavigationProps['signIn'];
};

const SignIn: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { signIn, isVerified, isAuthenticated } = useAuth();
  const [isAttemptingSignIn, setIsAttemptingSignIn] = React.useState(false);
  const [isScreenErr, setIsScreenErr] = React.useState(false);

  // assign form to state
  const [formData, setFormData] = React.useState<SignInFormData>({ email: defaultFormItem, pw: defaultFormItem });

  // destructure values to make things a bit more readable
  const {
    email: { value: email, errMsg: emailErr },
    pw: { value: pw, errMsg: pwErr },
  } = formData;

  // set state whenever an input changes
  const handleFormChange = (key: keyof SignInFormData, value: string) => {
    setIsScreenErr(false);
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
        return { ...prev, email: { value: prev.email.value, errMsg: t('translation:common.errors.email_format') } };
      });
      setIsAttemptingSignIn(false);
    } else {
      setFormData((prev: SignInFormData) => {
        return { ...prev, email: { value: prev.email.value } };
      });
    }

    if (emailIsValid) {
      const result = await signIn(email, pw);

      if (!result) {
        setIsScreenErr(true);
      }

      setIsAttemptingSignIn(false);
    }
  };

  // listen for auth state changes and route the user accordingly
  React.useEffect(() => {
    if (isAuthenticated) navigation.navigate(isVerified ? 'app' : 'unverified');
  }, [isAuthenticated]);

  return (
    <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10 }}>
      <TranslatedText
        category="h1"
        style={{ textAlign: 'center', marginBottom: '30%', marginTop: '10%' }}
        tKey={t('translation:screens.public.sign_in.page_heading')}
      />

      {/* Page error */}
      {isScreenErr && (
        <Card
          testID="page-error-card"
          status="danger"
          header={<TranslatedText category="h6" tKey={t('translation:common.errors.error_occurred')} />}
        >
          <TranslatedText tKey={t('translation:screens.public.sign_in.toasts.error_description')} />
        </Card>
      )}

      {/* Email */}
      <Input
        testID="email-input"
        label={<TranslatedText tKey="translation:screens.public.sign_in.fields.email.text" />}
        value={email}
        placeholder={t('translation:screens.public.sign_in.fields.email.text')}
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
        label={<TranslatedText tKey="translation:screens.public.sign_in.fields.pw.text" />}
        value={pw}
        placeholder={t('translation:screens.public.sign_in.fields.pw.text')}
        onChangeText={(value) => handleFormChange('pw', value)}
        size="medium"
        status={pwErr && pwErr.length > 0 ? 'danger' : undefined}
        style={{ marginBottom: 30, marginTop: 10 }}
        secureTextEntry={true}
      />

      <Button
        onPress={handleSubmit}
        size="large"
        appearance="outline"
        disabled={isAttemptingSignIn}
        style={{ width: 150 }}
      >
        {isAttemptingSignIn ? (
          <SpinningLoader />
        ) : (
          <TranslatedText tKey={t('translation:screens.public.sign_in.buttons.sign_in')} />
        )}
      </Button>
    </Layout>
  );
};

export default SignIn;
