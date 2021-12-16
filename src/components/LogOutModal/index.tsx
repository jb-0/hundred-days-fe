import React from 'react';
import { Button, Card, Layout, Modal, ModalProps } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { SpinningLoader, TranslatedText } from '../';
import { useAuth } from '../../providers';

interface ILogOutModalProps extends ModalProps {
  visible: boolean;
  setVisibility: (visibility: boolean) => void;
}

const LogOutModal: React.FunctionComponent<ILogOutModalProps> = ({
  visible,
  setVisibility,
  ...rest
}: ILogOutModalProps) => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const res = await signOut();
    if (!res) {
      setVisibility(false);
      setIsSigningOut(false);
    }
  };

  return (
    <Modal
      visible={visible}
      style={{ maxWidth: '90%' }}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      {...rest}
    >
      <Card disabled={true}>
        <Layout
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TranslatedText tKey={'translation:components.log_out_modal.message'} style={{ marginBottom: 10 }} />
          <Button onPress={() => setVisibility(false)} status="basic" style={{ width: 150, marginBottom: 10 }}>
            <TranslatedText tKey={'translation:components.log_out_modal.buttons.dismiss'} />
          </Button>
          <Button
            onPress={handleSignOut}
            size="large"
            appearance="outline"
            disabled={isSigningOut}
            style={{ width: 150 }}
            status="danger"
          >
            {isSigningOut ? (
              <SpinningLoader />
            ) : (
              <TranslatedText tKey={t('translation:components.log_out_modal.buttons.log_out')} />
            )}
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
};

export default LogOutModal;
