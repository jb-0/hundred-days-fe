import React from 'react';
import { BottomNavigation, BottomNavigationTab, Button, Card, Icon, Layout, Modal } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { SpinningLoader, TranslatedText } from '../';
import { useAuth } from '../../providers';

interface ILogOutModalProps {
  visible: boolean;
  setVisibility: (visibility: boolean) => void;
}

const LogOutModal: React.FunctionComponent<ILogOutModalProps> = ({ visible, setVisibility }: ILogOutModalProps) => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  return (
    <Modal visible={visible}>
      <Card disabled={true}>
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
      </Card>
    </Modal>
  );
};

export default LogOutModal;
