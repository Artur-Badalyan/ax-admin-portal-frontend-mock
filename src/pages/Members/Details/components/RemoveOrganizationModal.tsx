import { Flex, Button } from 'antd';
import Modal from '@/components/Modal';
import { useTranslation } from 'react-i18next';

interface AssignLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
}

export const AssignLicenseModal = ({
  isOpen,
  onClose,
  memberName,
}: AssignLicenseModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign license" size="2">
      <Flex vertical gap={20} style={{ marginTop: 16 }}>
        {/* Submit Button */}
        <Button block onClick={onClose}>
          {t('membersPage.details.assignToMember', { memberName })}
        </Button>
      </Flex>
    </Modal>
  );
};

export default AssignLicenseModal;
