import React, { useState } from 'react';
import { Flex, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import Modal from '@/components/Modal';
import { Button } from '@/components/common/Button';
import { createOrganization } from '@/api/organization.api';
import { useAuthStore } from '@/store/auth.store';
import type { IOrganization } from '@/lib/types/user.type';

const { Text } = Typography;

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: IOrganization) => void;
}

/**
 * Reusable modal for creating a new organization
 * Encapsulates creation logic and form state
 */
export const CreateOrganizationModal: React.FC<
  CreateOrganizationModalProps
> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation();

  const fetchMe = useAuthStore((state) => state.fetchMe);

  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!organizationName.trim()) {
      toast.error(t('auth.invitation.organizationNameRequired'));
      return;
    }

    try {
      setLoading(true);
      const res = await createOrganization(organizationName.trim());
      await fetchMe();
      toast.success(t('auth.invitation.organizationCreated'));
      setOrganizationName('');
      onClose();
      if (res?.id && onSuccess) {
        onSuccess(res);
      }
    } catch (error: any) {
      toast.error(
        error?.message || t('auth.invitation.failedToCreateOrganization'),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setOrganizationName('');
      onClose();
    }
  };

  return (
    <Modal
      title={t('auth.invitation.createOrganization')}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Flex vertical gap={12}>
        <Text type="secondary">
          {t('auth.invitation.provideNameToCreateOrg')}
        </Text>
        <Input
          placeholder={t('auth.invitation.organizationNamePlaceholder')}
          value={organizationName}
          onChange={(event) => setOrganizationName(event.target.value)}
          onPressEnter={handleCreate}
          disabled={loading}
          autoFocus
        />
        <Button onClick={handleCreate} loading={loading} disabled={loading}>
          {t('common.create')}
        </Button>
      </Flex>
    </Modal>
  );
};
