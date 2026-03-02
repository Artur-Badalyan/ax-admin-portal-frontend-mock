import { Flex, Typography, Button, Select } from 'antd';
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
        {/* Product Select */}
        <Flex align="center" justify="space-between" gap={12}>
          <Typography.Text strong style={{ minWidth: 100 }}>
            {t('membersPage.details.product')}
          </Typography.Text>
          <Select
            defaultValue="select"
            style={{ width: 300 }}
            options={[
              {
                value: 'select',
                label: t('membersPage.details.productSelect'),
              },
              { value: 'plant-tools', label: 'PlantTools' },
              { value: 'revit-project-box', label: 'Revit ProjectBox' },
            ]}
          />
        </Flex>

        {/* Package Select */}
        <Flex align="center" justify="space-between" gap={12}>
          <Typography.Text strong style={{ minWidth: 100 }}>
            {t('membersPage.details.package')}
          </Typography.Text>
          <Select
            defaultValue="select"
            style={{ width: 300 }}
            options={[
              {
                value: 'select',
                label: t('membersPage.details.packageSelect'),
              },
              { value: 'starter', label: 'Starter' },
              { value: 'business', label: 'Business' },
            ]}
          />
        </Flex>

        {/* Region Select */}
        <Flex align="center" justify="space-between" gap={12}>
          <Typography.Text strong style={{ minWidth: 100 }}>
            {t('membersPage.details.region')}
          </Typography.Text>
          <Select
            defaultValue="select"
            style={{ width: 300 }}
            options={[
              { value: 'select', label: t('membersPage.details.regionSelect') },
              { value: 'eu', label: 'EU' },
              { value: 'us', label: 'US' },
            ]}
          />
        </Flex>

        {/* Submit Button */}
        <Button block onClick={onClose}>
          {t('membersPage.details.assignToMember', { memberName })}
        </Button>
      </Flex>
    </Modal>
  );
};

export default AssignLicenseModal;
