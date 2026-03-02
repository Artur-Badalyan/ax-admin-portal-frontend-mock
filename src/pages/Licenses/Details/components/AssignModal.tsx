import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Flex, Button, Checkbox, Typography } from 'antd';

import { assignLicenseToUser } from '@/api/licenses.api';
import { getOrgUsers } from '@/api/customers.api';
import type { MemberItem } from '@/lib/types/user.type';
import Modal from '@/components/Modal';

import { useStyles } from '../styles';

const { Text } = Typography;

interface AssignAndInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignAndInviteModal = ({
  isOpen,
  onClose,
}: AssignAndInviteModalProps) => {
  const { styles, cx } = useStyles();
  const { t } = useTranslation();
  const { licenseId } = useParams<{ licenseId: string }>();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [assignUsers, setAssignUsers] = useState<MemberItem[]>([]);

  const fetchOrgUsers = async () => {
    try {
      const data = await getOrgUsers();
      setAssignUsers(data);
    } catch (error) {
      console.error('Error fetching organization users:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrgUsers();
    }
  }, [isOpen]);

  const handleSelect = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, userId]);
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    }
  };

  const handleAssign = async () => {
    if (!licenseId) {
      toast.error(t('assignUserModal.noLicenseId'));
      return;
    }
    try {
      console.log(
        'Assigning license with ID:',
        licenseId,
        'to users:',
        selectedMembers,
      );
      const res = await assignLicenseToUser(licenseId, selectedMembers);

      console.log('Assign response:', res);
      onClose();
    } catch (error) {
      console.error('Error assigning license:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error assigning license';
      toast.error(errorMessage);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('assignUserModal.title')}
      size="4"
      maxWidth="1200px"
    >
      <Flex vertical gap={16} style={{ marginTop: 16 }}>
        <div className={styles.assignModalContent}>
          {assignUsers.map((user) => (
            <Flex className={cx(styles.assignModalUserRow, 'glass')}>
              <Checkbox
                checked={selectedMembers.includes(user.id)}
                onChange={(e) => handleSelect(user.id, e.target.checked)}
              />
              <Text>
                {user.firstName} {user.lastName}
              </Text>
              <Text>{user.email}</Text>
            </Flex>
          ))}
        </div>

        <Flex justify="flex-end" gap={12}>
          <Button
            onClick={handleAssign}
            disabled={selectedMembers.length === 0}
          >
            {t('assignUserModal.assignButton')} ({selectedMembers.length})
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AssignAndInviteModal;
