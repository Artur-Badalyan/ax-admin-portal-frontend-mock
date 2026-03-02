import { Flex, Select } from 'antd';
import Modal from '@/components/Modal';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import { Text } from '@/components/common/Text';
import { Button } from 'antd';

interface AssignLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
}

export const ModifyAssignedLicenseModal = ({
  isOpen,
  onClose,
  memberName,
}: AssignLicenseModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={memberName} size="2">
      <Flex vertical gap={20} style={{ marginTop: 16 }}>
        {/* Product Select */}
        <Flex align="center" justify="space-between" gap={12}>
          <Text size="md">{t('membersPage.details.product')}</Text>
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
          <Text size="md">{t('membersPage.details.package')}</Text>
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

        <Flex align="center" justify="space-between" gap={12}>
          <Text size="md">{t('membersPage.details.licenseType')}</Text>
          <Select
            defaultValue="select"
            style={{ width: 300 }}
            options={[
              {
                value: 'select',
                label: t('membersPage.details.licenseTypeSelect'),
              },
              { value: 'user-based', label: 'User Based' },
              { value: 'starter', label: 'Starter' },
            ]}
          />
        </Flex>

        {/* Region Select */}
        <Flex align="center" justify="space-between" gap={12}>
          <Text size="md">{t('membersPage.details.region')}</Text>
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
        <Button onClick={onClose}>
          {t('membersPage.details.assignToMember', { memberName })}
        </Button>

        <Flex align="center" gap={8} style={{ marginLeft: 16 }}>
          <Info size={16} />
          <Text size="sm" style={{ color: 'var(--color-text-secondary)' }}>
            {t('requestsPage.descriptionModal')}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ModifyAssignedLicenseModal;
