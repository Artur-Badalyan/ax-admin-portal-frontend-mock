import { Flex } from 'antd';
import Modal from '@/components/Modal';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import { Button, Input, Typography } from 'antd';
import { useState } from 'react';

interface InviteViaEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
}

export const InviteViaEmailModal = ({
  isOpen,
  onClose,
  onInvite,
}: InviteViaEmailModalProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { Text } = Typography;

  const handleInvite = () => {
    if (email.trim()) {
      onInvite(email);
      setEmail(''); // Clear the input
      onClose(); // Close the modal
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('inviteModal.title')}
      size="2"
    >
      <Flex vertical gap={20} style={{ marginTop: 16 }}>
        <Flex align="center" justify="space-between">
          <Text>{t('inviteModal.description')}</Text>
        </Flex>

        <Flex align="center" justify="space-between">
          <Input
            placeholder={t('inviteModal.emailPlaceholder')}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </Flex>

        {/* Submit Button */}
        <Button onClick={handleInvite} disabled={!email.trim()}>
          {t('inviteModal.inviteButton')}
        </Button>

        <Flex align="center" gap={8} style={{ marginLeft: 16 }}>
          <Info size={16} />
          <Text style={{ color: 'var(--color-text-secondary)' }}>
            {t('requestsPage.descriptionModal')}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default InviteViaEmailModal;
